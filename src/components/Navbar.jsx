import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../apis/firebase';
import styled from 'styled-components';
import searchIcon from '../assets/search.png';
import { useState } from 'react';
import { LoginPage } from '../pages';

const Navbar = () => {
  const navigate = useNavigate();
  // const currentUser = auth.currentUser;
  const currentUsers = sessionStorage.getItem('id');
  const currentUser = auth.currentUser;
  const userNickName = currentUser?.displayName;
  console.log(userNickName);

  const [showModal, setShowModal] = useState(false);

  // 로그아웃
  const LogOutHandler = async () => {
    await signOut(auth)
      .then(() => {
        alert('로그아웃 되었습니다.');

        // 로그아웃 성공
        setShowModal(false);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        // 로그아웃 실패
        alert('로그아웃에 실패했습니다.');
      });
    sessionStorage.removeItem('id');
    // window.location.reload();
  };

  return (
    <Nav>
      <LeftSection>
        <Link to='/' style={{ textDecoration: 'none' }}>
          방방곡곡 로고 자리
        </Link>
      </LeftSection>
      <MenuSection>
        <LinktoSearchPageBtnWrapper>
          <label>
            <LinktoSearchPageBtn onClick={() => navigate('/search')}>
              관광지 검색하러 가기!
            </LinktoSearchPageBtn>
            {/* <SearchBtnPlaceholder>관광지 검색하러 가기!</SearchBtnPlaceholder> */}
            <SearchIcon src={searchIcon} alt='' />
          </label>
        </LinktoSearchPageBtnWrapper>
        <NavUl>
          {/* <NavLi>
            <NavText to='/'>메뉴1</NavText>
          </NavLi>
          <NavLi>
            <NavText to='/map'>메뉴2</NavText>
          </NavLi>
          <NavLi>
            <NavText to='/mypage'>메뉴3</NavText>
          </NavLi> */}
        </NavUl>
      </MenuSection>
      <InfoSection>
        <LoginButtonBox>
          {currentUsers !== null ? (
            <>
              <di>{currentUsers}님</di>
              <LoginButton onClick={LogOutHandler}>Logout</LoginButton>
            </>
          ) : (
            <>
              {/* <LoginButton onClick={() => navigate("/login")}>Login</LoginButton> */}
              <LoginButton onClick={() => setShowModal(true)}>
                Login
              </LoginButton>
              {showModal && (
                <ModalWrapper>
                  <Modal>
                    <ModalHeader>
                      <CloseBtn onClick={() => setShowModal(false)}>X</CloseBtn>
                    </ModalHeader>
                    <LoginPage />
                  </Modal>
                </ModalWrapper>
              )}
            </>
          )}
        </LoginButtonBox>
      </InfoSection>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9fb;
`;

const LeftSection = styled.div`
  width: 15%;
  margin-left: 2rem;
`;

const LogoImg = styled.img`
  width: 150px;
`;

const ImgNick = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  text-align: center;
  gap: 1rem;
`;

const FbImg = styled.div`
  display: flex;
  align-items: center;
`;

const FontBox = styled.div`
  width: 100%;
  @media (max-width: 850px) {
    display: none;
  }
`;

const Font = styled.h4`
  font-size: 25px;
  margin-top: 0.4rem;
`;

const MenuSection = styled.div`
  width: 45%;
`;

const NavUl = styled.ul`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const NavLi = styled.li`
  list-style: none;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #4285f4;
  }
`;
const NavText = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 20px;
`;

const InfoSection = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  border: none;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  width: 100px;
  background-color: #f19936;
  /* background: linear-gradient(90deg, #4285f4 0%, #3b5d9d 100%); */
  color: white;
  font-weight: 1000;
  cursor: pointer;
`;
const LoginButtonBox = styled.div`
  margin-right: 1.5rem;
  align-items: flex-end;
`;

const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
`;

const LinktoSearchPageBtn = styled.button`
  width: 300px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  text-indent: 10px;
  font-weight: 500;
  text-align: left;
  background-color: #fff;
`;

const LinktoSearchPageBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.img`
  position: relative;
  width: 15px;
  height: 15px;
  margin-left: -25px;
  margin-bottom: -3px;
`;

// const SearchBtnPlaceholder = styled.span`
//   position: relative;
//   width: 200px;
//   margin-left: 10px;
//   /* margin-top: -20px; */
// `;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background-color: #ffff;
  width: 25%;
  height: 60%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 12px 3px #555555;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 186%;
  height: 12%;
  padding: 10px;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  /* position: absolute;
  right: 770px;
  top: 280px; */
  border: none;
  font-size: 18px;
  color: #1f1f1f;
  cursor: pointer;
`;
