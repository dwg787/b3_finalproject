import React from 'react';
import styled from 'styled-components';
import searchimg from '../../assets/search.avif';

export default function InputBoxButton() {
  return (
    <WrapDiv>
      <SearchText>추천 데이트 핫플레이스</SearchText>
      <SearchImg src={searchimg}></SearchImg>
    </WrapDiv>
  );
}

const WrapDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.4);
  position: absolute;
  z-index: 3;
  margin-bottom: 330px;
  border-radius: 25px;
`;

const SearchImg = styled.img`
  width: 50px;
  float: right;
  margin-right: 30px;
`;

const SearchText = styled.p`
  color: white;
  margin-left: 30px;
  font-weight: bold;
  font-size: 20px;
`;
