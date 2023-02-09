import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../apis/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import KakaoLoginButton from "../components/Login/KakaoLoginButton";
import KakaoLogoutButton from "../components/Login/KakaoLogoutButton";
import Naver from "../components/Login/Naver";

const LoginPage = () => {
  const [value, setValue] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  // 구글로그인
  const handleclick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      sessionStorage.setItem("email", data.user.email);
      navigate("/");
    });
  };

  const logIn = async () => {
    const login = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
    alert("login 성공!");
    console.log(login);
    console.log("이메일", emailRef.current.value);
    console.log("비번", passwordRef.current.value);
    sessionStorage.setItem("email", login.user.email);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    setValue(sessionStorage.getItem("email"));
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>로그인 페이지</div>
      <div>
        <input ref={emailRef} type="text" placeholder="이메일을 입력해주세요." />
      </div>
      <div>
        <input ref={passwordRef} type="password" placeholder="비밀번호를 입력해주세요" />
      </div>
      <button onClick={logIn} type="submit">
        login
      </button>
      <button onClick={handleclick}>google로그인</button>
      <KakaoLoginButton />
      <KakaoLogoutButton />
      <Naver />
    </div>
  );
};

export default LoginPage;
