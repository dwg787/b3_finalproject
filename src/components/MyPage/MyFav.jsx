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
    <>
      <MyRestaurantLiked />
      <MyLikeList />
    </>
  );
};

export default MyFav;

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
  height: 100%;
  box-sizing: border-box;
`;
