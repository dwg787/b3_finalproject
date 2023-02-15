import React from 'react';
import styled from 'styled-components';
export default function WeeklyTop10() {
  return (
    <Container>
      <WeeklyTopText>위클리 인기 TOP10</WeeklyTopText>
      <WeeklyButtonBox>
        <WeeklyButton>관광</WeeklyButton>
        <WeeklyButton>숙박</WeeklyButton>
        <WeeklyButton>맛집</WeeklyButton>
        <WeeklyButton>카페</WeeklyButton>
      </WeeklyButtonBox>
      <WeeklyListWrapbox>
        <WeeklyListBox1>
          <WeeklyList></WeeklyList>
          <WeeklyList></WeeklyList>
          <WeeklyList></WeeklyList>
        </WeeklyListBox1>
        <WeeklyListBox2>
          <WeeklyList></WeeklyList>
          <WeeklyList></WeeklyList>
          <WeeklyList></WeeklyList>
        </WeeklyListBox2>
      </WeeklyListWrapbox>
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
  background-color: white;
  cursor: pointer;
  margin-left: 30px;
  color: #6478ff;
  border-radius: 20px;
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
