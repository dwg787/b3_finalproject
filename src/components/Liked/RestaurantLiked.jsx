import {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  collection,
  arrayUnion,
  arrayRemove,
  getDocs,
  where,
  deleteDoc,
  increment,
  decrement,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../../apis/firebase';
import useNotification from '../../hooks/useNotification';
import heart from '../../assets/heart.avif';
import redheart from '../../assets/redheart.avif';
import { async } from '@firebase/util';

export default function RestaurantLiked({
  spotData,
  restaurantDetailData,
  stayDetailData,
  stayData,
  spotDetailData,
  restaurantData,
  restaurantParamId,
  spotParamId,
  stayParamId,
}: UserProps): React.ReactElement {
  //좋아요 클릭시 하트 색상 변화
  const [isLiked, setIsLiked] = useState(false);
  //좋아요 클릭시 팝업창으로 알람뜨게해줌
  const [alarmMsg, setAlarmMsg] = useState('찜하기 추가!');
  const { addNoti } = useNotification(alarmMsg); //토스트 메시지 띄우는 커스텀훅
  const [myBookmark, setMyBookmark] = useState([]);
  const [fetchedUid, setFetchedUid] = useState('');
  //중복클릭방지
  // const [disabled, setDisabled] = useState(false);
  //여래개의 api데이터를 한번에 사용할수있도록 합침
  const combinedData = {
    ...spotData,
    ...restaurantDetailData,
    ...stayDetailData,
    ...spotDetailData,
    ...stayData,
    ...restaurantData,
  };

  // const fetchBookmarkData = async () => {
  //   const uid = auth.currentUser.uid;
  //   const docRef = doc(collection(db, 'bookmarks'), uid);
  //   const res = await getDoc(docRef);
  //   console.log('파베 fetch 결과', res.data());
  // };

  // useEffect(() => {
  //   fetchBookmarkData();
  // }, []);

  const handleLiked = async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, 'bookmarks'), uid);
    const restaurantDocRef = doc(
      db,
      'restaurant_recommendation',
      restaurantParamId,
    );

    if (isLiked) {
      setAlarmMsg('찜하기 추가!');
      setIsLiked(false);
      await getDoc(docRef).then((doc) => {
        const TargetBookmark = doc
          .data()
          .bookmarks.find((e) => e.contentid === restaurantParamId);
        if (doc.exists()) {
          updateDoc(docRef, {
            bookmarks: arrayRemove(TargetBookmark),
            contentid: arrayRemove(combinedData.contentid),
          });
          updateDoc(restaurantDocRef, {
            // likeCnt: arrayUnion(`${uid}`), //좋아요 한 사람이 누군지 알 수 있도록 배열
            likeCnt: increment(-1),
          });
        }
      });
    } else {
      setAlarmMsg('찜하기 제거!');
      setIsLiked(true);
      await getDoc(docRef)
        .then((doc) => {
          if (!doc.exists()) {
            setDoc(docRef, {
              bookmarks: arrayUnion({
                restaurant: combinedData.title,
                img: combinedData.firstimage,
                contentid: combinedData.contentid,
                date: Date.now(),
                contenttypeid: combinedData.contenttypeid,
                addr1: combinedData.addr1,
                // uid: uid,
              }),
              contentid: arrayUnion(combinedData.contentid),
            });
            updateDoc(restaurantDocRef, {
              // likeCnt: arrayUnion(`${uid}`), //좋아요 한 사람이 누군지 알 수 있도록 배열
              likeCnt: increment(1),
            });
          } else {
            updateDoc(docRef, {
              bookmarks: arrayUnion({
                restaurant: combinedData.title,
                img: combinedData.firstimage,
                contentid: combinedData.contentid,
                date: Date.now(),
                contenttypeid: combinedData.contenttypeid,
                addr1: combinedData.addr1,
                // uid: uid,
              }),
              contentid: arrayUnion(combinedData.contentid),
            });
            updateDoc(restaurantDocRef, {
              // likeCnt: arrayUnion(`${uid}`), //좋아요 한 사람이 누군지 알 수 있도록 배열
              likeCnt: increment(1),
            });
          }
        })
        .catch((e) => console.log(e));
    }
    // console.log('like 상태', isLiked);
    // console.log('토스트 메시지 상태', alarmMsg);
    addNoti(); //메시지 창 자체를 띠워주는 함수
  };

  return (
    <div>
      <HeartBtn onClick={handleLiked}>
        {isLiked ? <Heart src={redheart} /> : <Heart src={heart} />}
      </HeartBtn>
    </div>
  );
}

const HeartBtn = styled.button`
  border: none;
  background-color: #fff;
`;

const Heart = styled.img`
  width: 27.09px;
  /* margin: 10px; */
  margin-top: 13px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
