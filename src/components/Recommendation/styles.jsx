import styled from 'styled-components';

const Container = styled.div`
  width: 1836px;
  height: 617px;
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  border: 1.5px solid white;
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
  width: 402px;
  height: 434px;
  background-color: white;
  box-shadow: 5px 5px #d1d1d1;
  border: 1px solid #6478ff;
  border-radius: 13px;
  overflow: hidden;
  position: relative;
`;

const MyChildImg = styled.img`
  width: 402px;
  height: 257.5px;
`;

const MyCildTextBox = styled.div`
  margin-left: 20px;
  margin-top: 20px;
`;

const MyChildTexth3 = styled.h3`
  font-size: 29.35px;
  font-weight: 500;
  margin-bottom: 14px;
  color: #333333;
  line-height: 28px;
`;

const MyChildTextp = styled.p`
  color: #7f7f7f;
  /* margin-top: 5px; */
  line-height: 28.9px;
  font-size: 21.73px;
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
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
