import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MapMarker, Map } from "react-kakao-maps-sdk";

const { kakao } = window;

const KakaoMap = () => {
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={4} // 지도의 확대 레벨
    >
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: 33.450701,
          lng: 126.570667,
        }}
      />
    </Map>
  );
};

export default KakaoMap;

const StMap = styled.div`
  width: 500px;
  height: 500px;
`;
