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
  width: 933.21px;
  height: 58.11px;
  padding: 20.88px 0 22.24px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  @media screen and (max-width: 820px) {
    width: 390px;
    height: 40px;
    padding: 12px 0 17px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
`;

const StLinkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const StLinkTextBox = styled.span`
  font-size: 15.91px;
  cursor: pointer;
  line-height: 14.9px;
  font-weight: Bold;
  @media screen and (max-width: 820px) {
    font-size: 12px;
    cursor: pointer;
    line-height: 10.6px;
    font-weight: Bold;
  }
`;
