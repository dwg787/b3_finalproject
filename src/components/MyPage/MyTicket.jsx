import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../apis/firebase";
import styled from "styled-components";

const MyTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTicket = async () => {
    const uid = auth.currentUser.uid;
    const q = query(collection(db, "reservations"), where("uid", "==", uid));
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
    <StTicket>
      {tickets.map((data, i) => {
        return (
          <div key={i}>
            <StTicketCard>
              <h2>{data.title}</h2>
              <p>이름 : {data.name}</p>
              <p>이메일 : {data.email}</p>
              <p>숙박인원 : {data.count}</p>
              <p>숙박 시작일 : {data.startDate}</p>
              <p>숙박 종료일 : {data.termDate}</p>
            </StTicketCard>
          </div>
        );
      })}
    </StTicket>
  );
};

export default MyTicket;

const StTicket = styled.div`
  width: 100%;
  height: 90%;
  background-color: teal;
  margin: 10px;
`;

const StTicketCard = styled.div`
  width: 400px;
  height: 200px;
  margin: 10px;
  background-color: #d7dce0;
`;
