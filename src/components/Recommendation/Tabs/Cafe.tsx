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
  max-width: 1036px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CafeText = styled.img`
  width: 350px;
  height: 200px;
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
