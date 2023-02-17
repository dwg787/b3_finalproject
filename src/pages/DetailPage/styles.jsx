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
  width: 1836px;
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
  height: 3178px;
  flex-direction: column;
  display: flex;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 1px gray;
  padding: 10px 30px 30px 30px;
  background: linear-gradient(white 40%, #9eabff);
`;

const DeatilTextBox = styled.div`
  width: 100%;
  /* gap: 0.3rem; */
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
  /* padding: 20px; */
  /* margin-bottom: 50px; */
  margin-top: 72px;
`;

const DetailTextArr = styled.div`
  text-align: center;
  /* font-weight: bold; */
  font-size: 15px;
  margin-top: 37px;
  color: #333333;
  font-weight: 400;
  height: 32px;
`;

const DetailImgBox = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  /* margin-bottom: 150px; */
  margin: 32px 0;
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
  height: 400px;
  /* background-color: #76acdc; */
  /* background-color: #ffffff; */
  border-radius: 20px;
  /* box-shadow: 5px 5px 10px 1px gray; */
  border: 1px solid rgb(158, 171, 255, 0.61);
  padding: 30px;

  margin: 20px 0;
`;

const DetailInformationMap = styled.div`
  width: 100%;
  /* justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center; */
  height: 400px;
  /* background-color: #76acdc; */
  /* background-color: #ffffff; */
  border-radius: 20px;
  /* box-shadow: 5px 5px 10px 1px gray; */
  /* border: 1px solid rgb(158, 171, 255, 0.61); */
  /* padding: 30px; */
  flex-wrap: wrap;
  margin: 20px 0;
`;

const DetailInfoTextBox = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: row; */
  /* border-bottom: solid #1f1f20 2px; */
  border-bottom: solid rgb(158, 171, 255, 0.61) 1px;
  margin: 10px 0;
`;

const DetailInfoText = styled.div`
  margin-left: 30px;
  /* height: 100px; */
  font-size: 25px;
  font-weight: 800;
  text-align: left;
  margin-bottom: 10px;
`;

const DetailInfo = styled.div`
  width: 100%;
  margin: 10px 0;
  height: 500px;
  flex-wrap: wrap;
  font-size: 17px;
  font-weight: 400;
`;

const CommunicationWrap = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #b5a0d2; */
  height: 700px;
  background-color: #ffffff;
  border-radius: 20px;
  /* box-shadow: 5px 5px 10px 1px #b099cf;
   */

  border: 1px solid rgb(158, 171, 255, 0.61);
  padding: 30px;

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
  DetailInformationMap,
};
