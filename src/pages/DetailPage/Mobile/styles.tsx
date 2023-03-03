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
  max-width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//상세페이지 메인 박스1
const DeatilBox = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  /* 
  border-bottom-left-radius: 11.28px;
  border-bottom-right-radius: 11.28px;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(162, 174, 255, 1) 69%,
    rgba(162, 174, 255, 1) 100%
  ); */
`;

//상세페이지 상단부분 박스(제목)
const DeatilTextBox = styled.div`
  width: 100%;
`;

const TabHr = styled.hr`
  border: solid #6478ff 1px;
  width: 390px;
  margin: 0;
`;

//상세페이지 상단 제목
const DetailText = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 17px;
  color: #6478ff;
  margin-top: 25px;
  line-height: 11.1px;
`;

//상세페이지 상단 제목 하단 도시
const DetailTextArr = styled.div`
  text-align: center;
  font-size: 12px;
  margin-top: 14px;
  color: #333333;
  font-weight: bold;
  line-height: 6.2px;
`;

//상세페이지 좋아요 이모지 & 좋아요 수 박스
const DeatilImojiBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 10px;
  font-size: 11px;
  margin-bottom: 22.92px;
  margin-top: 13px;
`;

//상세페이지 사진 박스
const DetailImgBox = styled.div`
  width: 340px;
  height: 158px;
  justify-content: center;
  display: flex;
  margin-bottom: 6px;
`;
const DetailImg = styled.img`
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  position: relative;
`;

//숙박페이지에만 들어가는 버튼 (크기조정보류-임시크기 위치)
const DetailImgBtn = styled.button`
  /* position: absolute; */
  font-weight: medium;
  text-align: center;
  background-color: #6478ff;
  border: transparent solid 1px;
  color: #ffffff;
  width: 340px;
  height: 39px;
  border-radius: 9px;
  margin-top: 6px;
  line-height: 13.1px;
  flex-wrap: wrap;
  font-size: 15px;
  margin-bottom: 10px;
  cursor: pointer;
`;

// 상세정보박스
const DetailInformation = styled.div`
  width: 339px;
  top: 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 3.97px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  box-sizing: border-box;
  margin-bottom: 10px;
`;

//상세박스 소개 텍스트
const DetailInfo = styled.span`
  display: block;
  width: 311px;
  line-height: 15px;
  flex-wrap: wrap;
  font-size: 10px;
  font-weight: medium;
  margin: 12px 13px 8.46px 15px;
`;
//상세박스 정보 텍스트
const DetailInfo2 = styled.div`
  width: 311px;
  margin: 0px 13px 16px 15px;
  flex-wrap: wrap;
  line-height: 7.3px;
  font-size: 10px;
  font-weight: medium;
`;

const DetailInfoAdd = styled.div`
  width: 311px;
  flex-wrap: wrap;
  font-size: 10px;
  line-height: 10px;
  font-weight: medium;
  padding: 0px 5px 8px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DetailTextBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 311px;
`;

//지도박스
const DetailInformationMap = styled.div`
  width: 340px;
  height: 140px;
  border-radius: 3.97px;
  flex-wrap: wrap;
`;

//댓글
const CommunicationWrap = styled.div`
  width: 340px;
  height: 444px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 11.28px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  margin: 9.78px 0 1.12px 0;
`;

//하단 추천 탭
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
