import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-scroll';

const DetailScroll = () => {
  return (
    <MainDiv>
      <SideDiv>
        <StLinkBox>
          <Link to="1" spy={true} smooth={true}>
            <StLinkTextBox>사진</StLinkTextBox>
          </Link>
        </StLinkBox>
        <StLinkBox>
          <Link to="2" spy={true} smooth={true}>
            <StLinkTextBox>상세정보</StLinkTextBox>
          </Link>
        </StLinkBox>
        <StLinkBox>
          <Link to="3" spy={true} smooth={true}>
            <StLinkTextBox>여행톡</StLinkTextBox>
          </Link>
        </StLinkBox>
        <StLinkBox>
          <Link to="4" spy={true} smooth={true}>
            <StLinkTextBox>추천여행</StLinkTextBox>
          </Link>
        </StLinkBox>
      </SideDiv>
    </MainDiv>
  );
};

export default DetailScroll;

const MainDiv = styled.div`
  margin: 2rem 5rem;
`;

const ContentDiv = styled.div`
  width: 100%;

  /* margin: 2rem 5rem; */
`;

const SideDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StLinkTextBox = styled.span`
  margin: 20px 40px;
  background-color: teal;
  font-size: 20px;
  font-weight: 400;
  padding: 20px;
  cursor: pointer;
  /* position: absolute; */
`;

const StLinkBox = styled.div`
  display: flex;
  /* flex-direction: row; */
  box-sizing: border-box;
  width: 100%;
`;
