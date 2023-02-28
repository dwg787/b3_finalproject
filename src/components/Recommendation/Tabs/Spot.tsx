import React from 'react';
import styled from 'styled-components';
import TapHeart from '../../../assets/TapHeart.avif';
import gyongrim from '../../../assets/gyongrim.avif';
import donggung from '../../../assets/donggung.avif';
import gumsung from '../../../assets/gumsung.avif';
import deabang from '../../../assets/deabang.avif';
import hwagae from '../../../assets/hwagae.avif';
import chang from '../../../assets/chang.avif';

export default function Spot() {
  const gorim = () => {
    window.location.href = '/spot/128116';
  };

  const godong = () => {
    window.location.href = '/spot/128526';
  };

  const gogumsung = () => {
    window.location.href = '/spot/126407';
  };

  const godeabang = () => {
    window.location.href = '/spot/126225';
  };

  const gohwagae = () => {
    window.location.href = '/spot/2786913';
  };

  const gochang = () => {
    window.location.href = '/spot/126511';
  };

  return (
    <WarpDiv>
      <InnerBox1>
        <InnerList onClick={gorim}>
          <InnerImg src={gyongrim} />
          <InnerNmb>1</InnerNmb>
          <InnerText>
            <InnerTextH3>경주 계림</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>9,812</LikeText>
            </LikeBox>
            <InnerTextp>김알지의 탄생 설화가 깃든 숲</InnerTextp>
          </InnerText>
        </InnerList>

        <InnerList onClick={godong}>
          <InnerImg src={donggung} />
          <InnerNmb>2</InnerNmb>
          <InnerText>
            <InnerTextH3>동궁과 월지</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>8,181</LikeText>
            </LikeBox>
            <InnerTextp>신라 조경예술의 극치를 보여준다.</InnerTextp>
          </InnerText>
        </InnerList>

        <InnerList onClick={gogumsung}>
          <InnerImg src={gumsung} />
          <InnerNmb>3</InnerNmb>
          <InnerText>
            <InnerTextH3>금성산성</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>7,522</LikeText>
            </LikeBox>
            <InnerTextp>고려시대 이후 입보용으로 사용된 성</InnerTextp>
          </InnerText>
        </InnerList>
      </InnerBox1>

      <InnerBox2>
        <InnerList onClick={godeabang}>
          <InnerImg src={deabang} />
          <InnerNmb>4</InnerNmb>
          <InnerText>
            <InnerTextH3>대방진 굴항</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>7,117</LikeText>
            </LikeBox>
            <InnerTextp>경상남도 사천시 대방동에 있는 인공항구</InnerTextp>
          </InnerText>
        </InnerList>

        <InnerList onClick={gohwagae}>
          <InnerImg src={hwagae} />
          <InnerNmb>5</InnerNmb>
          <InnerText>
            <InnerTextH3>화개동천</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>5,401</LikeText>
            </LikeBox>
            <InnerTextp>우리나라에서 처음으로 차나무를 심은 곳</InnerTextp>
          </InnerText>
        </InnerList>

        <InnerList onClick={gochang}>
          <InnerImg src={chang} />
          <InnerNmb>6</InnerNmb>
          <InnerText>
            <InnerTextH3>창경궁</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>4,991</LikeText>
            </LikeBox>
            <InnerTextp>옛 수강궁터에 창건한 궁</InnerTextp>
          </InnerText>
        </InnerList>
      </InnerBox2>
    </WarpDiv>
  );
}
const WarpDiv = styled.div`
  width: 90%;
  height: 600px;
  margin-left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 87.9px;
`;

const InnerNmb = styled.div`
  position: absolute;
  width: 40.56px;
  height: 40.56px;
  background-color: rgba(0, 0, 0, 0.56);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 7.33px;
  font-weight: bold;
  font-size: 20.67px;
`;

const InnerBox1 = styled.div`
  width: 600px;
  height: 463.59px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  gap: 16.74px;
`;

const InnerBox2 = styled.div`
  width: 600px;
  height: 463.59px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  gap: 16.74px;
`;

const InnerList = styled.div`
  width: 448.93px;
  height: 143.37px;
  display: flex;
  box-shadow: 2.26px 2.26px #d1d1d181;
  border-radius: 7.66px;
  cursor: pointer;
`;

const InnerImg = styled.img`
  width: 156.15px;
  height: 143.99px;
  border-radius: 7.33px;
`;

const InnerText = styled.div`
  margin-top: 25.23px;
  margin-left: 27.43px;
`;

const InnerTextH3 = styled.h3`
  font-size: 18.97px;
  font-weight: bold;
  color: #4d4d4d;
`;

const InnerTextp = styled.p`
  color: #7f7f7f;
  margin-top: 5px;
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-top: 12.3px;
  margin-bottom: 11.42px;
`;

const LikeImg = styled.img`
  width: 21.03px;
  height: 17.52px;
`;

const LikeText = styled.p`
  font-size: 15.86px;
  color: #4d4d4d;
`;

const InnerButton = styled.button`
  position: absolute;
  margin-left: 430px;
  border: 1px solid #6478ff;
  border-radius: 10px;
  background-color: white;
  color: #6478ff;
  width: 66px;
  height: 30px;
  margin-top: 137px;
  &:hover {
    border: 1px solid white;
    border-radius: 10px;
    background-color: #6478ff;
    color: white;
  }
`;
