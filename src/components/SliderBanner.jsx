import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide1 from '../assets/slide1.jpeg';
import mainImg from '../assets/mainImg.png';
import mainImg2 from '../assets/mainImg2.png';
import InputBoxButton from './InputBoxButton/InputBoxButton';
// import slide1 from "../assets/slider1.jpeg";
// import slide2 from "../assets/slide2.jpeg";
// import slider3 from "../assets/slider3.jpeg";
export default function MainSlide() {
  const settings = {
    dots: true,
    lazyLoad: true, // 필요에 따라 또는 점진적으로 이미지를 로드하거나 구성 요소를 렌더링합니다.
    infinite: true, //무한으로돌것인가?
    speed: 1000, //1000 == 1s 슬라이드가 넘어가는 시간
    slidesToShow: 1, //몇개를 보여줄것인가
    slidesToScroll: 1, // 몇개를 넘길것인가
    initialSlide: 1, //첫 번째 슬라이드의 인덱스
    autoplay: 1000, //1000 == 1s 자동으로 넘어가는 시간
    Arrows: true,
  };
  return (
    // 케러셀 자동슬라이드
    <ContainerDiv>
      <InputBoxButton />
      <WarpDiv>
        <MainSlider {...settings}>
          <ImgDiv>
            <MainImg src={slide1} alt="배너1" srcSet="" />
          </ImgDiv>
          <ImgDiv>
            <MainImg src={mainImg} alt="배너2" srcSet="" />
          </ImgDiv>
          <ImgDiv>
            <MainImg src={mainImg2} alt="배너3" srcSet="" />
          </ImgDiv>
        </MainSlider>
      </WarpDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: gray;
  margin-top: 40px;
`;
const WarpDiv = styled.div`
  width: 100%;
  height: 550px;
`;
const MainSlider = styled(Slider)`
  height: 100%;
`;
const ImgDiv = styled.div`
  width: 100%;
  height: 550px;
`;
const MainImg = styled.img`
  width: 100%;
  height: 550px;
`;
