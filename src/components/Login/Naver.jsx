import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NaverLogo from '../../assets/naver.avif';

const Naver = ({ setGetToken, setUserInfo }) => {
  const [userName, setUserName] = useState('');
  console.log(userName);
  const { naver } = window;
  const NAVER_CLIENT_ID = 'o47rUj6rR0GWdh1UKf95';
  const NAVER_CALLBACK_URL = 'http://localhost:3000/';

  const handleNaverLogin = () => {
    if (
      document &&
      document?.querySelector('#naverIdLogin')?.firstChild &&
      window !== undefined
    ) {
      const loginBtn = document.getElementById('naverIdLogin')?.firstChild;
      loginBtn.click();
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

    naverLogin.getLoginStatus(async function(status) {
      if (status) {
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        setUserName(username);
        // window.localStorage.setItem('id', username);
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
    <NaverBox>
      {/* 버튼에다 백그라운드 이미지 */}
      {/* 이미지에다 이이디값 을 주거나  클릭 이벤트를하거나 */}

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
  gap: 5px;
  margin-left: 30px;
  margin-right: 30px;
`;

const NaverBtn = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  a {
    display: block;
    width: 41px;
    height: 41px;
  }
  img {
    width: 100%;
    height: 100%;
  }
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

const LoginButton = styled.button`
  width: 41px;
  height: 40px;
`;

export default Naver;
