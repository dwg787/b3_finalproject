import React from 'react';
import styled from 'styled-components';
import yeonbuk from '../../assets/yeonbuk.avif';
import buseok from '../../assets/buseok.avif';
import dmz from '../../assets/dmz.avif';
import dongsung from '../../assets/dongsung.avif';
import TapHeart from '../../assets/TapHeart.avif';

export default function MyChild() {
  const goyeonbuk = () => {
    window.location.href = 'spot/126463';
  };

  const gobuseok = () => {
    window.location.href = '/spot/127669';
  };

  const godmz = () => {
    window.location.href = '/spot/2353577';
  };

  const godongsung = () => {
    window.location.href = '/spot/250331';
  };

  return (
    <Container>
      <MyChildTopText>베스트 데이트 코스</MyChildTopText>
      <MyChildListBox>
        <MyChildList onClick={goyeonbuk}>
          <MyChildNum>관광</MyChildNum>
          <MyChildImg src={yeonbuk} alt="" />
          <MyCildTextBox>
            <MyChildTexth3>연북정</MyChildTexth3>
            <MyChildTextp>제주 제주시 조천읍 조천리 2690번지</MyChildTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>972</LikeText>
            </LikeBox>
          </MyCildTextBox>
        </MyChildList>
        <MyChildList onClick={gobuseok}>
          <MyChildNum>관광</MyChildNum>
          <MyChildImg src={buseok} alt="" />
          <MyCildTextBox>
            <MyChildTexth3>부석사</MyChildTexth3>
            <MyChildTextp>경상북도 영주시 부석면 부석사로</MyChildTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>788</LikeText>
            </LikeBox>
          </MyCildTextBox>
        </MyChildList>
        <MyChildList onClick={godmz}>
          <MyChildNum>관광</MyChildNum>
          <MyChildImg src={dmz} alt="" />
          <MyCildTextBox>
            <MyChildTexth3>DMZ생태평화공원</MyChildTexth3>
            <MyChildTextp>강원도 철원군 481-1</MyChildTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>451</LikeText>
            </LikeBox>
          </MyCildTextBox>
        </MyChildList>
        <MyChildList onClick={godongsung}>
          <MyChildNum>관광</MyChildNum>
          <MyChildImg src={dongsung} alt="" />
          <MyCildTextBox>
            <MyChildTexth3>전주전동성당</MyChildTexth3>
            <MyChildTextp>전라북도 전주시 완산구 태조로 51</MyChildTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <LikeText>329</LikeText>
            </LikeBox>
          </MyCildTextBox>
        </MyChildList>
      </MyChildListBox>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1036px;
  width: 100%;
  height: 368.36px;
  display: flex;
  flex-direction: column;
  margin-top: 14.65px;
  border-radius: 11.29px;
  box-shadow: 2.26px 2.26px rgba(0, 0, 0, 0.18);
  background-color: white;
  @media screen and (max-width: 820px) {
    margin-top: 4px;
    height: 474px;
  }
`;

const MyChildTopText = styled.p`
  margin-left: 24.49px;
  color: #6478ff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 22.31px;
  @media screen and (max-width: 820px) {
    font-size: 14px;
    margin-left: 24px;
    margin-top: 16px;
  }
`;

const MyChildListBox = styled.div`
  max-width: 986.39px;
  width: 100%;
  display: flex;
  gap: 14.65px;
  justify-content: center;
  align-items: center;
  margin-top: 22.43px;
  margin-left: 24.49px;
  @media screen and (max-width: 820px) {
    height: 474px;
    margin-top: 1px;
    margin-left: 1px;
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const MyChildList = styled.div`
  width: 235.45px;
  height: 281.5px;
  background-color: white;
  box-shadow: 2.26px 2.26px #d1d1d181;
  border-radius: 13px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  @media screen and (max-width: 820px) {
    width: 164px;
    height: 197px;
  }
`;

const MyChildImg = styled.img`
  width: 252.4px;
  height: 179.56px;
  @media screen and (max-width: 820px) {
    width: 164px;
    height: 121px;
  }
`;

const MyChildNum = styled.div`
  width: 71px;
  height: 33.32px;
  position: absolute;
  border-radius: 9px;
  background-color: #a0adff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-top: 20.7px;
  margin-left: 174px;
  @media screen and (max-width: 820px) {
    width: 45px;
    height: 24px;
    font-size: 12px;
    margin-top: 20px;
    margin-left: 125px;
  }
`;

const MyCildTextBox = styled.div`
  margin-left: 23.02px;
  margin-top: 19.27px;
  @media screen and (max-width: 820px) {
    margin-top: 12px;
    margin-left: 12px;
  }
`;

const MyChildTexth3 = styled.h3`
  font-size: 17.18px;
  font-weight: bold;
  margin-bottom: 7.3px;
  color: #333333;
  @media screen and (max-width: 820px) {
    font-size: 13px;
    margin-botton: 6px;
  }
`;

const MyChildTextp = styled.p`
  color: #7f7f7f;
  font-size: 12.72px;
  @media screen and (max-width: 820px) {
    font-size: 10px;
  }
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
  align-items: center;
  @media screen and (max-width: 820px) {
    margin-top: 5px;
  }
`;

const LikeImg = styled.img`
  width: 21.03px;
  height: 17.52px;
  @media screen and (max-width: 820px) {
    width: 15px;
    height: 12px;
  }
`;

const LikeText = styled.p`
  font-size: 15.86px;
  color: #4d4d4d;
  @media screen and (max-width: 820px) {
    font-size: 12px;
  }
`;
