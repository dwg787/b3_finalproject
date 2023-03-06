import { useNavigate, Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../apis/firebase';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import LoginPage from '../pages/LoginPage';
import axios from 'axios';
import QueryString from 'qs';
import mainlogo from '../assets/mainlogo.avif';
import SearchIcon from '../assets/search.avif';
import Ximg from '../assets/ximg.avif';
import useNotification from '../hooks/useNotification';

const Navbar = () => {
  const [userId, setUserId] = useState();
  const location = useLocation();
  const history = useNavigate();
  const REST_API_KEY = '06264d97cddc6d0d5ef77a0f28d69af9';
  const REDIRECT_URI = 'https://b3-finalproject-v33x.vercel.app';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const navigate = useNavigate();

  const localId = localStorage.getItem('id');

  const currentUser = auth.currentUser;

  const [showModal, setShowModal] = useState(false);

  const KAKAO_CODE = location.search.split('=')[1];

  //   getuser 실행

  const [alarmMsg, setAlarmMsg] = useState(''); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행

  const REST_API_KEY_KAKAO = '06264d97cddc6d0d5ef77a0f28d69af9';
  const REDIRECT_URI_KAKAO = 'https://b3-finalproject-v33x.vercel.app';
  const link_kakao = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI_KAKAO}&response_type=code`;
  const CLIENT_SECRET = 'jvRkvzZgcAhb2iq42YyYwqCoIY5t1uXS';
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [accessToken, setAccessToken] = useState();
  const [userName, setUserName] = useState('');
  console.log('Navbar', userName);
  const { naver } = window;
  const NAVER_CLIENT_ID = 'o47rUj6rR0GWdh1UKf95';
  const NAVER_CALLBACK_URL = 'https://b3-finalproject-v33x.vercel.app';

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

    setUserId(user.data.id);
    setNickName(user.data.properties.nickname);
    setProfileImage(user.data.properties.profile_image);
    localStorage.setItem('id', user.data.properties.nickname);
    localStorage.setItem('uid', user.data.id);
    sessionStorage.setItem('uid', user.data.id);
  };

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

    fetch('https://openapi.naver.com/v1/nid/verify', {
      headers: {
        Authorization:
          'Bearer AAAAPIuf0L+qfDkMABQ3IJ8heq2mlw71DojBj3oc2Z6OxMQESVSrtR0dbvsiQbPbP1/cxva23n7mQShtfK4pchdk/rc=',
      },
    });

    // 로그아웃 성공
    setShowModal(false);
    navigate('/', { replace: true });

    localStorage.removeItem('id');
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
    sessionStorage.removeItem('uid');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('token_for_kakaotalk');
    localStorage.removeItem('com.naver.nid.oauth.state_token');
    localStorage.removeItem('com.naver.nid.access_token');
    localStorage.removeItem('__bootpay_track_uuid__');
    navigate('/');
  };

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function(status) {
      if (status) {
        const username = naverLogin.user.getName();
        console.log(naverLogin.user.id);
        setUserName(username);
        window.localStorage.setItem('id', username);
        window.localStorage.setItem('uid', naverLogin.user.id);
        window.sessionStorage.setItem('uid', naverLogin.user.id);
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin();
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
              <NickNameBtn>{localId}님 환영합니다</NickNameBtn>
              <InputBox onClick={() => navigate('/search')}>
                <SearchIconImg src={SearchIcon} alt="" />
              </InputBox>
              <NavTextDiv onClick={() => navigate('/my')}>
                마이페이지
              </NavTextDiv>
              <LoginButton
                onClick={() => {
                  setAlarmMsg('로그아웃 되었습니다.'); //알람관련 코드4 - 들어갈 내용 정하는 부분
                  addNoti(); //알람관련 코드5 - useNotification 커스텀 훅 내의 addNoti 함수 실행
                  LogOutHandler();
                }}
              >
                Logout
              </LoginButton>
            </LoginBox>
          ) : (
            <LoginBox>
              <InputBox onClick={() => navigate('/search')}>
                <SearchIconImg src={SearchIcon} alt="" />
              </InputBox>

              <LoginButton onClick={() => setShowModal(true)}>
                Login
              </LoginButton>
              {showModal && (
                <ModalWrapper>
                  <Modal>
                    <ModalHeader>
                      <CloseBtn onClick={() => setShowModal(false)}>
                        <CloseImg src={Ximg} />
                      </CloseBtn>
                    </ModalHeader>
                    <LoginPage
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
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
  width: 76.08px;
  height: 22.37px;
  margin-top: 5px;
  margin-left: 42.09px;
  @media screen and (max-width: 820px) {
    margin-left: 25px;
    width: 70.82;
    height: 20.82;
  }
`;

const Nav = styled.div`
  max-width: 1036px;
  width: 100%;
  height: 51px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6478ff;
  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

const NavTextDiv = styled.div`
  width: 54.1px;
  color: white;
  margin-right: 10px;
  text-align: center;
  cursor: pointer;
  font-size: 10.65px;
  @media screen and (max-width: 820px) {
    font-size: 11px;
  }
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
  font-size: 10.65px;
  padding-left: 11.08px;
  padding-right: 10.24px;
  padding-top: 4.93px;
  padding-bottom: 5.48px;
  border-radius: 4.1px;
  width: 51.33px;
  height: 23.4px;
  background-color: #6478ff;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  @media screen and (max-width: 820px) {
    width: 48px;
    height: 22px;
    padding: 5px 10px 5px 10px;
  }
`;
const LoginButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 46.88px;
  /* margin-top: 52px; */
  @media screen and (max-width: 820px) {
    margin-right: 25px;
  }
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
  box-sizing: border-box;
`;

const Modal = styled.div`
  background-color: #ffff;
  /* width: 395.69px;
  height: 590px; */

  width: 395.69px;
  height: 565px;
  box-shadow: 4.76737px 4.76737px 7.94562px rgba(0, 0, 0, 0.25);
  border-radius: 14.9657px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 390px) {
    width: 314.31px;
    height: 450px;
    box-shadow: 3.78685px 3.78685px 6.31141px rgba(0, 0, 0, 0.25);
    border-radius: 11.8876px;
  }
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  height: 10%;
  padding: 10px;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  /* position: absolute;
  right: 770px;
  top: 280px; */
  border: none;
  cursor: pointer;
`;

const CloseImg = styled.img`
  width: 23px;
  height: 23px;
  @media screen and (max-width: 390px) {
    width: 18px;
    height: 18px;
  }
`;

const SearchIconImg = styled.img`
  width: 23.74px;
  height: 23.74px;
  margin-left: 5px;
  margin-right: 4.71px;
  @media screen and (max-width: 820px) {
    width: 16.79px;
    height: 16.79px;
  }
`;

const NickNameBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 10.65px;
  margin-right: 10px;
  color: white;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;
