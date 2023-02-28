import axios from 'axios';
import QueryString from 'qs';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import kakaologo from '../../assets/kakaologo.avif';
import kakao from '../../assets/kakao.avif';

export default function KakaoLoginButton() {
  const location = useLocation();
  const REST_API_KEY = '06264d97cddc6d0d5ef77a0f28d69af9';
  const REDIRECT_URI = 'http://localhost:3000/';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.replace(link);
  };

  return (
    <KakaoBtn>
      <KakaoLogoButton src={kakao} onClick={loginHandler} />
      <KakaoText>Kakao</KakaoText>
    </KakaoBtn>
  );
}

const KakaoBtn = styled.button`
  border: none;
  background-color: transparent;
`;

const KakaoLogoButton = styled.img`
  width: 41px;
  height: 41px;
  cursor: pointer;
`;

const KakaoText = styled.div`
  color: #8a8a8a;
  font-size: 12px;
`;
