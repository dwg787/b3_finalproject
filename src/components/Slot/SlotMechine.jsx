import axios from 'axios';
import React, { useState, useEffect } from 'react';

//v1 슬롯머신

const SlotMachine = () => {
  //전체적인 api
  const [totalSpots, setTotalSpots] = useState([]);

  const [currentSpots, setCurrentSpots] = useState({});
  //   const [totalRestaurants, setTotalRestaurants] = useState([]);
  //   const [totalHotels, setTotalHotels] = useState([]);

  //api가 가져오는 로직
  const fetchSpotSearchData = async () => {
    const res = await axios.get(
      `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=4000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=12&areaCode=&sigunguCode=&cat1=A02&cat2=A0201&cat3=&_type=json`,
    );
    return setTotalSpots(res.data.response.body.items.item);
  };
  //api 화면랜더링시 실행
  useEffect(() => {
    fetchSpotSearchData();
  }, []);

  //랜덤 스팟함수 로직 : totalSpots을  랜덤으로 나온숫자가 정수로만들고 그거를 인덱스에넣어서 랜덤으로돌림
  // random 0.501 * 100 == 50.1  <<math.floor = 50
  // tatalSpots에 50번재를 return한다
  const getRandomSpot = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots.length)];
  };

  //   const getRandomRestaurants = () => {
  //     return slot[1][Math.floor(Math.random() * slot[1].length)];
  //   };

  //   const getRandomHotels = () => {
  //     return slot[2][Math.floor(Math.random() * slot[2].length)];
  //   };

  // const buttonClick = () => {}

  return (
    <>
      <div>{currentSpots.title}</div>
      <button
        onClick={() => {
          setCurrentSpots(getRandomSpot());
        }}
      >
        gdgdgd
      </button>
    </>
  );
};

export default SlotMachine;
