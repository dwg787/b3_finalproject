import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../apis/firebase";
import Loader from "../Loader/Loader";
import noimg from "../../assets/noimg.png";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCart = async () => {
    const uid = auth.currentUser.uid;
    const q = query(collection(db, "carts"), where("uid", "==", uid));
    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
    }));
    setCarts(newData);
  };

  useEffect(() => {
    getCart()
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <StTicketWrap>
        <h1>장바구니</h1>
        <StTicket>
          {carts.map((data, i) => {
            return (
              <Link to={`/stay/${data.contentid}`}>
                <StTicketCard key={i}>
                  <StTicketCardLeft>
                    <StMyTicketImage src={data.img || noimg} alt="숙박 사진" />
                  </StTicketCardLeft>
                  <StCartTitle>{data.carts.split("[", 1)}</StCartTitle>
                </StTicketCard>
              </Link>
            );
          })}
        </StTicket>
      </StTicketWrap>
    </>
  );
};

export default MyCart;

const StTicketWrap = styled.div`
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 90%;
  /* background-color: teal; */
  /* margin: 10px; */
  box-sizing: border-box;
`;

const StTicketCard = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;

  /* box-sizing: border-box; */
  border-radius: 10px;
  /* padding: 10px; */
  /* display: grid; */
  align-items: center;
  /* flex-direction: column; */
  clear: both;
  display: flex;
  justify-content: center;
  /* background-color: rgba(255, 255, 255, 0.5); */
  background-size: contain;
`;

const StTicketCardLeft = styled.div`
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const StMyTicketImage = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.35s;
  }
  position: relative;
  display: flex;

  box-shadow: 5px 5px 10px grey;
  opacity: 0.7;
  /* top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px; */
`;

const StCartTitle = styled.span`
  position: absolute;
  color: #fafafa;
  font-weight: 900;
  z-index: 100;
  text-align: center;
`;
