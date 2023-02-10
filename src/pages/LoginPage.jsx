import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../apis/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import KakaoLoginButton from "../components/Login/KakaoLoginButton";
import KakaoLogoutButton from "../components/Login/KakaoLogoutButton";
import Naver from "../components/Login/Naver";
import styled from "styled-components";
import Google from "../assets/google.png";

const LoginPage = () => {
  const [value, setValue] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const handleclick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      sessionStorage.setItem("id", data.user.displayName);
      // console.log("data", data);
      navigate("/");
    });
  };

  const logIn = async (e) => {
    e.preventDefault();
    const login = await signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    );
    alert("login 성공!");
    console.log(login);
    console.log(auth);
    console.log("이메일", emailRef.current.value);
    console.log("비번", passwordRef.current.value);
    sessionStorage.setItem("id", login.user.displayName);

    navigate("/");
  };

  useEffect(() => {
    setValue(sessionStorage.getItem("email"));
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <LoginText>로그인</LoginText>
      <LoginContent>
        간편하게 로그인하고 꿈꾸던 여행을 계획해보세요
      </LoginContent>
      <InputWrap>
        <EmailInput ref={emailRef} type="text" placeholder="Email" />
        <PwInput ref={passwordRef} type="password" placeholder="Password" />
      </InputWrap>
      <LoginBtn onClick={logIn} type="submit">
        로그인
      </LoginBtn>
      <TextDiv>다른 로그인 방식</TextDiv>
      <div style={{ display: "flex", gap: "40px" }}>
        <KakaoLoginButton />
        <GoogleBtn onClick={handleclick}>
          <GoogleImg src={Google} />
          <GoogleText>Google</GoogleText>
        </GoogleBtn>
        {/* <KakaoLogoutButton /> */}
        {/* <Naver /> */}
      </div>
      <FooterText>
        로그인 또는 회원가입 시 이용약관 및 개인정보 정책에<br></br>
        동의한 것으로 간주합니다.
      </FooterText>
    </div>
  );
};

const LoginText = styled.div`
  font-size: 27.62px;
  color: #555555;
  font-weight: bold;
`;

const LoginContent = styled.div`
  margin-top: 5px;
  margin-bottom: 25px;
  color: #8a8a8a;
  font-size: 14.7px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled.input`
  width: 365px;
  height: 55px;
  border-radius: 10px;
  border: 1px solid #8a8a8a;
  padding: 15px;
  margin-bottom: 15px;
`;

const PwInput = styled.input`
  width: 365px;
  height: 55px;
  border-radius: 10px;
  border: 1px solid #8a8a8a;
  padding: 15px;
  margin-bottom: 15px;
`;

const LoginBtn = styled.button`
  background-color: #555555;
  color: #ffff;
  width: 365px;
  height: 55px;
  font-size: 19px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const GoogleBtn = styled.button`
  background-color: transparent;
  border: none;
`;

const GoogleImg = styled.img`
  width: 41px;
  height: 41px;
  cursor: pointer;
`;

const GoogleText = styled.div`
  color: #8a8a8a;
  font-size: 12px;
`;

const TextDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  color: #8a8a8a;
  font-size: 14.7px;
`;

const FooterText = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  text-align: center;
  color: #8a8a8a;
  font-size: 12.86px;
`;

export default LoginPage;
