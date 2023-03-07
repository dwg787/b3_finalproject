import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

const KakaoMap = ({
  mapx,
  mapy,
  title,
  tel,
  homepage,
}: {
  mapx: string;
  mapy: string;
  title: string;
  tel: string;
  homepage: string;
}) => {
  const mapcontainer = useRef(null);
  const { kakao } = window;

  const options = {
    center: new window.kakao.maps.LatLng(mapy, mapx),
    level: 3,
  };

  useEffect(() => {
    const map = new window.kakao.maps.Map(mapcontainer.current, options);

    //지도 내 마커 표시
    const markerPosition = new kakao.maps.LatLng(mapy, mapx);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    // const iwContent = `<div style="padding:5px;">${title}<br>전화:${tel}<br>${homepage}</div>`,
    //   iwRemoveable = true;

    const iwContent = `
  <div style="padding: 10px; background-color: #ffffff;  ">
    <h1 style="margin-bottom: 10px; font-size:20px ">${
      title.split(/[\\(\\[]/)[0]
    }</h1>
    <hr style="border: none; border-top: 1px solid #6478ff; margin: 5px 0;">
    <p style="margin-top: 5px;">전화번호: ${tel}</p>
    <p style="margin-top: 5px;">홈페이지: ${homepage}</p>
  </div>
`;
    const iwRemoveable = true;

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow.open(map, marker);
    });

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  const isMobile: boolean = useMediaQuery({
    query: '(max-width:820px)',
  });

  return (
    <>
      {isMobile ? (
        <Container>
          {' '}
          <StMapMobile id="map" ref={mapcontainer} />
        </Container>
      ) : (
        <Container>
          {' '}
          <StMap id="map" ref={mapcontainer} />
        </Container>
      )}
    </>
  );
};

export default KakaoMap;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

const StMap = styled.div`
  width: 100%;
  height: 473.74px;
  border-radius: 13.42px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  display: flex;
  justify-content: center;
  align-content: center;
`;

const StMapMobile = styled.div`
  width: 340px;
  height: 140px;
  border-radius: 3.97px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  display: flex;
  justify-content: center;
  align-content: center;
`;
