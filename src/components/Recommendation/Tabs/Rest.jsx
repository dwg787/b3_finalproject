import React from 'react';
import styled from 'styled-components';
import InnerPhoto from '../../../assets/slider3.jpeg';
import TapHeart from '../../../assets/TapHeart.png';
import dombae from '../../../assets/dombae.png';
import manmi from '../../../assets/manmi.png';
import koji from '../../../assets/koji.png';

export default function Rest() {
  return (
    <WarpDiv>
      <InnerBox1>
        <InnerList>
          <InnerImg src={dombae} />
          <InnerNmb>1</InnerNmb>
          <InnerText>
            <InnerTextH3>돔베돈</InnerTextH3>
            <InnerTextp>미슐랭가이드에 소개된 맛집</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>3,012</p>
            </LikeBox>
          </InnerText>
          <InnerButton>바로가기</InnerButton>
        </InnerList>

        <InnerList>
          <InnerImg src={manmi} />
          <InnerNmb>2</InnerNmb>
          <InnerText>
            <InnerTextH3>만미가</InnerTextH3>
            <InnerTextp>저렴한 바닷장어 맛집</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>2,881</p>
            </LikeBox>
          </InnerText>
          <InnerButton>바로가기</InnerButton>
        </InnerList>

        <InnerList>
          <InnerImg src={koji} />
          <InnerNmb>3</InnerNmb>
          <InnerText>
            <InnerTextH3>스시 코우지</InnerTextH3>
            <InnerTextp>코우지셰프 스시야</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>2,224</p>
            </LikeBox>
          </InnerText>
          <InnerButton>바로가기</InnerButton>
        </InnerList>
      </InnerBox1>

      <InnerBox2>
        <InnerList>
          <InnerImg src={InnerPhoto} />
          <InnerNmb>4</InnerNmb>
          <InnerText>
            <InnerTextH3>대방진 굴항</InnerTextH3>
            <InnerTextp>경상남도 사천시 대방동에 있는 인공항구</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>7,117</p>
            </LikeBox>
          </InnerText>
          <InnerButton>바로가기</InnerButton>
        </InnerList>

        <InnerList>
          <InnerImg src={InnerPhoto} />
          <InnerNmb>5</InnerNmb>
          <InnerText>
            <InnerTextH3>화개동천</InnerTextH3>
            <InnerTextp>우리나라에서 처음으로 차나무를 심은 곳</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>5,401</p>
            </LikeBox>
          </InnerText>
          <InnerButton>바로가기</InnerButton>
        </InnerList>

        <InnerList>
          <InnerImg src={InnerPhoto} />
          <InnerNmb>6</InnerNmb>
          <InnerText>
            <InnerTextH3>창경궁</InnerTextH3>
            <InnerTextp>옛 수강궁터에 창건한 궁</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>4,991</p>
            </LikeBox>
          </InnerText>
          <InnerButton>바로가기</InnerButton>
        </InnerList>
      </InnerBox2>
    </WarpDiv>
  );
}

const WarpDiv = styled.div`
  width: 91%;
  height: 600px;
  margin-left: 4.5%;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
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
  gap: 10px;
`;

const InnerBox2 = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  gap: 10px;
`;

const InnerList = styled.div`
  width: 560px;
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
  margin-top: 83px;
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
