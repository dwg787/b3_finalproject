import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import InputBoxButton from './InputBoxButton/InputBoxButton';
import sliderchange1 from '../assets/sliderchange1.png';
import sliderchange2 from '../assets/sliderchange2.png';
import sliderchange3 from '../assets/sliderchange3.png';

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
            <MainImg src={sliderchange1} alt="배너1" srcSet="" />
            <TextBox>
              <Texth2>부산 광안리 해수욕장</Texth2>
              <Textp>
                부산의 랜드마크인 '광안대교'가 수평선과 함께 조화롭고 아름다운
                경관을 선사하는 부산 대표 해수욕장으로
              </Textp>
              <Textp>
                양질의 모래사장과 사시사철 다양한 축제로 젊은이들 뿐만 아니라
                모든 세대들이 즐겨찾는 부산의 관광명소입니다.
              </Textp>
            </TextBox>
          </ImgDiv>
          <ImgDiv>
            <MainImg src={sliderchange2} alt="배너2" srcSet="" />
            <Texth2>부산 광안리 해수욕장</Texth2>
            <Textp>
              부산의 랜드마크인 '광안대교'가 수평선과 함께 조화롭고 아름다운
              경관을 선사하는 부산 대표 해수욕장으로
            </Textp>
            <Textp>
              양질의 모래사장과 사시사철 다양한 축제로 젊은이들 뿐만 아니라 모든
              세대들이 즐겨찾는 부산의 관광명소입니다.
            </Textp>
          </ImgDiv>
          <ImgDiv>
            <MainImg src={sliderchange3} alt="배너3" srcSet="" />
            <Texth2>보리나라 학원농장</Texth2>
            <Textp>
              매년 봄에 열리는 고창의 대표적인 청보리밭 축제와 드라마 '도깨비'
              촬영지로 알려지며 더욱 유명세를 치르게 되었죠.
            </Textp>
            <Textp>
              봄뿐만 아니라 10월 초 메밀꽃 시즌이 지나면 탐방로를 따라 한적하게
              산책하기 좋으며, 쉼터 구역을 가득 채운 황화코스모스까지 볼 수
              있습니다.
            </Textp>
          </ImgDiv>
        </MainSlider>
      </WarpDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  position: relative;
  width: 65%;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: gray;
  margin-top: 40px;
`;
const WarpDiv = styled.div`
  width: 100%;
  height: 450px;
`;
const MainSlider = styled(Slider)`
  height: 100%;
`;
const ImgDiv = styled.div`
  width: 100%;
  height: 450px;
  position: relative;
`;
const MainImg = styled.img`
  width: 100%;
  height: 450px;
  position: absolute;
`;

const Texth2 = styled.h2`
  color: white;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Textp = styled.p`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const TextBox = styled.div`
  position: absolute;
  margin-top: 290px;
  margin-left: 125px;
`;
