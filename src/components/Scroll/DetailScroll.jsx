import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-scroll';

const DetailScroll = () => {
  return (
    <MainDiv>
      <StLinkBox>
        <Link to="1" spy={true} smooth={true}>
          <StLinkTextBox>이미지</StLinkTextBox>
        </Link>
      </StLinkBox>
      <StLinkBox>
        <Link to="2" spy={true} smooth={true}>
          <StLinkTextBox>상세정보</StLinkTextBox>
        </Link>
      </StLinkBox>
      <StLinkBox>
        <Link to="3" spy={true} smooth={true}>
          <StLinkTextBox>지도</StLinkTextBox>
        </Link>
      </StLinkBox>
      <StLinkBox>
        <Link to="4" spy={true} smooth={true}>
          <StLinkTextBox>여행톡</StLinkTextBox>
        </Link>
      </StLinkBox>
      <StLinkBox>
        <Link to="5" spy={true} smooth={true}>
          <StLinkTextBox>추천</StLinkTextBox>
        </Link>
      </StLinkBox>
    </MainDiv>
  );
};

export default DetailScroll;

const MainDiv = styled.div`
  width: 100%;
  height: 69.12px;
  padding: 24.83px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
`;

const SideDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StLinkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const StLinkTextBox = styled.span`
  font-size: 0.9854vw;
  font-weight: 400;
  cursor: pointer;
  line-height: 17.7px;
  font-weight: 700;
`;
