import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';

const SideDiv = styled.div`
  width: 100%;
  /* position: fixed; */
  /* right: 5rem; */
  /* margin-top: -35px; */
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  span {
    cursor: pointer;
  }
`;
const SideScroll = () => {
  return (
    <SideDiv>
      <div>
        <Link to="1" spy={true} smooth={true}>
          <StLinkTextBox>사진보기</StLinkTextBox>
        </Link>
        <Link to="2" spy={true} smooth={true}>
          <StLinkTextBox>상세정보</StLinkTextBox>
        </Link>
        <Link to="3" spy={true} smooth={true}>
          <StLinkTextBox>여행톡</StLinkTextBox>
        </Link>
        <Link to="4" spy={true} smooth={true}>
          <StLinkTextBox>추천여행</StLinkTextBox>
        </Link>
      </div>
    </SideDiv>
  );
};
export default SideScroll;

const StLinkTextBox = styled.span`
  margin: 20px;
  background-color: teal;
  font-size: 20px;
  font-weight: 400;
  padding: 20px;
`;
