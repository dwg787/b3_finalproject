import styled from 'styled-components';

const DetailWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #cda8a8; */
  background: linear-gradient(white 40%, #6478ff);
`;

const Container = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  /* background-color: #8eb9dc; */
`;

const DeatilBox = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 1px gray;
  padding: 30px;
`;

const DeatilTextBox = styled.div`
  width: 100%;
  gap: 0.3rem;
`;

const DeatilImojiBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
`;

const DetailText = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 40px;
  color: #6478ff;
  /* margin-bottom: 50px; */
`;

const DetailTextArr = styled.div`
  text-align: center;
  /* font-weight: bold; */
  font-size: 15px;
  margin-top: 15px;
  color: #333333;
  font-weight: 400;
`;

const DetailImgBox = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  /* margin-bottom: 150px; */
  margin: 20px 0;
  /* height: 800px; */
  /* background-color: #6fcfab; */
`;
const DetailImg = styled.img`
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgb(158, 171, 255, 0.61);
`;

const SideInfoWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
  /* background-color: teal; */
`;

const DetailInformation = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
  /* background-color: #76acdc; */
  /* background-color: #ffffff; */
  border-radius: 20px;
  /* box-shadow: 5px 5px 10px 1px gray; */
  border: 1px solid rgb(158, 171, 255, 0.61);
  padding: 30px;

  margin: 20px 0;
`;

const DetailInfoTextBox = styled.div``;

const DetailInfoText = styled.div`
  font-weight: 700;
  font-size: 29.271px;
  color: #6478ff;
  margin: 40px 0 40px 0;
`;

const DetailInfo = styled.div`
  width: 90%;
  margin: 10px 0;
  height: 500px;
  flex-wrap: wrap;
  font-size: 17px;
  font-weight: 400;
`;

const CommunicationWrap = styled.div`
  box-sizing: border-box;
  /* width: 100%; */
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #b5a0d2; */
  /* height: 700px; */
  background-color: #ffffff;
  border-radius: 20px;
  /* box-shadow: 5px 5px 10px 1px #b099cf;
   */

  border: 1.5px solid #9eabff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0, 10);
  /* padding: 30px; */

  margin: 20px 0;
`;

export {
  DetailWrap,
  Container,
  DeatilBox,
  DeatilImojiBox,
  CommunicationWrap,
  DetailInfo,
  DetailInfoText,
  DetailInfoTextBox,
  DetailInformation,
  SideInfoWrapper,
  DetailImg,
  DetailImgBox,
  DetailTextArr,
  DetailText,
  DeatilTextBox,
};
