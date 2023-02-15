import {
  arrayRemove,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../apis/firebase";
import Loader from "../Loader/Loader";
import noimg from "../../assets/noimg.png";
import { Link } from "react-router-dom";

const MyRestaurantLiked = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const uid = auth.currentUser.uid;

  const getRestaurantLiked = async () => {
    const q = query(collection(db, "restaurantlike"), where("uid", "==", uid));
    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
    }));
    setRestaurant(newData);
  };

  useEffect(() => {
    getRestaurantLiked()
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // 파이어베이스에 저장한 배열의 타이틀을 삭제해보자
  const delResLiked = async () => {
    const docRef = doc(db, "restaurantlike", uid);
    console.log(docRef);
    await deleteDoc(docRef);
  };

  return (
    <>
      <StTicketWrap>
        <StTicket>
          {restaurant.map((data, i) => {
            return (
              // <Link to={`/restaurant/${data.contentid}`}> </Link>
              <StTicketCard key={i}>
                <StTicketCardLeft>
                  <StTicketHeader>
                    <StCartMenu>음식점</StCartMenu>
                    <button
                      onClick={() => {
                        delResLiked()
                          .then(() => {
                            window.alert("Like 삭제 완료");
                            getRestaurantLiked();
                          })
                          .catch((e) => console.log(e));
                      }}
                    >
                      삭제
                    </button>
                  </StTicketHeader>

                  <StMyTicketImage src={data.img || noimg} alt="사진" />
                </StTicketCardLeft>
                <StCartTitle>{data.restaurant.split("[", 1)}</StCartTitle>
              </StTicketCard>
            );
          })}
        </StTicket>
      </StTicketWrap>
    </>
  );
};

export default MyRestaurantLiked;

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
  width: 100%
  height: 100%;
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
  /* &:hover {
    transform: scale(1.1);
    transition: all 0.35s;
  } */
  position: relative;
  display: flex;

  box-shadow: 5px 5px 10px grey;
  opacity: 0.7;
`;

const StCartTitle = styled.span`
  position: absolute;
  color: #fafafa;
  font-weight: 900;
  z-index: 100;
  text-align: center;
`;

const StCartMenu = styled.span`
  color: #fafafa;
  font-weight: 900;
  z-index: 100;
  background-color: teal;
  margin-right: 130px;
`;

const StTicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
`;
