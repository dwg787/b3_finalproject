import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import noimg from '../../assets/noimg.avif';

//v1 슬롯머신

const SlotMachine = () => {
  //전체적인 api
  const [totalSpots, setTotalSpots] = useState([]);

  //[장소. 맛집, 숙박] 데이터를 담아주는 State
  const [currentSpots, setCurrentSpots] = useState({});
  const [currentSpots1, setCurrentSpots1] = useState({});
  const [currentSpots2, setCurrentSpots2] = useState({});
  const [currentSpots3, setCurrentSpots3] = useState({});
  const [currentSpots4, setCurrentSpots4] = useState({});
  const [currentSpots5, setCurrentSpots5] = useState({});
  const [currentSpots6, setCurrentSpots6] = useState({});

  //   const [totalRestaurants, setTotalRestaurants] = useState([]);
  //   const [totalHotels, setTotalHotels] = useState([]);
  console.log(currentSpots);

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

  const getRandomSpot1 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots.length)];
  };

  const getRandomSpot2 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots.length)];
  };

  const getRandomSpot3 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots.length)];
  };

  const getRandomSpot4 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots.length)];
  };

  const getRandomSpot5 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots.length)];
  };

  const getRandomSpot6 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots.length)];
  };

  //v2 기능 구현예정 아마도...?

  //   const getRandomRestaurants = () => {
  //     return slot[1][Math.floor(Math.random() * slot[1].length)];
  //   };

  //   const getRandomHotels = () => {
  //     return slot[2][Math.floor(Math.random() * slot[2].length)];
  //   };

  // const buttonClick = () => {}
  console.log(currentSpots);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };

  //   <div>
  //   <SlotImg1 src={currentSpots1.firstimage || noimg} alt="" />
  // </div>
  // <div>
  //   <SlotImg2 src={currentSpots2.firstimage || noimg} alt="" />
  // </div>
  // <div>
  //   <SlotImg3 src={currentSpots3.firstimage || noimg} alt="" />
  // </div>
  // <div>
  //   <SlotImg4 src={currentSpots4.firstimage || noimg} alt="" />
  // </div>
  // <div>
  //   <SlotImg5 src={currentSpots5.firstimage || noimg} alt="" />
  // </div>
  // <div>
  //   <SlotImg6 src={currentSpots6.firstimage || noimg} alt="" />
  // </div>

  return (
    <WrapDiv>
      <ImageBox1>
        <SlotImg1 src={currentSpots1.firstimage || noimg} alt="" />
        <SlotImg2 src={currentSpots2.firstimage || noimg} alt="" />
        <SlotImg3 src={currentSpots3.firstimage || noimg} alt="" />
        <SlotImg4 src={currentSpots4.firstimage || noimg} alt="" />
        <SlotImg5 src={currentSpots5.firstimage || noimg} alt="" />
        <SlotImg6 src={currentSpots6.firstimage || noimg} alt="" />
      </ImageBox1>
      {/* <Slider>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider> */}

      {currentSpots.firstimage !== '' ? (
        <ImageBox>
          <SlotImg src={currentSpots.firstimage} alt="" />
        </ImageBox>
      ) : (
        <ImageBox>
          <SlotImg src={noimg} alt="" />
        </ImageBox>
      )}
      <div>{currentSpots.title}</div>
      <button
        onClick={() => {
          setCurrentSpots(getRandomSpot());
          setCurrentSpots1(getRandomSpot1());
          setCurrentSpots2(getRandomSpot2());
          setCurrentSpots3(getRandomSpot3());
          setCurrentSpots4(getRandomSpot4());
          setCurrentSpots5(getRandomSpot5());
          setCurrentSpots6(getRandomSpot6());
        }}
      >
        관광지 랜덤뽑기!
      </button>
    </WrapDiv>
  );
};

export default SlotMachine;

const WrapDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const SlotImg = styled.img`
  width: 500px;
  height: 500px;
`;

const ImageBox = styled.div`
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox1 = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  /* overflow: hidden; */
`;

const SlotImg1 = styled.img`
  width: 200px;
  height: 200px;
`;

const SlotImg2 = styled.img`
  width: 200px;
  height: 200px;
`;
const SlotImg3 = styled.img`
  width: 200px;
  height: 200px;
`;
const SlotImg4 = styled.img`
  width: 200px;
  height: 200px;
`;
const SlotImg5 = styled.img`
  width: 200px;
  height: 200px;
`;
const SlotImg6 = styled.img`
  width: 200px;
  height: 200px;
`;

const SliderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;
