import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { nearStayState } from '../../recoil/apiDataAtoms';
import { MapMarker } from 'react-kakao-maps-sdk';

interface stayPositionObjType {
  title: string;
  position: {
    La: number;
    Ma: number;
  };
}

const SideInfoMap = ({
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
  const nearStayList = useRecoilValue(nearStayState);
  const mapcontainer = useRef(null);
  const [stayPositionList, setStayPositionList] = useState<
    stayPositionObjType[]
  >();
  //   const [stayMarkerInfo, setStayMarkerInfo] = useState(null);

  const { kakao } = window;

  console.log('리코일로 받아온 근처 숙박 리스트', nearStayList);

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
    // const imageSrc =
    //   'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    if (nearStayList) {
      const stayPositions = nearStayList.map((e: any) => {
        return {
          title: e.title,
          position: new kakao.maps.LatLng(e.mapy, e.mapx),
        };
      });
      //   for (let i = 0; i < stayPositions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      // let imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      // let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      // let stayMarker = new kakao.maps.Marker({
      //   map: map, // 마커를 표시할 지도
      //   position: stayPositions[i].position, // 마커를 표시할 위치
      //   title: stayPositions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      //   image: markerImage, // 마커 이미지
      // });

      console.log('숙박 위치 리스트', stayPositions);
      // console.log(stayMarker);
      // setStayMarkerInfo(stayMarker);
      // stayMarker.setMap(map);
      // 마커에 클릭이벤트를 등록합니다
      //   }
      //   kakao.maps.event.addListener(stayMarkerInfo, 'click', function() {
      //     infowindow.open(map, stayMarkerInfo);
      //   });
      setStayPositionList(stayPositions);
    }
    console.log('가공된 숙박 위치 리스트', stayPositionList);

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
    <>
      {stayPositionList &&
        stayPositionList.map((e) => {
          <MapMarker
            key={`${e.title}${e.position.Ma}`}
            position={{
              lat: e.position.Ma,
              lng: e.position.La,
            }}
            image={{
              src:
                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
              size: {
                width: 24,
                height: 35,
              },
            }}
            // onClick={}
          ></MapMarker>;
        })}
      <StMap id="map" ref={mapcontainer}></StMap>
    </>
  );
};

export default SideInfoMap;

const StMap = styled.div`
  width: 100%;
  height: 706px;
  border-radius: 20px;
  border: 1px solid rgb(158, 171, 255, 0.61);
`;
