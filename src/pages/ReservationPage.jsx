import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../apis/firebase";
import { fetchStayDetailInfo } from "../apis/publicAPI";
import Ticketing from "../components/Reservation/Ticketing";

// 예약페이지 만들기
// 1. 예약페이지에 클릭한 해당 숙박의 상세내용과 티켓팅 컴퍼넌트를 같이 넣어 띄워주기 =>완료
// 2. 숙박 상세내용 : 타이틀, 사진, 주소 -> 예약페이지에 띄우기만 하면됨 =>완료
// 3. 티켓팅 받는 정보 :  이름 , 메일, 인원수,숙박시작일,숙박종료일 ->숙박타이틀과 같이 파이어베이스에 저장시키기
// 4.저장된 파베정보를 마이페이지의 예약완료(?)페이지에 나타내주기(일단은 티켓팅 정보 모두(?)가져와보기)
// [보류]5.카트(?)페이지에는 간단하게 이름 주소 ?정도만 저장하게하기?->카트페이지에서 예약하기 누르면 예약상세페이지로 이동할수있도록하기?

const ReservationPage = () => {
  const param = useParams();
  const { data: stayDetailData, isLoading: isLoadingStayDetail } = useQuery(
    ["stay_detail", param],
    () => fetchStayDetailInfo({ param })
  );

  return (
    <StTicketMainWrap>
      <StTicketMain>
        <StTicketInfo>
          <div>
            <h2>{stayDetailData.title}</h2>
          </div>
          <StTicketInfoImage src={stayDetailData.firstimage} alt="숙박 사진" />
          <div>주소 : {stayDetailData.addr1}</div>
        </StTicketInfo>
        <StTicketing>
          <Ticketing stayDetailData={stayDetailData} />
        </StTicketing>
      </StTicketMain>
    </StTicketMainWrap>
  );
};

export default ReservationPage;

const StTicketMainWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StTicketMain = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: row;
  width: 70%;
  margin: 20px;
`;

const StTicketInfo = styled.div`
  width: 75%;
  float: left;
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
  background-color: teal;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;
