import { doc, updateDoc, setDoc, getDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { auth, db } from '../../apis/firebase';
import useNotification from '../../hooks/useNotification';
import HeartButton from './Heart';

export default function RestaurantLiked({
  spotData,
  restaurantDetailData,
  stayDetailData,
}: UserProps): React.ReactElement {
  // const uid = auth.currentUser.uid;
  const [like, setLike] = useState(false);
  const combinedData = {
    ...spotData,
    ...restaurantDetailData,
    ...stayDetailData,
  };

  const [alarmMsg, setAlarmMsg] = useState('찜하기 목록에 추가되었습니다!'); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행

  const addRestaurantLiked = async () => {
    // console.log(restaurantDetailData);
    //유저 아이디 가져오기
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, 'restaurantlike'));
    // 로그인확인용 -> 이동을 어디로..?
    // if (!auth.currentUser) {
    //   alert('로그인이 필요합니다.');
    //   Navigate('/');
    // }

    // 유저 컬렉션이 존재하는지 확인
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
    setLike(!like);
    // alert('Like저장');
    if (like) {
      setAlarmMsg('찜하기 목록에 추가되었습니다!');
    } else {
      setAlarmMsg('찜하기 목록에서 제거되었습니다!'); //알람관련 코드4 - 들어갈 내용 정하는 부분
    }
    addNoti(); //알람관련 코드5 - useNotification 커스텀 훅 내의 addNoti 함수 실행
  };

  return (
    <div>
      {/* 버튼 이모지 임의 지정 */}
      <HeartButton onClick={addRestaurantLiked} like={like} />
    </div>
  );
}
