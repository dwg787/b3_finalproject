import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import InputBoxButton from './InputBoxButton/InputBoxButton';
import sliderchange1 from '../assets/sliderchange1.avif';
import sliderchange2 from '../assets/sliderchange2.avif';
import sliderchange3 from '../assets/sliderchange3.avif';
import nextImg from '../assets/next.avif';
import pervImg from '../assets/prev.avif';

export default function MainSlide() {
  const settings = {
    dots: false,
    lazyLoad: true, // 필요에 따라 또는 점진적으로 이미지를 로드하거나 구성 요소를 렌더링합니다.
    infinite: true, //무한으로돌것인가?
    speed: 1000, //1000 == 1s 슬라이드가 넘어가는 시간
    slidesToShow: 1, //몇개를 보여줄것인가
    slidesToScroll: 1, // 몇개를 넘길것인가
    initialSlide: 1, //첫 번째 슬라이드의 인덱스
    autoplay: 1000, //1000 == 1s 자동으로 넘어가는 시간
    Arrows: false,
    nextArrow: (
      <NextTo>
        <ArrowImg src={nextImg} />
      </NextTo>
    ),
    prevArrow: (
      <Pre>
        <ArrowImg src={pervImg} />
      </Pre>
    ),
  };
  return (
    // 케러셀 자동슬라이드
    <ContainerDiv>
      <InputBoxButton />
      <WarpDiv>
        <StyledSlider {...settings}>
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
            <TextBox>
              <Texth2>보리나라 학원농장</Texth2>
              <Textp>
                매년 봄에 열리는 고창의 대표적인 청보리밭 축제와 드라마 '도깨비'
                촬영지로 알려지며 더욱 유명세를 치르게 되었죠.
              </Textp>
              <Textp>
                봄뿐만 아니라 10월 초 메밀꽃 시즌이 지나면 탐방로를 따라
                한적하게 산책하기 좋으며, 쉼터 구역을 가득 채운 황화코스모스까지
                볼 수 있습니다.
              </Textp>
            </TextBox>
          </ImgDiv>
          <ImgDiv>
            <MainImg src={sliderchange3} alt="배너3" srcSet="" />
            <TextBox>
              <Texth2>세종 금강보행교</Texth2>
              <Textp>
                금강보행교는 ‘세종’을 가장 잘 보여주는 다리로, 원형의 다리가
                한글 ‘ㅇ’의 모양과 닮아서 ‘이응다리’라고 이름을 붙였습니다.
              </Textp>
              <Textp>
                자전거도로, 체험형 조형물과 각종 휴게시설, 편의시설이 조성된
                원형 다리는 세종시를 대표하는 복합문화공간으로 자리매김하고
                있습니다.
              </Textp>
            </TextBox>
          </ImgDiv>
        </StyledSlider>
      </WarpDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  position: relative;
  max-width: 1036.07px;
  width: 100%;
  height: 395px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  margin-top: 33px;
`;
const WarpDiv = styled.div`
  width: 100%;
  height: 450px;
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
  font-size: 26.09px;
  font-weight: bold;
  margin-bottom: 16.01px;
`;

const Textp = styled.p`
  color: white;
  font-size: 14.03px;
  font-weight: bold;
  margin-bottom: 4.3px;
`;

const TextBox = styled.div`
  position: absolute;
  margin-top: 301.18px;
  margin-left: 101.45px;
`;

const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const Pre = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 5%;
  z-index: 3;
  margin-left: 40px;
`;

const NextTo = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5%;
  z-index: 3;
  margin-right: 40px;
`;

const ArrowImg = styled.img`
  width: 20px;
  height: 40px;
`;
