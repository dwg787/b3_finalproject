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
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <LikeText>15,948</LikeText>
              </LikeBox>
              <InnerTextp>서울</InnerTextp>
            </InnerText>
          </InnerList>
        </a>

        <a href="http://localhost:3000/stay/2917226">
          <InnerList>
            <InnerImg src={hoong} />
            <InnerNmb>2</InnerNmb>

            <InnerText>
              <InnerTextH3>머큐어 앰배서더 서울 홍대</InnerTextH3>
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <LikeText>13,216</LikeText>
              </LikeBox>
              <InnerTextp>서울</InnerTextp>
            </InnerText>
          </InnerList>
        </a>

        <a href="http://localhost:3000/stay/2008490">
          <InnerList>
            <InnerImg src={okwood} />
            <InnerNmb>3</InnerNmb>

            <InnerText>
              <InnerTextH3>오크우드 프리미어 코엑스</InnerTextH3>
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <LikeText>11,901</LikeText>
              </LikeBox>
              <InnerTextp>서울</InnerTextp>
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
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <LikeText>7,423</LikeText>
              </LikeBox>
              <InnerTextp>제주</InnerTextp>
            </InnerText>
          </InnerList>
        </a>
        <a href="http://localhost:3000/stay/2876795">
          <InnerList>
            <InnerImg src={jeju} />
            <InnerNmb>5</InnerNmb>

            <InnerText>
              <InnerTextH3>그랜드 하얏트 제주</InnerTextH3>
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <LikeText>6,223</LikeText>
              </LikeBox>
              <InnerTextp>제주</InnerTextp>
            </InnerText>
          </InnerList>
        </a>
        <a href="http://localhost:3000/stay/2706601">
          <InnerList>
            <InnerImg src={jimil} />
            <InnerNmb>6</InnerNmb>

            <InnerText>
              <InnerTextH3>왕의지밀 선조관</InnerTextH3>
              <LikeBox>
                <LikeImg src={TapHeart} alt="" />
                <LikeText>3,903</LikeText>
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 87.9px;
  @media screen and (max-width: 1036px) {
    gap: 20px;
  }
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
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 16.74px;
  @media screen and (max-width: 820px) {
    height: 300px;
    gap: 8px;
    margin-bottom: 10px;
  }
`;

const InnerBox2 = styled.div`
  width: 600px;
  height: 463.59px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 16.74px;
  @media screen and (max-width: 820px) {
    display: none;
  }
  @media screen and (max-width: 390px) {
    display: none;
  }
`;

const InnerList = styled.div`
  width: 448.93px;
  height: 143.37px;
  display: flex;
  box-shadow: 2.26px 2.26px #d1d1d181;
  border-radius: 6px;
  cursor: pointer;
  @media screen and (max-width: 820px) {
    width: 340px;
    height: 108px;
    margin-bottom: 5px;
  }
`;

const InnerImg = styled.img`
  width: 156.15px;
  height: 143.99px;
  border-radius: 6px;
  @media screen and (max-width: 820px) {
    width: 118px;
    height: 108px;
  }
`;

const InnerText = styled.div`
  margin-top: 25.23px;
  margin-left: 27.43px;
  @media screen and (max-width: 820px) {
    margin-top: 19px;
    margin-left: 20px;
  }
`;

const InnerTextH3 = styled.h3`
  font-size: 18.97px;
  font-weight: bold;
  color: #4d4d4d;
  @media screen and (max-width: 820px) {
    font-size: 15px;
  }
`;

const InnerTextp = styled.p`
  color: #7f7f7f;
  margin-top: 5px;
  @media screen and (max-width: 820px) {
    font-size: 12px;
  }
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-top: 12.3px;
  margin-bottom: 11.42px;
  @media screen and (max-width: 820px) {
    margin-top: 8px;
    font-size: 5px;
  }
`;

const LikeImg = styled.img`
  width: 21.03px;
  height: 17.52px;
`;

const LikeText = styled.p`
  font-size: 15.86px;
  color: #4d4d4d;
  font-weight: bold;
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
