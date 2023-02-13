import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../assets/slider1.jpeg";
import slide2 from "../assets/slide2.jpeg";
import slider3 from "../assets/slider3.jpeg";

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
  };

  return (
    // 케러셀 자동슬라이드
    <ContainerDiv>
      <WarpDiv>
        <MainSlider {...settings}>
          <ImgDiv>
            <MainImg src={slide1} alt="배너2" srcSet="" />
          </ImgDiv>
          <ImgDiv>
            <MainImg src={slide2} alt="배너3" srcSet="" />
          </ImgDiv>
          <ImgDiv>
            <MainImg src={slider3} alt="배너4" srcSet="" />
          </ImgDiv>
        </MainSlider>
      </WarpDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  z-index: -1;
`;

const WarpDiv = styled.div`
  width: 60%;
  height: 480px;
`;

const MainSlider = styled(Slider)`
  height: 95%;
`;

const ImgDiv = styled.div`
  width: 100%;
  height: 480px;
`;

const MainImg = styled.img`
  width: 100%;
  height: 480px;
`;
