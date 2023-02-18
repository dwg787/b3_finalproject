import styled from 'styled-components';
import MyRestaurantLiked from './MyRestaurantLiked';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../apis/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import MyFavDetail from './MyFavDetail';
import Loader from '../Loader/Loader';
const MyFav = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLiked = async () => {
    const uid = auth.currentUser.uid;
    // console.log(uid);
    const q = query(collection(db, 'bookmarks'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBookmarks(doc.data().bookmarks);
    });
  };

  useEffect(() => {
    getLiked()
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StFavWrap>
      <MyRestaurantLiked />
      {bookmarks.map((title, i) => {
        return <MyFavDetail getLiked={getLiked} title={title} key={i} />;
      })}
    </StFavWrap>
  );
};

export default MyFav;

const StFavWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;
