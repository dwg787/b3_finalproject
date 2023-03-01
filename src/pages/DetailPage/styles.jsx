import styled from 'styled-components';

// 풀화면
const DetailWrap = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1920px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(124, 141, 255, 1) 69%,
    rgba(255, 255, 255, 1) 120%
  );
`;

// 풀화면 크기조정
const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1232px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

//상세페이지 메인 박스1
const DeatilBox = styled.div`
  width: 100%;
  height: 70.8%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #ffffff;
  border-radius: 13.42px;
  box-shadow: 5px 5px 10px 1px gray;
  background: linear-gradient(white 40%, #9eabff);
`;

//상세페이지 상단부분 박스(제목)
const DeatilTextBox = styled.div`
  width: 100%;
`;

const TabHr = styled.hr`
  border: solid #6478ff 1.34;
  width: 90.08%;
`;

//상세페이지 상단 제목
const DetailText = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 2.0885vw;
  color: #6478ff;
  margin-top: 2.76%;
  line-height: 37.5px;
`;

//상세페이지 상단 제목 하단 도시
const DetailTextArr = styled.div`
  text-align: center;
  font-size: 1.1745vw;
  margin-top: 1.6%;
  color: #333333;
  font-weight: 400;
  line-height: 21.1px;
`;

//상세페이지 좋아요 이모지
const DeatilImojiBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  line-height: 19.1px;
  margin-bottom: 2.01%;
  margin-top: 1.08%;
`;

//상세페이지 사진 박스
const DetailImgBox = styled.div`
  width: 92.98%;
  height: 534.81px;
  justify-content: center;
  display: flex;
  margin-bottom: 1.06%;
`;
const DetailImg = styled.img`
  width: 100%;

  border-radius: 13.42px;
  border: 1px solid rgb(158, 171, 255, 0.61);

  position: relative;
`;

const DetailImgBtn = styled.button`
  position: absolute;
  font-weight: 500;
  text-align: center;
  background-color: #6478ff;
  color: #fafafa;
  width: 412.01px;
  height: 59.72px;
  border-radius: 16.78px;
  margin-top: 432.81px;
  line-height: 23.5px;
  flex-wrap: wrap;
  font-size: 25.1px;
`;

// 상세정보박스
const DetailInformation = styled.div`
  width: 92.98%;
  top: 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 13.42px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  box-sizing: border-box;
  margin-bottom: 1.06%;
  line-height: 24.8px;
`;

//상세박스 소개 텍스트
const DetailInfo = styled.span`
  display: block;
  width: 87.52%;
  line-height: 24.8px;
  flex-wrap: wrap;
  font-size: 15.42px;
  font-weight: normal;
  padding: 26.82px 0px 10.06px 0px;
`;
//상세박스 정보 텍스트
const DetailInfo2 = styled.div`
  width: 87.52%;
  padding: 0px 0px 27.98px 0px;
  flex-wrap: wrap;
  font-size: 0.8031vw;
  font-weight: normal;
`;

const DetailInfoAdd = styled.div`
  width: 87.52%;
  flex-wrap: wrap;
  font-size: 0.8031vw;
  font-weight: normal;
  padding: 0px 0px 1.84px 0px;
`;

const DetailTextBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 1078.34px;
`;

//지도박스
const DetailInformationMap = styled.div`
  width: 92.98%;
  height: 15.02%;
  border-radius: 13.42px;
  flex-wrap: wrap;
`;

//댓글
const CommunicationWrap = styled.div`
  width: 964px;
  height: 504px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 13.42px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  margin: 1.06% 0 2.3% 0;
`;

//하단 추천 탭å
const SideInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export {
  DetailWrap,
  Container,
  DeatilBox,
  DeatilImojiBox,
  CommunicationWrap,
  DetailInfo,
  DetailInfoAdd,
  DetailTextBox,
  DetailInformation,
  SideInfoWrapper,
  DetailInfo2,
  DetailImg,
  DetailImgBox,
  DetailImgBtn,
  DetailTextArr,
  DetailText,
  DeatilTextBox,
  DetailInformationMap,
  TabHr,
};
