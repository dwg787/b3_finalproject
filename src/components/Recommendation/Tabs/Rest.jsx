import React from 'react';
import styled from 'styled-components';
import InnerPhoto from '../../../assets/slider3.avif';
import TapHeart from '../../../assets/TapHeart.avif';
import dombae from '../../../assets/dombae.avif';
import manmi from '../../../assets/manmi.avif';
import koji from '../../../assets/koji.avif';
import soban from '../../../assets/soban.avif';
import gore from '../../../assets/gore.avif';
import mil from '../../../assets/mil.avif';

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
          <InnerImg src={soban} />
          <InnerNmb>4</InnerNmb>
          <InnerText>
            <InnerTextH3>갈비명가 소반</InnerTextH3>
            <InnerTextp>경남창원 소갈비 맛집</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>1,617</p>
            </LikeBox>
          </InnerText>
          <InnerButton>바로가기</InnerButton>
        </InnerList>

        <InnerList>
          <InnerImg src={gore} />
          <InnerNmb>5</InnerNmb>
          <InnerText>
            <InnerTextH3>고래고기원조할매집</InnerTextH3>
            <InnerTextp>고래마을내 위치한 고래고기전문점</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>924</p>
            </LikeBox>
          </InnerText>
          <InnerButton>바로가기</InnerButton>
        </InnerList>

        <InnerList>
          <InnerImg src={mil} />
          <InnerNmb>6</InnerNmb>
          <InnerText>
            <InnerTextH3>개금밀면</InnerTextH3>
            <InnerTextp>진한 국물이 매력적인 밀면맛집</InnerTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>741</p>
            </LikeBox>
          </InnerText>
          <InnerButton>바로가기</InnerButton>
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
