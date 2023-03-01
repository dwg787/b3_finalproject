import React from 'react';
import styled, { keyframes } from 'styled-components';
import sidebanner from '../../assets/sidebanner.png';

export default function EventBenner() {
  return (
    <a href="https://forms.gle/qaRbyEX8yGFHFCZ49">
      <WrapDiv>
        <img src={sidebanner} />
        <EventBannerText>지금바로가기!</EventBannerText>
      </WrapDiv>
    </a>
  );
}

const WrapDiv = styled.div`
  width: 153px;
  height: 402px;
  position: fixed;
  top: 18%;
  left: 84%;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid #6e81f9;
`;

const Flicker = keyframes`
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `;

const EventBannerText = styled.div`
  font-size: 20px;
  color: Red;
  position: absolute;
  text-align: justify;
  animation: ${Flicker} 2s ease-in-out infinite;
  margin-bottom: 260px;
`;
