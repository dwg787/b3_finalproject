import React from 'react';
import styled from 'styled-components';

export default function Cafe() {
  return (
    <WrapDiv>
      <CafeText>공사중</CafeText>
    </WrapDiv>
  );
}

const WrapDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CafeText = styled.p`
  width: 600px;
  height: 300px;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;
