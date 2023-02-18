import { doc, updateDoc, arrayUnion, setDoc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../../apis/firebase';
import useNotification from '../../hooks/useNotification.ts'; // 알람관련코드1
import HeartButton from './Heart';

// 삭제할 페이지

export default function Liked({
  spotData,
  restaurantDetailData,
  stayDetailData,
}: UserProps): React.ReactElement {
  const [like, setLike] = useState(false);
  //3개의 api데이터를 한번에 사용할수있도록 합침
  const combinedData = {
    ...spotData,
    ...restaurantDetailData,
    ...stayDetailData,
  };
  // const buttonRef = useRef();
  const [alarmMsg, setAlarmMsg] = useState(''); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행
  // const uid = auth.currentUser.uid;
  // console.log(uid);

  const addLiked = async () => {
    //유저 아이디 가져오기
    const uid = auth.currentUser.uid;
    const docRef = doc(db, 'bookmarks', uid);

    // 유저 컬렉션이 존재하는지 확인
    await getDoc(docRef)
      .then((doc) => {
        // 없으면 새로 생성
        if (!doc.exists()) {
          setDoc(docRef, {
            uid: uid,
            bookmarks: [],
          });
        }
      })
      .catch((e) => console.log(e));
    await updateDoc(docRef, {
      bookmarks: arrayUnion(combinedData.title),
    }).catch((e) => console.log(e));
    // window.alert('like 저장');
    setLike(!like);

    setAlarmMsg('찜하기 목록에 추가되었습니다!'); //알람관련 코드4 - 들어갈 내용 정하는 부분
    addNoti(); //알람관련 코드5 - useNotification 커스텀 훅 내의 addNoti 함수 실행
  };

  return (
    <div>
      {/* 버튼 이모지 임의 지정 */}
      <HeartButton onClick={addLiked} like={like} />
    </div>
  );
}
