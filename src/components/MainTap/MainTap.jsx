import React from 'react';
import styled from 'styled-components';
import one from '../../assets/one.png';
import two from '../../assets/two.png';
import three from '../../assets/three.png';

export default function MainTap() {
  return (
    <WrapDiv>
      <InnerDiv>
        <InnerList>
          <InnerMedals src={one} alt="" />
          <InnerTextBox></InnerTextBox>
        </InnerList>
        <InnerList>
          <InnerMedals src={two} alt="" />
          <InnerTextBox></InnerTextBox>
        </InnerList>
        <InnerList>
          <InnerMedals src={three} alt="" />
          <InnerTextBox></InnerTextBox>
        </InnerList>
      </InnerDiv>
      <OuterDiv>
        <OuterList>
          <OuterTextBox></OuterTextBox>
        </OuterList>
        <OuterList>
          <OuterTextBox></OuterTextBox>
        </OuterList>
        <OuterList>
          <OuterTextBox></OuterTextBox>
        </OuterList>
        <OuterList>
          <OuterTextBox></OuterTextBox>
        </OuterList>
      </OuterDiv>
    </WrapDiv>
  );
}

const WrapDiv = styled.div`
  margin-top: 50px;
  width: 65%;
  height: 880px;
  background-color: transparent;
  border: 1px solid #6478ff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerDiv = styled.div`
  width: 90%;
  height: 350px;
  margin-top: 80px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const InnerList = styled.div`
  width: 22%;
  height: 300px;
  background-color: gray;
  border-radius: 20px;
  overflow: hidden;
`;

const InnerMedals = styled.img`
  width: 60px;
  margin-left: 8px;
`;

const InnerTextBox = styled.div`
  width: 100%;
  height: 120px;
  background-color: white;
  margin-top: 120px;
`;

const OuterDiv = styled.div`
  width: 90%;
  height: 320px;
  background-color: transparent;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const OuterList = styled.div`
  width: 20%;
  height: 280px;
  background-color: gray;
  border-radius: 20px;
  overflow: hidden;
`;

const OuterTextBox = styled.div`
  width: 100%;
  height: 110px;
  background-color: white;
  margin-top: 170px;
`;
