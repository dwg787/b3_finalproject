import React from 'react';
import styled from 'styled-components';
import TapHeart from '../../../assets/TapHeart.avif';
import dombae from '../../../assets/dombae.avif';
import manmi from '../../../assets/manmi.avif';
import dolsh from '../../../assets/dolsh.avif';
import soban from '../../../assets/soban.avif';
import gore from '../../../assets/gore.avif';
import mil from '../../../assets/mil.avif';

export default function Rest() {
  const godombae = () => {
    window.location.href = '/restaurant/135919';
  };

  const gomanmi = () => {
    window.location.href = '/restaurant/2841908';
  };

  const godolsh = () => {
    window.location.href = '/restaurant/2877683';
  };

  const gosoban = () => {
    window.location.href = '/restaurant/2370833';
  };

  const gogore = () => {
    window.location.href = '/restaurant/1019409';
  };

  const gomil = () => {
    window.location.href = '/restaurant/2784321';
  };

  return (
    <WarpDiv>
      <InnerBox1>
        <InnerList onClick={godombae}>
          <InnerImg src={dombae} />
          <InnerNmb>1</InnerNmb>
          <InnerText>
            <InnerTextH3>돔베돈</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>3,012</LikeText>
            </LikeBox>
            <InnerTextp>미슐랭가이드에 소개된 맛집</InnerTextp>
          </InnerText>
        </InnerList>

        <InnerList onClick={gomanmi}>
          <InnerImg src={manmi} />
          <InnerNmb>2</InnerNmb>
          <InnerText>
            <InnerTextH3>만미가</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>2,881</LikeText>
            </LikeBox>
            <InnerTextp>저렴한 바닷장어 맛집</InnerTextp>
          </InnerText>
        </InnerList>

        <InnerList onClick={godolsh}>
          <InnerImg src={dolsh} />
          <InnerNmb>3</InnerNmb>
          <InnerText>
            <InnerTextH3>돌쇠정 본점</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>2,224</LikeText>
            </LikeBox>
            <InnerTextp>연잎 떡갈비 맛집</InnerTextp>
          </InnerText>
        </InnerList>
      </InnerBox1>

      <InnerBox2>
        <InnerList onClick={gosoban}>
          <InnerImg src={soban} />
          <InnerNmb>4</InnerNmb>
          <InnerText>
            <InnerTextH3>갈비명가 소반</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>1,617</LikeText>
            </LikeBox>
            <InnerTextp>경남창원 소갈비 맛집</InnerTextp>
          </InnerText>
        </InnerList>

        <InnerList onClick={gogore}>
          <InnerImg src={gore} />
          <InnerNmb>5</InnerNmb>
          <InnerText>
            <InnerTextH3>고래고기원조할매집</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>924</LikeText>
            </LikeBox>
            <InnerTextp>고래마을내 위치한 고래고기전문점</InnerTextp>
          </InnerText>
        </InnerList>

        <InnerList onClick={gomil}>
          <InnerImg src={mil} />
          <InnerNmb>6</InnerNmb>
          <InnerText>
            <InnerTextH3>개금밀면</InnerTextH3>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>741</LikeText>
            </LikeBox>
            <InnerTextp>진한 국물이 매력적인 밀면맛집</InnerTextp>
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
