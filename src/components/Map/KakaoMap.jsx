import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import BlueFooter from '../Footer/BlueFooter';

const KakaoMap = ({ mapx, mapy, title, tel, homepage }) => {
  const mapcontainer = useRef(null);
  const { kakao } = window;

  const options = {
    center: new window.kakao.maps.LatLng(mapy, mapx),
    level: 3,
  };

  useEffect(() => {
    // console.log(mapx, mapy);

    const map = new window.kakao.maps.Map(mapcontainer.current, options);

    //지도 내 마커 표시
    const markerPosition = new kakao.maps.LatLng(mapy, mapx);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    let iwContent = `<div style="padding:5px;">${title}<br>전화:${tel}<br>${homepage}</div>`,
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({
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

    // console.log("kakaomap로딩완료");
  }, []);
  return (
    <Container>
      <StMap id="map" ref={mapcontainer}></StMap>
      <BlueFooter />
    </Container>
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
