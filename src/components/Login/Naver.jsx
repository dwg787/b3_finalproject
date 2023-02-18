import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NaverLogo from '../../assets/naver.avif';

const Naver = ({ setGetToken, setUserInfo }) => {
  const [userName, setUserName] = useState('');
  console.log(userName);
  const { naver } = window;
  const NAVER_CLIENT_ID = 'o47rUj6rR0GWdh1UKf95';
  const NAVER_CALLBACK_URL = 'http://localhost:3000/';

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: 35 },
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

  const userAccessToken = () => {
    window.location.href.includes('id') && getToken();
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
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

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];

    // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
    // sessionStorage.setItem("id", token.user.userid);
    // setGetToken(token);
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  }, []);

  return (
    <>
      {/* 버튼에다 백그라운드 이미지 */}
      {/* 이미지에다 이이디값 을 주거나  클릭 이벤트를하거나 */}

      <NaverBtn id="naverIdLogin">
        {/* <NaverImg src={NaverLogo} onClick={initializeNaverLogin} /> */}
        <NaverText>Naver</NaverText>
      </NaverBtn>
    </>
  );
};

const NaverBtn = styled.button`
  background-color: transparent;
  border: none;
`;

const NaverImg = styled.img`
  width: 41px;
  height: 41px;
  cursor: pointer;
`;

const NaverText = styled.div`
  color: #8a8a8a;
  font-size: 12px;
`;

export default Naver;
