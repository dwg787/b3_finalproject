import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import noimg from '../../assets/noimg.avif';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import random from '../../assets/random.avif';
import _ from 'lodash';
import sadari from '../../assets/sadari.mp3';
import BlueFooter from '../Footer/BlueFooter';
import Randomslot from '../../assets/Randomslot.avif';
//v1 슬롯머신

const SlotMachine = () => {
  const [isClick, setIsClick] = useState(true);

  //전체적인 api
  const [totalSpots, setTotalSpots] = useState([]);
  //[장소. 맛집, 숙박] 데이터를 담아주는 State
  const [currentSpots, setCurrentSpots] = useState({ firstimage: random });
  const [currentSpots1, setCurrentSpots1] = useState({ firstimage: random });
  const [currentSpots2, setCurrentSpots2] = useState({ firstimage: random });
  const [currentSpots3, setCurrentSpots3] = useState({ firstimage: random });
  const [currentSpots4, setCurrentSpots4] = useState({ firstimage: random });
  const [currentSpots5, setCurrentSpots5] = useState({ firstimage: random });
  const [currentSpots6, setCurrentSpots6] = useState({ firstimage: random });

  const settings = {
    dots: false,
    lazyLoad: true, // 필요에 따라 또는 점진적으로 이미지를 로드하거나 구성 요소를 렌더링합니다.
    infinite: true, //무한으로돌것인가?
    speed: 750, //1000 == 1s 슬라이드가 넘어가는 시간
    slidesToShow: 5, //몇개를 보여줄것인가
    slidesToScroll: 1, // 몇개를 넘길것인가
    autoplay: true, //1000 == 1s 자동으로 넘어가는 시간
    autoplaySpeed: 750, //1000 == 1s
    cssEase: 'linear',
    arrows: false, // 아래 dost 네비게이션 안보이게 하기 (보이고 싶을 때는 true로 변경)
  };

  let audio = new Audio(sadari);
  const start = () => {
    audio.play();
  };

  const Loling = () => {
    start();
    let lolingDelay = 20;
    let lolingCounter = 0;
    const addLoling = () => {
      const count = 38;

      if (lolingCounter < count) {
        if (lolingCounter % 5 === 0) {
          lolingDelay += 40;
        }

        lolingCounter += 1;
        setTimeout(() => {
          setCurrentSpots(getRandomSpot());
          setCurrentSpots1(getRandomSpot());
          setCurrentSpots2(getRandomSpot());
          setCurrentSpots3(getRandomSpot());
          setCurrentSpots4(getRandomSpot());
          setCurrentSpots5(getRandomSpot());
          setCurrentSpots6(getRandomSpot());
          addLoling();
        }, lolingDelay);
      }
      if (lolingCounter === count - 1) {
        audio.pause();
      }
    };

    addLoling();
  };

  const selectEventControl = (delay) => {
    return _.throttle(() => Loling(), delay, {
      leading: true,
      trailing: false,
    });
  };

  const lolinghandler = () => {
    // handleSearchText();
    if (isClick) {
      Loling(false);
      console.log('어려웡');
      setIsClick(false);
      setTimeout(() => {
        setIsClick(true);
      }, 7000);
    }
  };

  console.log('currentSpots', currentSpots);
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
    return totalSpots[Math.floor(Math.random() * totalSpots?.length || 1)];
  };

  //v2 기능 구현예정 아마도...?

  //   const getRandomRestaurants = () => {
  //     return slot[1][Math.floor(Math.random() * slot[1].length)];
  //   };

  //   const getRandomHotels = () => {
  //     return slot[2][Math.floor(Math.random() * slot[2].length)];
  //   };

  return (
    <BigContainer>
      <SlotTitleImg src={Randomslot} alt="" />
      <ContainerDiv>
        <SliderDiv>
          <MainSlider {...settings}>
            <ImgDiv>
              {currentSpots1 && (
                <SlotImg1 src={currentSpots1.firstimage || noimg} alt="" />
              )}
            </ImgDiv>
            <ImgDiv>
              {currentSpots2 && (
                <SlotImg1 src={currentSpots2.firstimage || noimg} alt="" />
              )}
            </ImgDiv>
            <ImgDiv>
              {currentSpots3 && (
                <SlotImg1 src={currentSpots3.firstimage || noimg} alt="" />
              )}
            </ImgDiv>
            <ImgDiv>
              {currentSpots4 && (
                <SlotImg1 src={currentSpots4.firstimage || noimg} alt="" />
              )}
            </ImgDiv>
            <ImgDiv>
              {currentSpots5 && (
                <SlotImg1 src={currentSpots5.firstimage || noimg} alt="" />
              )}
            </ImgDiv>
            <ImgDiv>
              {currentSpots6 && (
                <SlotImg1 src={currentSpots6.firstimage || noimg} alt="" />
              )}
            </ImgDiv>
          </MainSlider>
        </SliderDiv>
        <WrapDiv>
          {currentSpots?.firstimage !== '' ? (
            <ImageBox>
              <SlotSmallImg src={random}></SlotSmallImg>
              <SlotImg src={currentSpots?.firstimage} alt="" />
              <SlotSmallImg src={random}></SlotSmallImg>
            </ImageBox>
          ) : (
            <ImageBox>
              <SlotSmallImg src={random}></SlotSmallImg>
              <SlotImg src={noimg} alt="" />
              <SlotSmallImg src={random}></SlotSmallImg>
            </ImageBox>
          )}
          <div>{currentSpots?.title}</div>
          <SlotButton onClick={lolinghandler}>관광지 랜덤뽑기!</SlotButton>
        </WrapDiv>
      </ContainerDiv>
      <BlueFooter />
    </BigContainer>
  );
};

export default SlotMachine;
const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65%;
  height: 100%;
  border: 1px solid #6478ff;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  margin-bottom: 100px;
`;

const WrapDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const SlotImg = styled.img`
  width: 400px;
  height: 400px;
`;

const SlotSmallImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 150px;
`;

const ImageBox = styled.div`
  width: 90%;
  gap: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px 10px 20px 10px;
`;

const SlotImg1 = styled.img`
  width: 180px;
  height: 180px;
  margin-top: 40px;
  border-radius: 100px;
`;

const SliderDiv = styled.div`
  width: 100%;
  height: 200px;
`;

const SlotTitleImg = styled.img`
  margin-bottom: 20px;
`;

const MainSlider = styled(Slider)``;

const ImgDiv = styled.div`
  width: 600px;
  height: 300px;
`;

const SlotButton = styled.button`
  background-color: white;
  border: 1px solid #6478ff;
  border-radius: 20px;
  color: #6478ff;
  width: 200px;
  height: 50px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  &:hover {
    background-color: #6478ff;
    color: white;
  }
`;
