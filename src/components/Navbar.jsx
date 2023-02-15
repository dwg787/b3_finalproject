import { useNavigate, Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../apis/firebase';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { LoginPage } from '../pages';
import axios from 'axios';
import QueryString from 'qs';
import mainlogo from '../assets/mainlogo.png';
import SearchIcon from '../assets/search.png';

const Navbar = () => {
  const location = useLocation();
  const history = useNavigate();
  const REST_API_KEY = '06264d97cddc6d0d5ef77a0f28d69af9';
  const REDIRECT_URI = 'http://localhost:3000/';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const navigate = useNavigate();
  // const currentUser = auth.currentUser;
  const localId = sessionStorage.getItem('id');
  // console.log(localId);

  const currentUser = auth.currentUser;
  const userNickName = currentUser?.displayName;
  // console.log(userNickName);

  const [showModal, setShowModal] = useState(false);

  //kakaologin get location
  const KAKAO_CODE = location.search.split('=')[1];
  // console.log(KAKAO_CODE);

  //   getuser 실행

  const REST_API_KEY_KAKAO = '06264d97cddc6d0d5ef77a0f28d69af9';
  const REDIRECT_URI_KAKAO = 'http://localhost:3000/';
  const link_kakao = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI_KAKAO}&response_type=code`;
  const CLIENT_SECRET = 'jvRkvzZgcAhb2iq42YyYwqCoIY5t1uXS';
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [accessToken, setAccessToken] = useState();
  const [userName, setUserName] = useState('');
  console.log(userName);
  const { naver } = window;
  const NAVER_CLIENT_ID = 'o47rUj6rR0GWdh1UKf95';
  const NAVER_CALLBACK_URL = 'http://localhost:3000/';

  // console.log(accessToken);
  const getUser = async () => {
    const ACCESS_TOKEN = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: QueryString.stringify({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY_KAKAO,
        redirect_uri: REDIRECT_URI_KAKAO,
        code: KAKAO_CODE,
        client_secret: CLIENT_SECRET,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log('error:', error));

    console.log('ACCESS_TOKEN1', ACCESS_TOKEN);
    setAccessToken(ACCESS_TOKEN.access_token);
    console.log('ACCESS_TOKEN2', ACCESS_TOKEN.access_token);
    localStorage.setItem('token_for_kakaotalk', ACCESS_TOKEN.access_token);

    const user = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN.access_token}`,
      },
    });

    console.log(user);
    setNickName(user.data.properties.nickname);
    setProfileImage(user.data.properties.profile_image);
    sessionStorage.setItem('id', user.data.properties.nickname);
  };
  // console.log(nickName, profileImage);

  const userAccessToken = () => {
    window.location.href.includes('access_token') && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
  };

  useEffect(() => {
    getUser();
    userAccessToken();
  }, []);
  //  userdata를 세션이나 로컬 스토리지에 담아준다
  // 또는 유즈이펙트로 감지하여 실행해준다

  // 로그아웃
  const LogOutHandler = async () => {
    await signOut(auth);
    const AccessToken = window.localStorage.getItem('token_for_kakaotalk');
    console.log(AccessToken);
    const islogout = await fetch('https://kapi.kakao.com/v1/user/logout', {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    }).then((res) => res.json());

    console.log('isLogout', islogout);
    //   .then(() => {
    //     alert("로그아웃 되었습니다.");

    // 로그아웃 성공
    setShowModal(false);
    navigate('/', { replace: true });
    //   })
    //   .catch((error) => {
    //     // 로그아웃 실패
    //     alert("로그아웃에 실패했습니다.");
    //   });
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('token_for_kakaotalk');
    navigate('/');
    window.location.reload();
  };
  // const localId = sessionStorage.getItem('id');
  // console.log(localId);

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: 30 },
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function(status) {
      if (status) {
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        setUserName(username);
        window.localStorage.setItem('id', username);
        window.sessionStorage.setItem('id', username);
      }
    });
  };

  useEffect(() => {
    let naverUser = setTimeout(() => {
      initializeNaverLogin();
      const naverLogin = new naver.LoginWithNaverId({
        clientId: NAVER_CLIENT_ID,
        callbackUrl: NAVER_CALLBACK_URL,
        // 팝업창으로 로그인을 진행할 것인지?
        isPopup: false,
        loginButton: { color: 'green', type: 1, height: 30 },
        callbackHandle: true,
      });
      naverLogin.init();

      naverLogin.getLoginStatus(async function(status) {
        if (status) {
          const userid = naverLogin.user.getEmail();
          const username = naverLogin.user.getName();
          setUserName(username);
          window.localStorage.setItem('id', username);
          window.sessionStorage.setItem('id', username);
        }
      });
    }, 500);
  }, []);

  return (
    <Nav>
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Mainlogo src={mainlogo} alt="" />
        </Link>
      </div>
      <div>
        <LoginButtonBox>
          {localId !== null ? (
            <LoginBox>
              <NickNameBtn onClick={() => navigate('/my')}>
                {localId}님 환영합니다
              </NickNameBtn>
              <InputBox onClick={() => navigate('/search')}>
                <SearchIconImg src={SearchIcon} alt="" />
              </InputBox>
              <NavTextDiv>예약페이지</NavTextDiv>
              <NavTextDiv>마이페이지</NavTextDiv>
              <LoginButton onClick={LogOutHandler}>Logout</LoginButton>
            </LoginBox>
          ) : (
            <LoginBox>
              <InputBox onClick={() => navigate('/search')}>
                <SearchIconImg src={SearchIcon} alt="" />
              </InputBox>
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
            </LoginBox>
          )}
        </LoginButtonBox>
      </div>
    </Nav>
  );
};

export default Navbar;

const Mainlogo = styled.img`
  width: 100px;
  height: 30px;
  margin-top: 10px;
  margin-left: 40px;
`;

const Nav = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6478ff;
`;

const NavTextDiv = styled.div`
  color: white;
  margin-right: 10px;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
  font-size: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 10px;
  width: 100px;
  background-color: #6478ff;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin-left: 10px;
`;
const LoginButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const InputBox = styled.div`
  display: flex;
  gap: 150px;
  justify-content: space-around;
  align-items: center;
  /* width: 400px; */
  height: 30px;
  border-radius: 10px;
  text-indent: 10px;
  font-weight: 500;

  cursor: pointer;
`;

// const ProfileImg = styled.img`
//   width: 45px;
//   height: 45px;
//   border-radius: 100%;
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
  z-index: 1001;
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

const SearchIconImg = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-right: 5px;
`;

const NickNameBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 17px;
  margin-right: 10px;
  color: white;
`;
