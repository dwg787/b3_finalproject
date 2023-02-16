import React from 'react';
import styled from 'styled-components';
import yeonbuk from '../../assets/yeonbuk.png';
import buseok from '../../assets/buseok.png';
import dmz from '../../assets/dmz.png';
import dongsung from '../../assets/dongsung.png';
import TapHeart from '../../assets/TapHeart.png';

export default function MyChild() {
  return (
    <Container>
      <MyChildTopText>베스트 데이트 코스</MyChildTopText>
      <MyChildListBox>
        <MyChildList>
          <MyChildImg src={yeonbuk} alt="" />
          <p>연북정</p>
          <p>제주 제주시 조천읍 조천리 2690번지</p>
          <LikeBox>
            <LikeImg src={TapHeart} alt="" />
            <p>좋아요</p>
          </LikeBox>
          <p>바로가기</p>
        </MyChildList>
        <MyChildList>
          <MyChildImg src={buseok} alt="" />
          <p>부석사</p>
          <p>경상북도 영주시 부석면 부석사로</p>
          <LikeBox>
            <LikeImg src={TapHeart} alt="" />
            <p>좋아요</p>
          </LikeBox>
          <p>바로가기</p>
        </MyChildList>
        <MyChildList>
          <MyChildImg src={dmz} alt="" />
          <p>DMZ생태평화공원</p>
          <p>강원도 철원군 481-1</p>
          <LikeBox>
            <LikeImg src={TapHeart} alt="" />
            <p>좋아요</p>
          </LikeBox>
          <p>바로가기</p>
        </MyChildList>
        <MyChildList>
          <MyChildImg src={dongsung} alt="" />
          <p>전주전동성당</p>
          <p>전라북도 전주시 완산구 태조로 51</p>
          <LikeBox>
            <LikeImg src={TapHeart} alt="" />
            <p>좋아요</p>
          </LikeBox>
          <p>바로가기</p>
        </MyChildList>
      </MyChildListBox>
    </Container>
  );
}
const Container = styled.div`
  width: 90%;
  height: 600px;
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  border: 1.5px solid white;
  border-radius: 50px;
  box-shadow: 5px 5px #c8c8c8;
  background-color: white;
`;

const MyChildTopText = styled.p`
  margin-left: 70px;
  color: #6478ff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
`;

const MyChildListBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
`;

const MyChildList = styled.div`
  width: 300px;
  height: 413px;
  background-color: white;
  box-shadow: 5px 5px #d1d1d1;
  border: 1px solid #6478ff;
  border-radius: 13px;
  overflow: hidden;
  position: relative;
`;

const MyChildImg = styled.img`
  width: 300px;
  height: 250px;
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const LikeImg = styled.img`
  width: 20px;
  height: 20px;
`;
