import { useEffect, useState } from "react";

const Naver = ({ setGetToken, setUserInfo }) => {
  const [userName, setUserName] = useState("");
  console.log(userName);
  const { naver } = window;
  const NAVER_CLIENT_ID = "o47rUj6rR0GWdh1UKf95";
  const NAVER_CALLBACK_URL = "http://localhost:3000/";

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      loginButton: { color: "green", type: 1, height: 30 },
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function(status) {
      if (status) {
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        setUserName(username);
        window.localStorage.setItem("id", username);
        window.sessionStorage.setItem("id", username);
      }
    });
  };

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];

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
      <button id="naverIdLogin" />
    </>
  );
};

export default Naver;
