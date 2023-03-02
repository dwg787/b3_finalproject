import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NaverLogo from '../../assets/naver.avif';

const Naver = () => {
  const [userName, setUserName] = useState('');
  console.log(userName);
  const { naver }: any = window;
  const NAVER_CLIENT_ID = 'o47rUj6rR0GWdh1UKf95';
  const NAVER_CALLBACK_URL = 'http://localhost:3000/';

  const handleNaverLogin = () => {
    if (
      document &&
      document?.querySelector('#naverIdLogin')?.firstChild &&
      window !== undefined
    ) {
      const loginBtn = document.getElementById('naverIdLogin')
        ?.firstChild as HTMLButtonElement;
      loginBtn?.click();
    }
  };

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: 40 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const userAccessToken = () => {
    window.location.href.includes('id') && getToken();
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function(status: string) {
      if (status) {
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        setUserName(username);
        window.sessionStorage.setItem('id', username);
      }
    });
  };

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  }, []);

  return (
    <NaverBox>
      <NaverBtn id="naverIdLogin"></NaverBtn>
      <NaverText>Naver</NaverText>
    </NaverBox>
  );
};

const NaverBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
`;

const NaverBtn = styled.button`
  background-color: transparent;
  border: none;

  overflow: hidden;

  a {
    display: block;
    width: 32.72px;
    height: 32.72px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const NaverText = styled.div`
  color: #8a8a8a;
  font-size: 12px;
`;

const LoginButton = styled.button`
  width: 41px;
  height: 40px;
`;

export default Naver;
