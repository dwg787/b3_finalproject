import React, { useState } from 'react';
import styled from 'styled-components';
import { WEEKLY_TYPE } from '../../apis/apiCodes';

export default function WeeklyTop10() {
  return (
    <Container>
      <WeeklyTopText>위클리 인기 TOP10</WeeklyTopText>
      <WeeklyButtonBox>
        {WEEKLY_TYPE.map((e) => {
          return <WeeklyButton key={e.id}>{e.type}</WeeklyButton>;
        })}
      </WeeklyButtonBox>
    </Container>
  );
}
const Container = styled.div`
  width: 90%;
  height: 850px;
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  border: 1.5px solid #6478ff;
  border-radius: 50px;
  box-shadow: 5px 5px #c8c8c8;
  background-color: white;
`;
const WeeklyTopText = styled.p`
  margin-left: 70px;
  color: #6478ff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
`;
const WeeklyButtonBox = styled.div`
  margin-top: 20px;
  margin-left: 40px;
`;

const WeeklyButton = styled.button`
  width: 70px;
  height: 35px;
  border: 1px solid #6478ff;
  cursor: pointer;
  margin-left: 30px;
  border-radius: 20px;
  background-color: white;
`;

const WeeklyListWrapbox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const WeeklyListBox1 = styled.div``;
const WeeklyListBox2 = styled.div``;
const WeeklyList = styled.div`
  width: 600px;
  height: 200px;
  background-color: gray;
  margin-top: 20px;
`;
