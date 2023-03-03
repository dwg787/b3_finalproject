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
  @media screen and (max-width: 820px) {
    width: 100%;
    height: 100%;
  }
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
  @media screen and (max-width: 820px) {
    width: 100%;
    height: 100%;
    max-width: 390px;
  }
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

  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

//상세페이지 상단부분 박스(제목)
const DeatilTextBox = styled.div`
  width: 100%;
  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

const TabHr = styled.hr`
  border: solid #6478ff 1.13px;
  width: 933.21px;
  margin: 0;
  @media screen and (max-width: 820px) {
    border: solid #6478ff 1px;
    width: 390px;
    margin: 0;
  }
`;

//상세페이지 상단 제목
const DetailText = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 33.72px;
  color: #6478ff;
  margin-top: 35.67px;
  line-height: 31.5px;
  @media screen and (max-width: 820px) {
    font-size: 17px;

    margin-top: 25px;
    line-height: 11.1px;
  }
`;

//상세페이지 상단 제목 하단 도시
const DetailTextArr = styled.div`
  text-align: center;
  font-size: 18.96px;
  margin-top: 20.47px;
  color: #333333;
  font-weight: bold;
  line-height: 17.7px;
  @media screen and (max-width: 820px) {
    font-size: 12px;
    margin-top: 14px;

    font-weight: bold;
    line-height: 6.2px;
  }
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
  @media screen and (max-width: 820px) {
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
    line-height: 10px;
    font-size: 11px;
    margin-bottom: 22.92px;
    margin-top: 13px;
  }
`;

//상세페이지 사진 박스
const DetailImgBox = styled.div`
  width: 963.68px;
  height: 449.68px;
  justify-content: center;
  display: flex;
  margin-bottom: 14.67px;
  @media screen and (max-width: 820px) {
    width: 340px;
    height: 158px;

    margin-bottom: 6px;
  }
`;
const DetailImg = styled.img`
  width: 100%;
  border-radius: 11.28px;
  border: 1px solid rgb(158, 171, 255, 0.61);
  position: relative;
  @media screen and (max-width: 820px) {
    width: 100%;
    border-radius: 4px;
    border: 1px solid rgb(158, 171, 255, 0.61);
  }
`;

//숙박페이지에만 들어가는 버튼
const DetailImgBtn = styled.button`
  position: absolute;
  font-weight: medium;
  text-align: center;
  background-color: #6478ff;
  border: #ffffff solid 1px;
  color: #ffffff;
  width: 305px;
  height: 44px;
  border-radius: 13px;
  margin-top: 361.21px;
  line-height: 17.4px;
  flex-wrap: wrap;
  font-size: 18.6px;
  cursor: pointer;
  @media screen and (max-width: 820px) {
    position: relative;
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
  }
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
  @media screen and (max-width: 820px) {
    width: 339px;
    top: 0;

    border-radius: 3.97px;
    border: 1px solid rgb(158, 171, 255, 0.61);
    box-sizing: border-box;
    margin-bottom: 10px;
  }
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
  @media screen and (max-width: 820px) {
    width: 311px;
    line-height: 15px;
    flex-wrap: wrap;
    font-size: 10px;
    font-weight: medium;
    margin: 12px 13px 8.46px 15px;
  }
`;
//상세박스 정보 텍스트
const DetailInfo2 = styled.div`
  width: 907.25px;
  margin: 0px 28.77px 23.57px 27.65px;
  flex-wrap: wrap;
  line-height: 20.9px;
  font-size: 12.98px;
  font-weight: medium;
  @media screen and (max-width: 820px) {
    width: 311px;
    margin: 0px 13px 16px 15px;
    flex-wrap: wrap;
    line-height: 7.3px;
    font-size: 10px;
  }
`;

const DetailInfoAdd = styled.div`
  width: 907.25px;
  flex-wrap: wrap;
  font-size: 12.98px;
  line-height: 20.9px;
  font-weight: medium;
  padding: 0px 0px 1.84px 0px;
  @media screen and (max-width: 820px) {
    width: 311px;
    flex-wrap: wrap;
    font-size: 10px;
    line-height: 10px;
    font-weight: medium;
    padding: 0px 5px 8px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const DetailTextBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 907.25px;
  @media screen and (max-width: 820px) {
    width: 311px;
  }
`;

//지도박스
const DetailInformationMap = styled.div`
  width: 963.68px;
  height: 398.33px;
  border-radius: 11.28px;
  flex-wrap: wrap;
  @media screen and (max-width: 820px) {
    width: 340px;
    height: 140px;
    border-radius: 3.97px;
    flex-wrap: wrap;
  }
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

  @media screen and (max-width: 820px) {
    width: 340px;
    height: 460px;
    border-radius: 11.28px;
    border: 1px solid rgb(158, 171, 255, 0.61);
    margin: 9.78px 0 1.12px 0;
  }

  @media screen and (max-width: 390px) {
    width: 340px;
    height: 460px;
    box-shadow: 0.795985px 0.795985px 1.98996px rgba(0, 0, 0, 0.18);
    border-radius: 3.97992px;
  }
`;

//하단 추천 탭å
const SideInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 820px) {
    width: 100%;
  }
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
