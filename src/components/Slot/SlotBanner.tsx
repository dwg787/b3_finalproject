import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import slotbanner from '../../assets/slotbanner.avif';

export default function SlotBanner() {
  return (
    <Link to="/slot">
      <WrapDiv>
        <img src={slotbanner} alt="" />
        <SlotBannerText>지금바로가기!</SlotBannerText>
      </WrapDiv>
    </Link>
  );
}

const WrapDiv = styled.div`
  width: 100px;
  height: 400px;
  position: fixed;
  top: 18%;
  left: 5%;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

const SlotBannerText = styled.p`
  color: white;
  position: absolute;
  margin-top: 300px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid white;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${Flicker} 2s ease-in-out infinite;
`;
