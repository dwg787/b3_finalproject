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
    // <MainDiv>
    //   <SideDiv>

    //   </SideDiv>
    // </MainDiv>
  );
};

export default DetailScroll;

const MainDiv = styled.div`
  width: 100%;
  height: 103px;
  padding: 38px 0;
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
  /* background-color: teal; */
  font-size: 28.19px;
  font-weight: 400;
  cursor: pointer;
  line-height: 27px;
  font-weight: 700;
  /* margin: 0; */
`;

// const TabOne = styled(StLinkTextBox)`
//   margin-right: 226px;
// `;

// const TabTwo = styled(StLinkTextBox)`
//   margin-right: 226px;
// `;

// const TabThreeFour = styled(StLinkTextBox)`
//   margin-right: 252px;
// `;

// const TabFive = styled(StLinkTextBox)`
//   margin-right: 258px;
// `;
