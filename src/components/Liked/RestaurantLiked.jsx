import {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  collection,
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
}: UserProps): React.ReactElement {
  //좋아요 클릭 한번만 될수있도록
  const clickRef = useRef(false);
  //좋아요 클릭시 하트 색상 변화
  const [isLiked, setIsLiked] = useState(false);
  //중복클릭방지
  // const [disabled, setDisabled] = useState(false);
  //좋아요 클릭시 팝업창으로 알람뜨게해줌
  const [alarmMsg, setAlarmMsg] = useState('');
  const { addNoti } = useNotification(alarmMsg);

  //3개의 api데이터를 한번에 사용할수있도록 합침
  const combinedData = {
    ...spotData,
    ...restaurantDetailData,
    ...stayDetailData,
  };

  //새로고침시 하트색상 변화 방지
  useEffect(() => {
    const liked = localStorage.getItem('isLiked');
    setIsLiked(liked === 'true');

    // const clicked = localStorage.getItem('clickRef');
    // clickRef.current = clicked === 'true';
    // setDisabled(clicked === 'true' || liked === 'true');
  }, [isLiked]);

  const addRestaurantLiked = async () => {
    // console.log(restaurantDetailData);

    //유저 아이디 가져오기
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, 'restaurantlike'));

    if (!clickRef.current) {
      clickRef.current = true;
      console.log('Button clicked');

      await getDoc(docRef)
        .then((doc) => {
          // 없으면 새로 생성
          if (!doc.exists()) {
            setDoc(docRef, {
              restaurant: combinedData.title,
              uid: uid,
              img: combinedData.firstimage,
              contentid: combinedData.contentid,
            });
          }
        })
        .catch((e) => console.log(e));

      await updateDoc(docRef, {
        restaurant: combinedData.title,
        uid: uid,
        img: combinedData.firstimage,
        contentid: combinedData.contentid,
      }).catch((e) => console.log(e));

      //좋아요버튼 색상관련
      setIsLiked(!isLiked);
      localStorage.setItem('isLiked', !isLiked);
      //좋아요 버튼 활성화 관련
      // clickRef.current = true;
      // setDisabled(true);
      // localStorage.setItem('clickRef', true);
      setAlarmMsg('찜하기 목록에 추가되었습니다!');
      addNoti();
    }
  };

  const removeRestaurantLiked = async () => {
    const uid = auth.currentUser.uid;
    const query = query(
      collection(db, 'restaurantlike'),
      where('uid', '==', uid),
      where('contentid', '==', combinedData.contentid),
    );
    const querySnapshot = await getDocs(query);
    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref).catch((e) => console.log(e));
      }),
    );

    setIsLiked(false);
    localStorage.setItem('isLiked', false);

    // clickRef.current = false;
    // setDisabled(false);
    // localStorage.setItem('clickRef', false);
  };

  return (
    <div>
      {isLiked ? (
        <HeartBtn onClick={removeRestaurantLiked}>
          <Heart src={redheart} />
        </HeartBtn>
      ) : (
        <HeartBtn onClick={addRestaurantLiked}>
          <Heart src={heart} />
        </HeartBtn>
      )}
    </div>
  );
}

const HeartBtn = styled.button`
  border: none;
  background-color: #ffffff;
  ${(props) => (props.disabled ? 'pointer-events: none;' : '')}
`;

const Heart = styled.img`
  width: 20px;
  /* margin: 10px; */
  margin-top: 13px;
  &:hover {
    transform: scale(1.1);
  }
`;
