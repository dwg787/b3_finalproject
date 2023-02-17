import styled from 'styled-components';

//풀 화면
const DetailWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #cda8a8; */
  background: linear-gradient(white 40%, #6478ff);
`;

// 풀화면 크기조정
const Container = styled.div`
  width: 1920px;
  /* width: 80%; */
  height: 4307px;
  display: flex;
  flex-direction: column;
  /* gap: 0.3rem; */
  align-items: center;
  justify-content: center;
  /* margin-top: 80px; */
  /* background-color: #8eb9dc; */
`;

//상세페이지 메인 박스1
const DeatilBox = styled.div`
  width: 1836px;

  /* width: 70%; */
  height: 3178px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 1px gray;
  /* padding: 10px 30px 30px 30px; */
  background: linear-gradient(white 40%, #9eabff);
`;

//상세페이지 상단부분 박스(제목)
const DeatilTextBox = styled.div`
  width: 100%;
  /* gap: 0.3rem; */
`;

const TabHr = styled.hr`
  border: solid #6478ff 2px;
  width: 1654px;
`;

//상세페이지 상단 제목
const DetailText = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 59.77px;
  color: #6478ff;
  margin-top: 72px;
  line-height: 56px;
`;

//상세페이지 상단 제목 하단 도시
const DetailTextArr = styled.div`
  text-align: center;
  /* font-weight: bold; */
  font-size: 33.61px;
  margin-top: 37px;
  color: #333333;
  font-weight: 400;
  /* height: 32px; */
  line-height: 32px;
`;

//상세페이지 좋아요 이모지
const DeatilImojiBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  line-height: 36px;
  margin-bottom: 55px;
  margin-top: 32px;
`;

//상세페이지 사진 박스
const DetailImgBox = styled.div`
  width: 1708px;
  /* width: 70%; */
  height: 799px;
  justify-content: center;
  display: flex;
  margin-bottom: 26px;
  /* margin: 32px 0; */
  /* height: 800px; */
  /* background-color: #6fcfab; */
`;
const DetailImg = styled.img`
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgb(158, 171, 255, 0.61);
`;

// 상세정보박스
const DetailInformation = styled.div`
  width: 1708px;
  /* width: 70%; */
  /* height: 248px; */
  top: 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  box-sizing: border-box;
  margin-bottom: 26px;

  line-height: 37px;

  /* background-color: #76acdc; */
`;
//상세박스 소개 텍스트
const DetailInfo = styled.span`
  display: block;
  width: 1608px;

  flex-wrap: wrap;
  font-size: 23px;
  font-weight: normal;
  padding: 40px 0px 15px 0px;
  line-height: 37px;
`;
//상세박스 정보 텍스트
const DetailInfoAdd = styled.div`
  width: 1608px;
  flex-wrap: wrap;
  font-size: 23px;
  font-weight: normal;
  /* background-color: #ccb46b; */

  padding: 0px 0px 42px 0px;
`;

//지도박스
const DetailInformationMap = styled.div`
  width: 1708px;
  /* width: 70%; */
  height: 706px;
  border-radius: 20px;
  flex-wrap: wrap;
  margin-bottom: 26px;
  /* background-color: #76acdc; */
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

const CommunicationWrap = styled.div`
  width: 1708px;
  /* width: 70%; */
  height: 859px;
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
  /* padding: 30px; */

  margin: 20px 0;
`;

const SideInfoWrapper = styled.div`
  margin-top: 37px;
  display: flex;
  flex-direction: column;
  /* width: 1836px; */
`;

const RecommendSide = styled(SideInfoWrapper)`
  background-color: #f4f1f6;
  border-radius: 20px;
  height: 1271px;
`;

export {
  DetailWrap,
  Container,
  DeatilBox,
  DeatilImojiBox,
  CommunicationWrap,
  DetailInfo,
  DetailInfoText,
  DetailInfoAdd,
  DetailInfoTextBox,
  DetailInformation,
  SideInfoWrapper,
  DetailImg,
  DetailImgBox,
  DetailTextArr,
  DetailText,
  DeatilTextBox,
  DetailInformationMap,
  TabHr,
  RecommendSide,
};
