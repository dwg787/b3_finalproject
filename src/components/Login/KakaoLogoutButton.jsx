import React from "react";
import styled from "styled-components";

export default function KakaoLogoutButton() {
  const REST_API_KEY = "06264d97cddc6d0d5ef77a0f28d69af9";
  const REDIRECT_URI = "http://localhost:3000/login";
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const logout = async () => {
    const AccessToken = window.localStorage.getItem("token_for_kakaotalk");
    console.log(AccessToken);
    const islogout = await fetch("https://kapi.kakao.com/v1/user/logout", {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    }).then((res) => res.json());
    localStorage.clear();
    console.log("isLogout", islogout);
  };

  return (
    <>
      <button type="button" onClick={logout}>
        로그아웃하기
      </button>
    </>
  );
}
