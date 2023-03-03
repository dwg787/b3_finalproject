import styled from 'styled-components';

// 풀화면
const DetailWrap = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(124, 141, 255, 1) 69%,
    rgba(162, 174, 255, 1) 100%
  );
`;

// 풀화면 크기조정
const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1036px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//상세페이지 메인 박스1
const DeatilBox = styled.div`
  width: 100%;
  /* height: 70.8%; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  /* background-color: transparent; */
  border-bottom-left-radius: 11.28px;
  border-bottom-right-radius: 11.28px;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(162, 174, 255, 1) 69%,
    rgba(162, 174, 255, 1) 100%
  );
`;

//상세페이지 상단부분 박스(제목)
const DeatilTextBox = styled.div`
  width: 100%;
`;

const TabHr = styled.hr`
  border: solid #6478ff 1.13px;
  width: 933.21px;
`;

//상세페이지 상단 제목
const DetailText = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 33.72px;
  color: #6478ff;
  margin-top: 35.67px;
  line-height: 31.5px;
`;

//상세페이지 상단 제목 하단 도시
const DetailTextArr = styled.div`
  text-align: center;
  font-size: 18.96px;
  margin-top: 20.47px;
  color: #333333;
  font-weight: bold;
  line-height: 17.7px;
`;

//상세페이지 좋아요 이모지 & 좋아요 수 박스
const DeatilImojiBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  line-height: 19.1px;
  margin-bottom: 36.75px;
  margin-top: 18.67px;
`;

//상세페이지 사진 박스
const DetailImgBox = styled.div`
  width: 963.68px;
  height: 449.68px;
  justify-content: center;
  display: flex;
  margin-bottom: 14.67px;
`;
const DetailImg = styled.img`
  width: 100%;
  border-radius: 11.28px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  position: relative;
`;

//숙박페이지에만 들어가는 버튼 (크기조정보류-임시크기 위치)
const DetailImgBtn = styled.button`
  position: absolute;
  font-weight: 500;
  text-align: center;
  background-color: #6478ff;
  color: #fafafa;
  width: 360.01px;
  height: 42.72px;
  border-radius: 16.78px;
  margin-top: 372.81px;
  line-height: 23.5px;
  flex-wrap: wrap;
  font-size: 25.1px;
`;

// 상세정보박스
const DetailInformation = styled.div`
  width: 963.68px;
  top: 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 11.28px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  box-sizing: border-box;
  margin-bottom: 14.67px;
`;

//상세박스 소개 텍스트
const DetailInfo = styled.span`
  display: block;
  width: 907.25px;
  line-height: 20.9px;
  flex-wrap: wrap;
  font-size: 12.98px;
  font-weight: medium;
  margin: 22.57px 28.77px 8.46px 27.65px;
`;
//상세박스 정보 텍스트
const DetailInfo2 = styled.div`
  width: 907.25px;
  margin: 0px 28.77px 23.57px 27.65px;
  flex-wrap: wrap;
  line-height: 20.9px;
  font-size: 12.98px;
  font-weight: medium;
`;

const DetailInfoAdd = styled.div`
  width: 907.25px;
  flex-wrap: wrap;
  font-size: 12.98px;
  line-height: 20.9px;
  font-weight: medium;
  padding: 0px 0px 1.84px 0px;
`;

const DetailTextBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 907.25px;
`;

//지도박스
const DetailInformationMap = styled.div`
  width: 963.68px;
  height: 398.33px;
  border-radius: 11.28px;
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
  border-radius: 11.28px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  margin: 15.93px 0 1.12px 0;
  @media screen and (max-width: 390px) {
    width: 340px;
    height: 444px;
    box-shadow: 0.795985px 0.795985px 1.98996px rgba(0, 0, 0, 0.18);
    border-radius: 3.97992px;
  }
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
