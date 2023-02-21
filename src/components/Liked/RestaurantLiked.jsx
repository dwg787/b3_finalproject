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
  const [alarmMsg, setAlarmMsg] = useState('');
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

  const addRestaurantLiked = async () => {
    // console.log(restaurantDetailData);

    //유저 아이디 가져오기
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, 'bookmarks'), uid);
    const restaurantDocRef = doc(
      db,
      'restaurant_recommendation',
      restaurantParamId,
    );

    console.log('식당 paramid', restaurantParamId);

    if (!clickRef.current) {
      clickRef.current = true;
      console.log('Button clicked');

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
                // addedUser: [uid]
                // uid: uid,
              }),
              contentid: arrayUnion(combinedData.contentid),
            });
            updateDoc(restaurantDocRef, {
              likeCnt: arrayUnion(`${uid}`),
            });
          } else {
            updateDoc(docRef, {
              bookmarks: arrayUnion({
                restaurant: combinedData.title,
                img: combinedData.firstimage,
                contentid: combinedData.contentid,
                date: Date.now(),
                contenttypeid: combinedData.contenttypeid,
                // uid: uid,
              }),
              contentid: arrayUnion(combinedData.contentid),
            });
            updateDoc(restaurantDocRef, {
              likeCnt: arrayUnion(`${uid}`),
            });
          }
        })
        .catch((e) => console.log(e));

      // setIsLiked(true);
      // 좋아요 버튼 활성화 관련
      // clickRef.current = true;
      // setDisabled(true);
      // localStorage.setItem('clickRef', true);
      setAlarmMsg('찜하기 목록에 추가되었습니다!');
    } else {
      setAlarmMsg('이미 추가된 항목입니다!');
    }
    addNoti();
  };

  return (
    <div>
      <HeartBtn onClick={addRestaurantLiked} disabled={disabled}>
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
