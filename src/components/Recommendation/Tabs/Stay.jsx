import React from 'react';
import styled from 'styled-components';
import InnerPhoto from '../../../assets/slide2.jpeg';
import TapHeart from '../../../assets/TapHeart.png';
import shilla from '../../../assets/shilla.png';
import choseon from '../../../assets/choseon.png';
import walker from '../../../assets/walker.png';
import signiel from '../../../assets/signiel.png';
import grand from '../../../assets/grand.png';
import season from '../../../assets/season.png';

export default function Spot() {
  return (
    <WarpDiv>
      <InnerBox1>
        <InnerList>
          <InnerImg src={shilla} />
          <InnerNmb>1</InnerNmb>

          <InnerText>
            <InnerTextH3>신라호텔</InnerTextH3>
            <InnerTextp>공식적으로 상장된 유일무이한 호텔</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>15,948</p>
              <InnerTex>580,000</InnerTex>
            </LikeBox>
          </InnerText>
        </InnerList>

        <InnerList>
          <InnerImg src={choseon} />
          <InnerNmb>2</InnerNmb>

          <InnerText>
            <InnerTextH3>조선호텔</InnerTextH3>
            <InnerTextp>세계적으로 신뢰받는 호텔</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>13,216</p>
              <InnerTex>700,000</InnerTex>
            </LikeBox>
          </InnerText>
        </InnerList>
        <InnerList>
          <InnerImg src={walker} />
          <InnerNmb>3</InnerNmb>

          <InnerText>
            <InnerTextH3>워커힐호텔</InnerTextH3>
            <InnerTextp>생동감 넘치는 색다른 여행</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>11,901</p>
              <InnerTex>460,000</InnerTex>
            </LikeBox>
          </InnerText>
        </InnerList>
      </InnerBox1>
      <InnerBox2>
        <InnerList>
          <InnerImg src={signiel} />
          <InnerNmb>4</InnerNmb>

          <InnerText>
            <InnerTextH3>시그니엘</InnerTextH3>
            <InnerTextp>한국최고의 호텔</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>7,423</p>
              <InnerTex>750,000</InnerTex>
            </LikeBox>
          </InnerText>
        </InnerList>
        <InnerList>
          <InnerImg src={grand} />
          <InnerNmb>5</InnerNmb>

          <InnerText>
            <InnerTextH3>그랜드 하얏트 서울</InnerTextH3>
            <InnerTextp>남산에 위치한 서울 고급호텔</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>6,223</p>
              <InnerTex>667,000</InnerTex>
            </LikeBox>
          </InnerText>
        </InnerList>
        <InnerList>
          <InnerImg src={season} />
          <InnerNmb>6</InnerNmb>

          <InnerText>
            <InnerTextH3>포시즌스 서울</InnerTextH3>
            <InnerTextp>광화문에 위치한 현대적인 감각의 호텔</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>3,903</p>
              <InnerTex>860,000</InnerTex>
            </LikeBox>
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
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 100px;
`;

const InnerNmb = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
  margin-top: 20px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
`;

const InnerBox1 = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  gap: 20px;
`;

const InnerBox2 = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  gap: 20px;
`;

const InnerList = styled.div`
  width: 540px;
  height: 190px;
  display: flex;
  border: 1px solid #6478ff;
  box-shadow: 5px 5px #d1d1d1;
  border-radius: 16px;
`;

const InnerImg = styled.img`
  width: 200px;
  height: 145px;
  margin-top: 20px;
  margin-left: 25px;
`;

const InnerText = styled.div`
  margin-top: 21px;
  margin-left: 20px;
`;

const InnerTextH3 = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const InnerTextp = styled.p`
  color: #7f7f7f;
  margin-top: 5px;
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-top: 80px;
`;

const LikeImg = styled.img`
  width: 20px;
  height: 20px;
`;

const InnerButton = styled.button`
  position: absolute;
  margin-left: 450px;
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

const InnerTex = styled.p`
  color: #333333;
  font-weight: bold;
  margin-left: 100px;
  font-size: 25px;
`;
