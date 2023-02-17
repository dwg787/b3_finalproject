import React from 'react';
import styled from 'styled-components';
import chumsung from '../../assets/chumsung.avif';
import naksan from '../../assets/naksan.avif';
import jinju from '../../assets/jinju.avif';
import yang from '../../assets/yang.avif';
import TapHeart from '../../assets/TapHeart.avif';

export default function MyChild() {
  return (
    <Container>
      <MyChildTopText>아이와 함께 하기 좋은 관광지</MyChildTopText>
      <MyChildListBox>
        <MyChildList>
          <MyChildImg src={chumsung} alt="" />
          <MyCildTextBox>
            <MyChildTexth3>첨성대</MyChildTexth3>
            <MyChildTextp>제주 제주시 조천읍 조천리 2690번지</MyChildTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>2348</p>
            </LikeBox>
            <GoButton>바로가기</GoButton>
          </MyCildTextBox>
        </MyChildList>
        <MyChildList>
          <MyChildImg src={naksan} alt="" />
          <MyCildTextBox>
            <MyChildTexth3>낙산사</MyChildTexth3>
            <MyChildTextp>경상북도 영주시 부석면 부석사로</MyChildTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>1892</p>
            </LikeBox>
            <GoButton>바로가기</GoButton>
          </MyCildTextBox>
        </MyChildList>
        <MyChildList>
          <MyChildImg src={jinju} alt="" />
          <MyCildTextBox>
            <MyChildTexth3>진주성</MyChildTexth3>
            <MyChildTextp>강원도 철원군 481-1</MyChildTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>1622</p>
            </LikeBox>
            <GoButton>바로가기</GoButton>
          </MyCildTextBox>
        </MyChildList>
        <MyChildList>
          <MyChildImg src={yang} alt="" />
          <MyCildTextBox>
            <MyChildTexth3>언양읍성</MyChildTexth3>
            <MyChildTextp>전라북도 전주시 완산구 태조로 51</MyChildTextp>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>972</p>
            </LikeBox>
            <GoButton>바로가기</GoButton>
          </MyCildTextBox>
        </MyChildList>
      </MyChildListBox>
    </Container>
  );
}
const Container = styled.div`
  width: 65%;
  height: 580px;
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  border: 1.5px solid white;
  border-radius: 50px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const MyChildTopText = styled.p`
  margin-left: 40px;
  color: #6478ff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
`;

const MyChildListBox = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const MyChildList = styled.div`
  width: 280px;
  height: 413px;
  background-color: white;
  box-shadow: 5px 5px #d1d1d1;
  border: 1px solid #6478ff;
  border-radius: 13px;
  overflow: hidden;
  position: relative;
`;

const MyChildImg = styled.img`
  width: 280px;
  height: 250px;
`;

const MyCildTextBox = styled.div`
  margin-left: 20px;
  margin-top: 20px;
`;

const MyChildTexth3 = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #333333;
`;

const MyChildTextp = styled.p`
  color: #7f7f7f;
  margin-top: 5px;
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
  align-items: center;
`;

const LikeImg = styled.img`
  width: 20px;
  height: 20px;
`;

const GoButton = styled.button`
  background-color: white;
  border: 1px solid #6478ff;
  color: #6478ff;
  border-radius: 3px;
  width: 100px;
  height: 30px;
  margin-left: 140px;
  margin-top: 20px;
  &:hover {
    background-color: #6478ff;
    border: 1px solid #6478ff;
    color: white;
  }
`;
