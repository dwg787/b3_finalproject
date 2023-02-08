import axios from "axios";
import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function Kakao() {
  const location = useLocation();
  const REST_API_KEY = "06264d97cddc6d0d5ef77a0f28d69af9";
  const REDIRECT_URI = "http://localhost:3000/login";
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const CLIENT_SECRET = "jvRkvzZgcAhb2iq42YyYwqCoIY5t1uXS";
  const KAKAO_CODE = location.search.split("=")[1];
  //   const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();

  const loginHandler = () => {
    window.location.replace(link);
  };

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  const getAccessToken = async () => {
    const ACCESS_TOKEN = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: QueryString.stringify({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: KAKAO_CODE,
        client_secret: CLIENT_SECRET,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log("error:", error));

    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      console.log(data);
      // 사용자 정보 변수에 저장
      //   setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }

    console.log("ACCESS_TOKEN", ACCESS_TOKEN);
    localStorage.setItem("token_for_kakaotalk", ACCESS_TOKEN.access_token);
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  // const getProfile = async () => {
  //   try {
  //     // Kakao SDK API를 이용해 사용자 정보 획득
  //     let data = await window.Kakao.API.request({
  //       url: "/v2/user/me",
  //     });
  //     // 사용자 정보 변수에 저장
  //     setUserId(data.id);
  //     setNickName(data.properties.nickname);
  //     setProfileImage(data.properties.profile_image);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <button type="button" onClick={loginHandler}>
        로그인 하기
      </button>
      <p></p>
      <p></p>
      <p></p>
    </>
  );
}
