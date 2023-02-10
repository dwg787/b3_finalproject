import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../apis/firebase";
import styled from "styled-components";

const Navbar = () => {
  const navigate = useNavigate();
  // const currentUser = auth.currentUser;
  const currentUsers = sessionStorage.getItem("id");
  const currentUser = auth.currentUser;
  const userNickName = currentUser?.displayName;
  console.log(userNickName);

  // window.localStorage.setItem("id", userNickName);

  // 로그아웃
  const LogOutHandler = async () => {
    await signOut(auth)
      .then(() => {
        alert("로그아웃 되었습니다.");

        // 로그아웃 성공
        navigate("/");
      })
      .catch((error) => {
        // 로그아웃 실패
        alert("로그아웃에 실패했습니다.");
      });
    sessionStorage.removeItem("id");
    window.location.reload();
  };

  return (
    <Nav>
      <LeftSection>
        <Link to="/" style={{ textDecoration: "none" }}>
          방방곡곡 로고 자리
        </Link>
      </LeftSection>
      <MenuSection>
        <input onClick={() => navigate("/search")} />
        <NavUl></NavUl>
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
              <LoginButton onClick={() => navigate("/login")}>Login</LoginButton>
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
