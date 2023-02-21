import styled from 'styled-components';
import MyRestaurantLiked from './MyRestaurantLiked';
import MyLikeList from './MyLikeList';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../apis/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import MyFavDetail from './MyFavDetail';
import Loader from '../Loader/Loader';
import RestaurantLiked from '../Liked/RestaurantLiked';
const MyFav = () => {
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const getLiked = async () => {
  //   const uid = auth.currentUser.uid;

  //   const q = query(collection(db, 'bookmarks'), where('uid', '==', uid));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setBookmarks(doc.data().bookmarks);
  //   });
  // };

  // useEffect(() => {
  //   getLiked()
  //     .then(() => setIsLoading(false))
  //     .catch((e) => console.log(e));
  // }, []);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    // <StTicketWrap>
    //   <StTicket>
    //     {bookmarks.map((title, i) => {
    //       return <MyFavDetail getLiked={getLiked} title={title} key={i} />;
    //     })}
    //   </StTicket>
    // </StTicketWrap>
    <Container>
      <LikedHeader>나의 찜 목록</LikedHeader>
      <MyRestaurantLiked />
      <MyLikeList />
    </Container>
  );
};

export default MyFav;

const LikedHeader = styled.div`
  font-size: 25.79px;
  line-height: 24.1px;
  margin: 58.2px 0 59.98px 0;
  font-weight: 900;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #4d4d4d;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
