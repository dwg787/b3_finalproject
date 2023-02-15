import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../apis/firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import noimg from '../../assets/noimg.avif';
const MyTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTicket = async () => {
    const uid = auth.currentUser.uid;
    const q = query(collection(db, 'reservations'), where('uid', '==', uid));
    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
    }));
    setTickets(newData);
  };

  useEffect(() => {
    getTicket()
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StTicketWrap>
      <h1>예약 페이지</h1>
      <StTicket>
        {tickets.map((data, i) => {
          return (
            <StTicketCard key={i}>
              <StTicketCardLeft>
                <StMyTicketImage src={data.img || noimg} alt='숙박 사진' />
              </StTicketCardLeft>
              <StTicketCardRight>
                <h2>{data.title}</h2>
                <p>이름 : {data.name}</p>
                <p>이메일 : {data.email}</p>
                <p>숙박인원 : {data.count}</p>
                <p>숙박 시작일 : {data.startDate}</p>
                <p>숙박 종료일 : {data.termDate}</p>
                <Link to={`/stay/${data.contentid}`}>상세정보보기</Link>
              </StTicketCardRight>
            </StTicketCard>
          );
        })}
      </StTicket>
    </StTicketWrap>
  );
};

export default MyTicket;

const StTicketWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StTicket = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 65%;
  height: 90%;
  /* background-color: teal; */
  margin: 10px;
  box-sizing: border-box;
  /* border-radius: 10px; */
`;

const StTicketCard = styled.div`
  width: 100%;
  margin: 10px;
  background-color: aliceblue;
  box-shadow: 5px 5px 10px grey;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  clear: both;
`;

const StTicketCardRight = styled.div`
  width: 55%;
  /* padding: 30px; */
  float: right;
  height: 200px;
  /* margin: 10px; */
  /* background-color: #d7dce0; */
`;

const StTicketCardLeft = styled.div`
  width: 40%;
  float: left;
  /* background-color: #6b9cc7; */
  box-sizing: border-box;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;

const StMyTicketImage = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
`;
