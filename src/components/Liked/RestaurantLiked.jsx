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
  query,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../../apis/firebase';
import useNotification from '../../hooks/useNotification';
import heart from '../../assets/heart.avif';
import redheart from '../../assets/redheart.avif';
import { async } from '@firebase/util';
import { useRecoilValue } from 'recoil';
import { paramTransfer } from '../../recoil/apiDataAtoms';
import { useParams } from 'react-router-dom';

export default function RestaurantLiked({
  spotData,
  restaurantDetailData,
  stayDetailData,
  stayData,
  spotDetailData,
  restaurantData,
  spotParamId,
  stayParamId,
}: UserProps): React.ReactElement {
  const param = useParams();
  //좋아요 클릭시 하트 색상 변화
  const [isLiked, setIsLiked] = useState(false);
  //좋아요 클릭시 팝업창으로 알람뜨게해줌
  const [alarmMsg, setAlarmMsg] = useState('찜하기 추가!');
  const { addNoti } = useNotification(alarmMsg); //토스트 메시지 띄우는 커스텀훅
  // const thisRestaurantId = useRecoilValue(paramTransfer);
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

  console.log('파라미터', param.id);

  const fetchBookmarkData = async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, 'bookmarks'), uid);
    const res = await getDoc(docRef);
    setIsLiked(res.data().contentid.includes(param.id));
    console.log('확인하고 싶은 값', res.data().contentid.includes(param.id));
    console.log('해당 장소의 like??', isLiked);
    console.log('이 페이지 식당 id', param.id);
    // console.log('res', res.data());
  };

  useEffect(() => {
    fetchBookmarkData();
    console.log('현재 장소의 like 상태', isLiked);
  }, []);

  const handleLiked = async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, 'bookmarks'), uid);
    const restaurantDocRef = doc(db, 'restaurant_recommendation', param.id);

    if (isLiked) {
      setAlarmMsg('찜하기 추가!');
      setIsLiked(false);
      await getDoc(docRef).then((doc) => {
        const TargetBookmark = doc
          .data()
          .bookmarks.find((e) => e.contentid === param.id);
        // console.log('찜하기 제거 타겟', TargetBookmark);
        // setIsLiked(!!TargetBookmark);
        if (doc.exists()) {
          updateDoc(docRef, {
            bookmarks: arrayRemove(TargetBookmark),
            contentid: arrayRemove(combinedData.contentid),
          });
          updateDoc(restaurantDocRef, {
            // likeCnt: arrayRemove(`${uid}`), //좋아요 한 사람 배열에서 제거
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
