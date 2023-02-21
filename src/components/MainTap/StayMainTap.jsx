import React from 'react';
import styled from 'styled-components';
import one from '../../assets/one.png';
import two from '../../assets/two.png';
import three from '../../assets/three.png';
import noimg from '../../assets/noimg.avif';

const StayMainTap = () => {
  return (
    <ContainerDiv>
      <ColorDiov>
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
              <InnerNmb>4</InnerNmb>
              <OuterTextBox></OuterTextBox>
            </OuterList>
            <OuterList>
              <InnerNmb>5</InnerNmb>
              <OuterTextBox></OuterTextBox>
            </OuterList>
            <OuterList>
              <InnerNmb>6</InnerNmb>
              <OuterTextBox></OuterTextBox>
            </OuterList>
            <OuterList>
              <InnerNmb>7</InnerNmb>
              <OuterTextBox></OuterTextBox>
            </OuterList>
            {/* {rankList.slice(3, 7).map((e, i) => {
          return (
            <OuterList>
              <InnerNmb>{i + 4}</InnerNmb>
              <img src={e.firstimage} alt="" />
              <OuterTextBox>
                <div>{e.title}</div>
                <p>{e.overview.slice(0, 20)}</p>
              </OuterTextBox>
            </OuterList>
          );
        })} */}
          </OuterDiv>
        </WrapDiv>
      </ColorDiov>
    </ContainerDiv>
  );
};

export default StayMainTap;

const ColorDiov = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    #7f8efc 40%,
    rgba(255, 255, 255, 0.2) 100%
  );
  display: flex;
  justify-content: center;
  padding-bottom: 300px;
  position: absolute;
`;

const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  z-index: 0;
  margin-top: 2600px;
`;

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
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  position: absolute;
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
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
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
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const OuterTextBox = styled.div`
  width: 100%;
  height: 110px;
  background-color: white;
  margin-top: 170px;
`;

const InnerNmb = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 10px;
  color: white;
`;
