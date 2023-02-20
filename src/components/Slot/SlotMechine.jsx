import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import noimg from '../../assets/noimg.avif';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import random from '../../assets/random.avif';
import { getSuggestedQuery } from '@testing-library/react';
import _ from 'lodash';
import sadari from '../../assets/sadari.mp3';
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
    speed: 500, //1000 == 1s 슬라이드가 넘어가는 시간
    slidesToShow: 4, //몇개를 보여줄것인가
    slidesToScroll: 1, // 몇개를 넘길것인가
    autoplay: true, //1000 == 1s 자동으로 넘어가는 시간
    autoplaySpeed: 500, //1000 == 1s
    cssEase: 'ease',
  };
  // ================================================================================
  //throttling

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
          setCurrentSpots1(getRandomSpot1());
          setCurrentSpots2(getRandomSpot2());
          setCurrentSpots3(getRandomSpot3());
          setCurrentSpots4(getRandomSpot4());
          setCurrentSpots5(getRandomSpot5());
          setCurrentSpots6(getRandomSpot6());
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
    return totalSpots[Math.floor(Math.random() * totalSpots?.length)];
  };

  const getRandomSpot1 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots?.length)];
  };

  const getRandomSpot2 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots?.length)];
  };

  const getRandomSpot3 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots?.length)];
  };

  const getRandomSpot4 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots?.length)];
  };

  const getRandomSpot5 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots?.length)];
  };

  const getRandomSpot6 = () => {
    return totalSpots[Math.floor(Math.random() * totalSpots?.length)];
  };

  //v2 기능 구현예정 아마도...?

  //   const getRandomRestaurants = () => {
  //     return slot[1][Math.floor(Math.random() * slot[1].length)];
  //   };

  //   const getRandomHotels = () => {
  //     return slot[2][Math.floor(Math.random() * slot[2].length)];
  //   };

  // const buttonClick = () => {}
  // console.log(currentSpots);
  return (
    <ContainerDiv>
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
      <WrapDiv>
        {currentSpots?.firstimage !== '' ? (
          <ImageBox>
            <SlotImg src={currentSpots?.firstimage} alt="" />
          </ImageBox>
        ) : (
          <ImageBox>
            <SlotImg src={noimg} alt="" />
          </ImageBox>
        )}
        <div>{currentSpots?.title}</div>
        <SlotButton onClick={lolinghandler}>관광지 랜덤뽑기!</SlotButton>
      </WrapDiv>
    </ContainerDiv>
  );
};

export default SlotMachine;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65%;
  border: 1px solid #6478ff;
  border-radius: 30px;
  margin-top: 100px;
  margin-bottom: 100px;
  margin-left: 20%;
`;

const WrapDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #6478ff;
  width: 100%;
`;

const SlotImg = styled.img`
  width: 500px;
  height: 500px;
`;

const ImageBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #6478ff;
  margin: 20px 10px 20px 10px;
`;

const SlotImg1 = styled.img`
  border: 1px solid #6478ff;
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;

const MainSlider = styled(Slider)`
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const ImgDiv = styled.div`
  width: 200px;
  height: 200px;
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
`;
