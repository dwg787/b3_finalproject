import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import searchimg from '../../assets/search.avif';

export default function InputBoxButton() {
  return (
    <Link to="/search">
      <WrapDiv>
        <SearchText>추천 데이트 핫플레이스</SearchText>
        <SearchImg src={searchimg}></SearchImg>
      </WrapDiv>
    </Link>
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
  border-radius: 25px;
  margin-left: 250px;
  top: 20px;
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
