import axios from 'axios';
import QueryString from 'qs';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function Kakao() {
  const location = useLocation();
  const REST_API_KEY = ''; // 카카오 디벨롭 사이트에서 앱생성후 넣어주면된다
  const REDIRECT_URI = 'http://localhost:3000/';
  //클릭시 이링크가 실행되게 할거임
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const CLIENT_SECRET = ''; // 카카오디벨롭 에서 보안에들어가면 시크릿키를 발급하여 넣어주자
  //주소창에 파라미터code를 가져온다 split 메서드를 활용한다
  const KAKAO_CODE = location.search.split('=')[1];
  //nickname state
  const [nickName, setNickName] = useState();
  //profileimage state
  const [profileImage, setProfileImage] = useState();
  //accessTiken state
  const [accessToken, setAccessToken] = useState();
  //userstate id
  const [userId, setUserId] = useState();

  //로그인을 눌르면 link를 실행하여 kakao 로그인을 진행한다
  const loginHandler = () => {
    window.location.replace(link);
  };
  //kakao로그인을 완료하면 주소창에 code값이 파라미터로 전달이되는데 그 값을 가져오자
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  //accessToken 요청
  const getUser = async () => {
    const ACCESS_TOKEN = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: QueryString.stringify({
        //엑세스 토큰을 요청하기위해 필요한 토큰과 key값들
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI, //위쪽에 전부 변수로 지정해주었기에불러오기만 하면된다
        code: KAKAO_CODE,
        client_secret: CLIENT_SECRET,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log('error:', error));

    console.log('ACCESS_TOKEN1', ACCESS_TOKEN);
    //state에 accessToken을 넣어주자
    setAccessToken(ACCESS_TOKEN.access_token);
    console.log('ACCESS_TOKEN2', ACCESS_TOKEN.access_token);
    //localStorage에 잘들어가는지 확인해보자
    localStorage.setItem('token_for_kakaotalk', ACCESS_TOKEN.access_token);

    //kakao user DATA를 get해오자
    const user = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        //access_token이 필요하다
        Authorization: `Bearer ${ACCESS_TOKEN.access_token}`,
      },
    });

    console.log(user);
    //값을가져오면 state에 닉네임과 프로필이미지를 string으로 담아주자
    setNickName(user.data.properties.nickname);
    setProfileImage(user.data.properties.profile_image);
    setUserId(user.data.id);
  };

  useEffect(() => {
    getUser();
  }, []);

  //로그아웃 accessToken만료시키기
  const logout = async () => {
    const islogout = await fetch('https://kapi.kakao.com/v1/user/logout', {
      headers: {
        //accessToken을 만료시킨다
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    }).then((res) => res.json());
    //로컬스토리지에 넣어주었던 값을 지워준다
    // localStorage.clear();
    localStorage.removeItem('token_for_kakaotalk');
    console.log('isLogout', islogout);
  };

  //토큰의 유효성 검사 (토큰이 유효한지 검사를꼭해보고 배포하자) 남은시간 및 고유 id 값이 출력된다
  const cheak = async () => {
    const cheaktoken = await fetch(
      'https://kapi.kakao.com/v1/user/access_token_info',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ).then((res) => res.json());
    console.log('cheaktoken', cheaktoken);
  };

  return (
    <>
      <button type="button" onClick={loginHandler}>
        로그인 하기
      </button>
      <button type="button" onClick={logout}>
        로그아웃하기
      </button>
      <button type="button" onClick={cheak}>
        토큰상태확인
      </button>
    </>
  );
}
