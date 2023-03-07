import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1035.89px;
  height: 348.12px;
  display: flex;
  flex-direction: column;
  margin-top: 14.88px;
  border-radius: 11.28px;
  background-color: #ffffff;
  @media screen and (max-width: 820px) {
    width: 100%;
    max-width: 390px;
    height: 434px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    border-radius: 8.8px;
    background-color: #ffffff;
  }
`;

const MyChildTopText = styled.p`
  margin-left: 41.95px;
  color: #6478ff;
  font-size: 16.5px;
  font-weight: bold;
  margin-top: 24px;

  @media screen and (max-width: 820px) {
    margin-left: 24px;
    color: #6478ff;
    font-size: 14px;
    font-weight: bold;
    margin-top: 16px;
  }
`;

const MyChildListBox = styled.div`
  max-width: 962.83px;
  width: 100%;
  display: flex;
  gap: 18.62px;
  justify-content: center;
  align-items: center;
  margin: 26.58px 36.67px 36.67px 36.39px;
  @media screen and (max-width: 820px) {
    max-width: 340px;
    display: grid;
    justify-content: center;
    align-items: center;
    margin: 18px 25px 25px 25px;
    grid-template-columns: 164px 164px;
    grid-template-rows: 177px 177px;
    box-sizing: border-box;
    column-gap: 12px;
    row-gap: 12px;
  }
`;

const MyChildList = styled.div`
  width: 226.81px;
  height: 244.87px;
  background-color: #ffffff;
  box-shadow: 1px 1px #d1d1d1;
  border-radius: 7.62px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  @media screen and (max-width: 820px) {
    width: 164px;
    height: 177px;
    background-color: #ffffff;
    box-shadow: 1px 1px #d1d1d1;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
`;

const MyChildImg = styled.img`
  width: 226.81px;
  height: 138.22px;
  @media screen and (max-width: 820px) {
    width: 164px;
    height: 100px;
  }
`;

const MyCildTextBox = styled.div`
  margin-top: 17.51px;
  @media screen and (max-width: 820px) {
    margin-top: 13px;
  }
`;

const MyChildTexth3 = styled.h3`
  font-size: 16.56px;
  font-weight: medium;
  margin-bottom: 9.19px;
  color: #4d4d4d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 24.89px;
  margin-left: 20.72px;
  @media screen and (max-width: 820px) {
    font-size: 13px;
    font-weight: medium;
    margin-bottom: 6px;
    color: #4d4d4d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 12px;
    margin-left: 12px;
  }
`;

const MyChildTextp = styled.p`
  color: #878787;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 20.93px;
  margin-left: 20.88px;
  @media screen and (max-width: 820px) {
    color: #878787;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 12px;
    margin-left: 12px;
  }
`;

export {
  Container,
  MyChildTopText,
  MyChildListBox,
  MyChildList,
  MyChildImg,
  MyCildTextBox,
  MyChildTexth3,
  MyChildTextp,
};
