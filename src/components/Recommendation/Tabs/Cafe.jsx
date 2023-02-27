import React from 'react';
import styled from 'styled-components';
import commingsoon from '../../../assets/commingsoon.avif';

export default function Cafe() {
  return (
    <WrapDiv>
      <CafeText src={commingsoon} alt="" />
    </WrapDiv>
  );
}

const WrapDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CafeText = styled.img`
  width: 600px;
  height: 300px;
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
