import React from 'react';
import styled from 'styled-components';
import InnerPhoto from '../../../assets/slider3.jpeg';
import TapHeart from '../../../assets/TapHeart.png';

export default function Rest() {
  return (
    <WarpDiv>
      <InnerBox1>
        <InnerList>
          <InnerImg src={InnerPhoto} />
          <InnerNmb>1</InnerNmb>

          <InnerText>
            <p>타이틀</p>
            <p>장소설명 간략</p>
            <LikeBox>
              <LikeImg src={TapHeart} alt="" />
              <p>좋아요</p>
            </LikeBox>
          </InnerText>
        </InnerList>
        <InnerList>
          <InnerImg src={InnerPhoto} />
          <InnerNmb>2</InnerNmb>

          <InnerText>
            <p>타이틀</p>
            <p>장소설명 간략</p>
            <p>좋아요</p>
          </InnerText>
        </InnerList>
        <InnerList>
          <InnerImg src={InnerPhoto} />
          <InnerNmb>3</InnerNmb>

          <InnerText>
            <p>타이틀</p>
            <p>장소설명 간략</p>
            <p>좋아요</p>
          </InnerText>
        </InnerList>
      </InnerBox1>
      <InnerBox2>
        <InnerList>
          <InnerImg src={InnerPhoto} />
          <InnerNmb>4</InnerNmb>

          <InnerText>
            <p>타이틀</p>
            <p>장소설명 간략</p>
            <p>좋아요</p>
          </InnerText>
        </InnerList>
        <InnerList>
          <InnerImg src={InnerPhoto} />
          <InnerNmb>5</InnerNmb>

          <InnerText>
            <p>타이틀</p>
            <p>장소설명 간략</p>
            <p>좋아요</p>
          </InnerText>
        </InnerList>
        <InnerList>
          <InnerImg src={InnerPhoto} />
          <InnerNmb>6</InnerNmb>

          <InnerText>
            <p>타이틀</p>
            <p>장소설명 간략</p>
            <p>좋아요</p>
          </InnerText>
        </InnerList>
      </InnerBox2>
    </WarpDiv>
  );
}

const WarpDiv = styled.div`
  width: 91%;
  height: 600px;
  margin-left: 4.5%;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`;

const InnerNmb = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 480px;
  margin-bottom: 100px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
`;

const InnerBox1 = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`;

const InnerBox2 = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
`;

const InnerList = styled.div`
  width: 560px;
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid #6478ff;
  box-shadow: 5px 5px #d1d1d1;
  border-radius: 16px;
`;

const InnerImg = styled.img`
  width: 200px;
  height: 140px;
  margin-right: 320px;
`;

const InnerText = styled.div`
  position: absolute;
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const LikeImg = styled.img`
  width: 20px;
  height: 20px;
`;
