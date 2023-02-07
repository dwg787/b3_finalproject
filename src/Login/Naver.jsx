import React, { useEffect } from "react";

const Naver = () => {
  let naver_api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    "o47rUj6rR0GWdh1UKf95" +
    "&redirect_uri=" +
    encodeURI("http://localhost:3000/login") +
    "&state=" +
    Math.random().toString(36).substr(3, 14);

  return (
    <>
      <a href={naver_api_url}>
        <img
          height="50"
          src="http://static.nid.naver.com/oauth/small_g_in.PNG"
        />
      </a>
    </>
  );
};

export default Naver;
