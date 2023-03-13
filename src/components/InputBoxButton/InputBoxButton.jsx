import { Link } from 'react-router-dom';
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
  max-width: 643.76px;
  width: 100%;
  height: 34px;
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid white;
  position: absolute;
  z-index: 3;
  border-radius: 377.73px;
  margin-left: 20%;
  top: 44.25px;
  @media screen and (max-width: 820px) {
    width: 60%;
  }
  @media screen and (max-width: 390px) {
    display: none;
  }
`;

const SearchImg = styled.img`
  width: 24.51px;
  height: 24.51px;
  float: right;
  margin-right: 19.97px;
`;

const SearchText = styled.p`
  color: white;
  margin-left: 23.2px;
  font-weight: bold;
  font-size: 13.41px;
`;
