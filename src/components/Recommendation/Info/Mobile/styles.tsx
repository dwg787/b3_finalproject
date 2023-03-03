import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 390px;
  height: 434px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  /* border: 1.5px solid white; */
  border-radius: 8.8px;
  background-color: #ffffff;
`;

const MyChildTopText = styled.p`
  margin-left: 24px;
  color: #6478ff;
  font-size: 14px;
  font-weight: bold;
  margin-top: 16px;
  line-height: 8.1px;
`;

const MyChildListBox = styled.div`
  max-width: 340px;
  /* width: 366px; */
  display: flex;
  /* gap: 12px; */
  justify-content: center;
  align-items: center;
  margin: 18px 25px 25px 25px;
  grid-template-columns: 164px, 164px;
  grid-template-rows: 177px, 177px;
  box-sizing: border-box;
  column-gap: 12px;
  row-gap: 12px;
`;

const MyChildList = styled.div`
  width: 164px;
  height: 177px;
  background-color: #ffffff;
  box-shadow: 1px 1px #d1d1d1;
  /* border: 1px solid #6478ff; */
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;

const MyChildImg = styled.img`
  width: 164px;
  height: 100px;
`;

const MyCildTextBox = styled.div`
  margin-top: 13px;
`;

const MyChildTexth3 = styled.h3`
  font-size: 13px;
  font-weight: medium;
  margin-bottom: 6px;
  color: #4d4d4d;
  line-height: 11.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 12px;
  margin-left: 12px;
`;

const MyChildTextp = styled.p`
  color: #878787;
  line-height: 11.9x;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 12px;
  margin-left: 12px;
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
