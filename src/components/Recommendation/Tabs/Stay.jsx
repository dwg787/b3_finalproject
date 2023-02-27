import React from 'react';
import styled from 'styled-components';
import TapHeart from '../../../assets/TapHeart.avif';
import shilla from '../../../assets/shilla.avif';
import hoong from '../../../assets/hoong.avif';
import okwood from '../../../assets/okwood.avif';
import jeju from '../../../assets/jeju.avif';
import jejusin from '../../../assets/jejusin.avif';
import jimil from '../../../assets/jimil.avif';

export default function Spot() {
  return (
    <WarpDiv>
      <InnerBox1>
        <a href="http://localhost:3000/stay/142734">
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
        </a>

        <a href="http://localhost:3000/stay/2917226">
          <InnerList>
            <InnerImg src={hoong} />
            <InnerNmb>2</InnerNmb>

            <InnerText>
              <InnerTextH3>머큐어 앰배서더 서울 홍대</InnerTextH3>
              <InnerTextp>홍대입구역 10분거리 호텔</InnerTextp>
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <p>13,216</p>
                <InnerTex>140,000</InnerTex>
              </LikeBox>
            </InnerText>
          </InnerList>
        </a>

        <a href="http://localhost:3000/stay/2008490">
          <InnerList>
            <InnerImg src={okwood} />
            <InnerNmb>3</InnerNmb>

            <InnerText>
              <InnerTextH3>오크우드 프리미어 코엑스</InnerTextH3>
              <InnerTextp>하루부터 최대1년까지 투숙이가능한호텔</InnerTextp>
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <p>11,901</p>
                <InnerTex>260,000</InnerTex>
              </LikeBox>
            </InnerText>
          </InnerList>
        </a>
      </InnerBox1>

      <InnerBox2>
        <a href="http://localhost:3000/stay/2716736">
          <InnerList>
            <InnerImg src={jejusin} />
            <InnerNmb>4</InnerNmb>

            <InnerText>
              <InnerTextH3>신라스테이 제주</InnerTextH3>
              <InnerTextp>제주국제공항 10분거리에 위치한호텔</InnerTextp>
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <p>7,423</p>
                <InnerTex>450,000</InnerTex>
              </LikeBox>
            </InnerText>
          </InnerList>
        </a>
        <a href="http://localhost:3000/stay/2876795">
          <InnerList>
            <InnerImg src={jeju} />
            <InnerNmb>5</InnerNmb>

            <InnerText>
              <InnerTextH3>그랜드 하얏트 제주</InnerTextH3>
              <InnerTextp>신제주 관광 줌심지에있는 고급호텔</InnerTextp>
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <p>6,223</p>
                <InnerTex>177,000</InnerTex>
              </LikeBox>
            </InnerText>
          </InnerList>
        </a>
        <a href="http://localhost:3000/stay/2706601">
          <InnerList>
            <InnerImg src={jimil} />
            <InnerNmb>6</InnerNmb>

            <InnerText>
              <InnerTextH3>왕의지밀 선조관</InnerTextH3>
              <InnerTextp>현대식시설의 편리함을 갖춘 한옥호텔</InnerTextp>
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <p>3,903</p>
                <InnerTex>220,000</InnerTex>
              </LikeBox>
            </InnerText>
          </InnerList>
        </a>
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
