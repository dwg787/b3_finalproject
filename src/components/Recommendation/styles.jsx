import styled from 'styled-components';

const Container = styled.div`
  width: 1232px;
  height: 414.02px;
  display: flex;
  flex-direction: column;
  margin-top: 24.83px;
  border: 1.5px solid white;
  border-radius: 13.42px;
  box-shadow: 5px 5px #c8c8c8;
  background-color: white;
`;

const MyChildTopText = styled.p`
  margin-left: 41.6px;
  color: #6478ff;
  font-size: 21.25px;
  font-weight: bold;
  margin-top: 27.51px;
`;

const MyChildListBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 31.67px;
`;

const MyChildList = styled.div`
  width: 269.75px;
  height: 291.22px;
  background-color: white;
  box-shadow: 5px 5px #d1d1d1;
  border: 1px solid #6478ff;
  border-radius: 9.06px;
  overflow: hidden;
  position: relative;
`;

const MyChildImg = styled.img`
  width: 269.75px;
  height: 172.79px;
`;

const MyCildTextBox = styled.div`
  margin-left: 22.14px;
  margin-top: 20px;
`;

const MyChildTexth3 = styled.h3`
  font-size: 19.7px;
  font-weight: 500;
  margin-bottom: 9.19px;
  color: #333333;
  line-height: 18.4px;
`;

const MyChildTextp = styled.p`
  color: #7f7f7f;
  /* margin-top: 5px; */
  line-height: 19.4px;
  font-size: 14.58px;
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  /* margin-top: 13.54px; */
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
