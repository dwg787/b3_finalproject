import React from 'react';
import styled from 'styled-components';
export default function MyChild() {
  return (
    <Container>
      <MyChildTopText>베스트 데이트 코스</MyChildTopText>
      <MyChildListBox>
        <MyChildList></MyChildList>
        <MyChildList></MyChildList>
        <MyChildList></MyChildList>
        <MyChildList></MyChildList>
      </MyChildListBox>
    </Container>
  );
}
const Container = styled.div`
  width: 90%;
  height: 600px;
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  border: 1.5px solid #6478ff;
  border-radius: 50px;
  box-shadow: 5px 5px #c8c8c8;
  background-color: white;
`;
const MyChildTopText = styled.p`
  margin-left: 70px;
  color: #6478ff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
`;
const MyChildListBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
`;
const MyChildList = styled.div`
  width: 300px;
  height: 400px;
  background-color: gray;
`;
