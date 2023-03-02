import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1035.89px;
  height: 348.12px;
  display: flex;
  flex-direction: column;
  margin-top: 14.88px;
  /* border: 1.5px solid white; */
  border-radius: 11.28px;
  background-color: #ffffff;
`;

const MyChildTopText = styled.p`
  margin-left: 41.95px;
  color: #6478ff;
  font-size: 16.5px;
  font-weight: bold;
  margin-top: 24px;
  line-height: 15.4px;
`;

const MyChildListBox = styled.div`
  max-width: 962.83px;
  width: 100%;
  display: flex;
  gap: 18.62px;
  justify-content: center;
  align-items: center;
  margin: 26.58px 36.67px 36.67px 36.39px;
  /* margin: 26.58px 0 36.67px 0; */
`;

const MyChildList = styled.div`
  width: 226.81px;
  height: 244.87px;
  background-color: #ffffff;
  box-shadow: 1px 1px #d1d1d1;
  /* border: 1px solid #6478ff; */
  border-radius: 7.62px;
  overflow: hidden;
  position: relative;
`;

const MyChildImg = styled.img`
  width: 226.81px;
  height: 138.22px;
`;

const MyCildTextBox = styled.div`
  margin-top: 17.51px;
`;

const MyChildTexth3 = styled.h3`
  font-size: 16.56px;
  font-weight: medium;
  margin-bottom: 9.19px;
  color: #4d4d4d;
  line-height: 15.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 24.89px;
  margin-left: 20.72px;
`;

const MyChildTextp = styled.p`
  color: #878787;
  line-height: 16.3px;
  font-size: 12.26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 20.93px;
  margin-left: 20.88px;
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const GoButton = styled.button`
  background-color: white;
  border: 1px solid #6478ff;
  color: #6478ff;
  border-radius: 3px;
  width: 100px;
  height: 30px;
  margin-left: 160px;
  margin-top: 20px;
  &:hover {
    background-color: #6478ff;
    border: 1px solid #6478ff;
    color: white;
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
  LikeBox,
  GoButton,
};
