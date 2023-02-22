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
  //좋아요 클릭 한번만 될수있도록
  const clickRef = useRef(false);
  //좋아요 클릭시 하트 색상 변화
  const [isLiked, setIsLiked] = useState(false);
  //중복클릭방지
  const [disabled, setDisabled] = useState(false);
  //좋아요 클릭시 팝업창으로 알람뜨게해줌
  const [alarmMsg, setAlarmMsg] = useState('찜하기 목록에 추가되었습니다!');
  const { addNoti } = useNotification(alarmMsg);

  //여래개의 api데이터를 한번에 사용할수있도록 합침
  const combinedData = {
    ...spotData,
    ...restaurantDetailData,
    ...stayDetailData,
    ...spotDetailData,
    ...stayData,
    ...restaurantData,
  };

  const handleLiked = async () => {
    //유저 아이디 가져오기
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, 'bookmarks'), uid);
    const restaurantDocRef = doc(
      db,
      'restaurant_recommendation',
      restaurantParamId,
    );
    // console.log('식당 paramid', restaurantParamId);
    console.log('Button clicked');
    console.log('like 상태', isLiked);
    console.log('토스트 메시지 상태', alarmMsg);
    if (!isLiked) {
      setAlarmMsg('찜하기 추가!');
      setIsLiked(!isLiked);
      await getDoc(docRef)
        .then((doc) => {
          // 없으면 새로 생성
          if (!doc.exists()) {
            setDoc(docRef, {
              bookmarks: arrayUnion({
                restaurant: combinedData.title,
                img: combinedData.firstimage,
                contentid: combinedData.contentid,
                date: Date.now(),
                contenttypeid: combinedData.contenttypeid,
                addr1: combinedData.addr1,
                // addedUser: [uid]
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
      // 좋아요 버튼 활성화 관련
      // clickRef.current = true;
      // setDisabled(true);
      // localStorage.setItem('clickRef', true);
    } else {
      setAlarmMsg('찜하기 제거!');
      setIsLiked(!isLiked);
      updateDoc(docRef, {
        bookmarks: arrayRemove({
          restaurant: combinedData.title,
          img: combinedData.firstimage,
          contentid: combinedData.contentid,
          date: Date.now(),
          contenttypeid: combinedData.contenttypeid,
          addr1: combinedData.addr1,
          // uid: uid,
        }),
        contentid: arrayRemove(combinedData.contentid),
      });
      updateDoc(restaurantDocRef, {
        // likeCnt: arrayUnion(`${uid}`), //좋아요 한 사람이 누군지 알 수 있도록 배열
        likeCnt: increment(-1),
      });
      // await getDoc(docRef).then((doc)=>{
      // })
      // setAlarmMsg('이미 추가된 항목입니다!');
    }
    addNoti();
  };

  return (
    <div>
      <HeartBtn onClick={handleLiked} disabled={disabled}>
        <Heart src={redheart} />
      </HeartBtn>
    </div>
  );
}

const HeartBtn = styled.button`
  border: none;
  background-color: #ffffff;
  ${(props) => (props.disabled ? 'pointer-events: none;' : '')}
`;

const Heart = styled.img`
  width: 27.09px;
  /* margin: 10px; */
  margin-top: 13px;
  &:hover {
    transform: scale(1.1);
  }
`;
