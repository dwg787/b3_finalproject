import axios from 'axios';
import QueryString from 'qs';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import kakaologo from '../../assets/kakaologo.png';
import kakao from '../../assets/kakao.png';

export default function KakaoLoginButton() {
  const location = useLocation();
  const REST_API_KEY = '06264d97cddc6d0d5ef77a0f28d69af9';
  const REDIRECT_URI = 'http://localhost:3000/login';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const CLIENT_SECRET = 'jvRkvzZgcAhb2iq42YyYwqCoIY5t1uXS';
  const KAKAO_CODE = location.search.split('=')[1];
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [accessToken, setAccessToken] = useState();
  const loginHandler = () => {
    window.location.replace(link);
  };

  const getUser = async () => {
    const ACCESS_TOKEN = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: QueryString.stringify({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: KAKAO_CODE,
        client_secret: CLIENT_SECRET,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log('error:', error));

    console.log('ACCESS_TOKEN1', ACCESS_TOKEN);
    setAccessToken(ACCESS_TOKEN.access_token);
    console.log('ACCESS_TOKEN2', ACCESS_TOKEN.access_token);
    localStorage.setItem('token_for_kakaotalk', ACCESS_TOKEN.access_token);

    const user = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN.access_token}`,
      },
    });

    console.log(user);
    setNickName(user.data.properties.nickname);
    setProfileImage(user.data.properties.profile_image);
  };
  console.log(nickName, profileImage);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <KakaoBtn>
      <KakaoLogoButton src={kakao} type='button' onClick={loginHandler} />
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
  /* border-radius: 30px; */
  cursor: pointer;
`;

const KakaoText = styled.div`
  color: #8a8a8a;
  font-size: 12px;
`;
