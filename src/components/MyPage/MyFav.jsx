import React, { useEffect, useState } from 'react';
import { auth, db } from '../../apis/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Loader from '../Loader/Loader';
import styled from 'styled-components';
import MyFavDetail from './MyFavDetail';

// 1. 좋아요 또는 찜하기 기능만들기 > 마이페이지 좋아요탭에서 내가 누른 좋아요 게시물을 확인가능하도록
// 2. 디테일 페이지에 좋아요 기능넣기
// 3. 파이어베이스 스토리지에 북마크DB를 만들자 > 좋아요를 클릭하면 contentid라던가 장소이름 값이 저장되도록 하기
// 4. 마이페이지 좋아요 탭(컴포넌트)에 파베 데이터를 가져와서 좋아요가 찍힌 데이터들을 맵돌리기

const MyFav = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLiked = async () => {
    const uid = auth.currentUser.uid;
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
    <StLiked>
      {bookmarks.map((title, i) => {
        return <MyFavDetail getLiked={getLiked} title={title} key={i} />;
      })}
    </StLiked>
  );
};

export default MyFav;

const StLiked = styled.div``;
