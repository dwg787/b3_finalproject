import React from "react";
import Kakao from "../Login/Kakao";
import Naver from "../Login/Naver";
import LoginTest from "../LoginTest/LoginTest";

export default function LoginPage() {
  return (
    <div>
      <Kakao />
      <Naver />
      {/* <LoginTest /> */}
    </div>
  );
}
