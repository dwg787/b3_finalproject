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
  margin: 1rem 5rem;
  border-bottom: solid #d6dcff 1px;
  border-top: solid #d6dcff 1px;
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
  margin: 1rem 0;
`;

const StLinkTextBox = styled.span`
  margin: 20px 60px;
  /* background-color: teal; */
  font-size: 15px;
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
