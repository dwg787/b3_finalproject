import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
  onSnapshot,
  QuerySnapshot,
  orderBy,
} from 'firebase/firestore';

import React, { useState, useEffect } from 'react';
import { db, auth } from '../../apis/firebase';
import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';
import { Snapshot } from 'recoil';
import useNotification from '../../hooks/useNotification'; // 알람관련코드1

const Communication = () => {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');
  const params = useParams();
  const [alarmMsg, setAlarmMsg] = useState(''); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행

  //useparams 를 사용하여 id 값을 파이어베이스로 보낸후
  //파이어베이스에서 데이터를 가져올 때 useparams의 값이 같은 것만
  //map을 돌려서 return 해준다!

  // 화면이 처음 렌더링 할때 데이터를 가져옴
  useEffect(() => {
    const getReviews = async () => {
      const q = query(usersCollectionRef, orderBy('date', 'desc'));
      const unsubscrible = onSnapshot(q, (querySnapshot) => {
        const newList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(newList);
      });
      return unsubscrible;
    };
    getReviews();
  }, []);

  //리뷰 등록
  const creatReview = async () => {
    const loginUser = auth.currentUser;

    if (loginUser) {
      const addRev = await addDoc(usersCollectionRef, {
        review: newReview,
        uid: loginUser?.uid,
        email: loginUser.email,
        displayName: localStorage.getItem('id', auth.currentUser.displayName),
        //loginUser?.displayName
        paramId: params.id,
        date: Date.now(),
        //파이어스토어 db, reviews 에 저장
      });
      setNewReview('');
    } else {
      alert('로그인을 하세요');
    }
  };
  return (
    <div>
      <div>커뮤니케이션</div>
      <div>
        {reviews.map((review, i) => {
          if (review.paramId === params.id) {
            return (
              <ReviewList
                reviews={reviews}
                setReviews={setReviews}
                review={review}
                i={i}
              />
            );
          }
        })}
        <input
          value={newReview}
          placeholder="리뷰를 입력하세요."
          onChange={(event) => {
            setNewReview(event.target.value);
          }}
        />
        <button
          onClick={() => {
            creatReview();
            setAlarmMsg('리뷰가 등록되었습니다.'); //알람관련 코드4 - 들어갈 내용 정하는 부분
            addNoti(); //알람관련 코드5 - useNotification 커스텀 훅 내의 addNoti 함수 실행
          }}
        >
          리뷰 등록
        </button>
      </div>
    </div>
  );
};

export default Communication;
