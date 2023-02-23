import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../apis/firebase';
import { fetchStayDetailInfo } from '../apis/publicAPI';
import Ticketing from '../components/Reservation/Ticketing';
import noimg from '../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';

// 예약페이지 만들기
// 1. 예약페이지에 클릭한 해당 숙박의 상세내용과 티켓팅 컴퍼넌트를 같이 넣어 띄워주기 =>완료
// 2. 숙박 상세내용 : 타이틀, 사진, 주소 -> 예약페이지에 띄우기만 하면됨 =>완료
// 3. 티켓팅 받는 정보 :  이름 , 메일, 인원수,숙박시작일,숙박종료일 ->숙박타이틀과 같이 파이어베이스에 저장시키기
// 4.저장된 파베정보를 마이페이지의 예약완료(?)페이지에 나타내주기(일단은 티켓팅 정보 모두(?)가져와보기)
// [보류]5.카트(?)페이지에는 간단하게 이름 주소 ?정도만 저장하게하기?->카트페이지에서 예약하기 누르면 예약상세페이지로 이동할수있도록하기?

const ReservationPage = () => {
  const param = useParams();
  const { data: stayDetailData, isLoading: isLoadingStayDetail } = useQuery(
    ['stay_detail', param],
    () => fetchStayDetailInfo({ param }),
  );

  return (
    <MainWrap>
      <Reservation>예약하기</Reservation>
      <ReservationBottom />
      <ReservationWrap>
        <ReservationImgWrap>
          <ReservationImg src={stayDetailData.firstimage || noimg} />
        </ReservationImgWrap>
        <ReservationTitle>{stayDetailData.title}</ReservationTitle>
        <ReservationAdd>{stayDetailData.addr1}</ReservationAdd>
        <ReservationWrapBottom />

        <ReservationInfo>
          <ReservationInfoImg
            src={stayDetailData.firstimage || noimg}
          ></ReservationInfoImg>
          <div>
            <div>객실타입 슈페리어 더블(노오션뷰 / ROOM ONLY)</div>
            <div>예약자 이름 심대호</div>
            <div>예약자 이메일 BigHo1@naver.com</div>
            <div>예약자 휴대폰 번호 010-xxxx-xxxx</div>
          </div>
        </ReservationInfo>
      </ReservationWrap>
    </MainWrap>
    // <StTicketMainWrap>
    //   <StTicketMain>
    //     <StTicketInfo>
    //       <div>예약하기</div>
    //       <div>
    //         <h2>{stayDetailData.title}</h2>
    //       </div>
    //       <StTicketInfoImage
    //         src={stayDetailData.firstimage || noimg}
    //         alt="숙박 사진"
    //       />
    //       <div>주소 : {stayDetailData.addr1}</div>
    //     </StTicketInfo>
    //     <StTicketing>
    //       <Ticketing stayDetailData={stayDetailData} />
    //     </StTicketing>
    //   </StTicketMain>
    // </StTicketMainWrap>
  );
};

export default ReservationPage;

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Reservation = styled.div`
  font-size: 33.39px;
  font-weight: bold;
  color: #6478ff;
  margin: 20px 0 20px 0;
`;

const ReservationBottom = styled.div`
  border-bottom: #6478ff 3px solid;
  width: 98%;
`;

const ReservationWrap = styled.div`
  border: 1.5px solid #9eabff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0 0 0;
  border-radius: 20px;
`;

const ReservationImgWrap = styled.div`
  margin-top: 40px;
`;

const ReservationImg = styled.img`
  border-radius: 20px;
  border: 1.5px solid #9eabff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
`;

const ReservationTitle = styled.div`
  font-size: 59.77px;
  font-weight: bold;
  color: #6478ff;
  margin-top: 60px;
`;

const ReservationAdd = styled.div`
  font-size: 27.75px;
  font-weight: medium;
  color: #656565;
  margin-top: 50px;
`;

const ReservationWrapBottom = styled.div`
  border-bottom: #6478ff 1px solid;
  width: 90%;
  margin: 40px 0 40px 0;
`;

const ReservationInfo = styled.div`
  width: 1536px;
  height: 660px;
  border: 1.5px solid #9eabff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
  border-radius: 20px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
`;

const ReservationInfoImg = styled.img`
  width: 1455px;
  height: 329px;
  border-radius: 20px;
  border: 1.5px solid #9eabff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
`;

// ========================================================================================================

const StTicketMainWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StTicketMain = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
  width: 70%;
  margin: 20px;
`;

const StTicketInfo = styled.div`
  width: 75%;
  /* float: left; */
  background-color: #6b9cc7;
  box-sizing: border-box;
`;

const StTicketInfoImage = styled.img`
  width: 70%;
  height: 500px;
  padding: 30px;
`;

const StTicketing = styled.div`
  width: 30%;
  padding: 30px;
  float: right;
  background-color: #ccd4d4;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;
