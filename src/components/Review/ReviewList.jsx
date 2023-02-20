import React from 'react';
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db, auth } from '../../apis/firebase';
import styled from 'styled-components';
import { getDate } from '../../common/utils';
import useNotification from '../../hooks/useNotification';

export default function ReviewList({ review, i, reviews, key }) {
  const [newReview, setNewReview] = useState('');
  const [editBox, setEditBox] = useState(false);
  const [editValue, setEditValue] = useState(reviews.review);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');
  const [alarmMsg, setAlarmMsg] = useState(''); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행

  //삭제
  const handleDelete = async (id, i) => {
    if (auth.currentUser.uid === reviews[i].uid) {
      const reviewDoc = doc(db, 'reviews', id);
      await deleteDoc(reviewDoc);
    } else {
      alert('작성자가 다릅니다.');
      //작성가 다르거나 비로그인 유저에게 버튼이 보이지 않는다면 필요없어짐.
    }
  };

  //업데이트
  const handleUpdate = async (id) => {
    await updateDoc(doc(usersCollectionRef, id), {
      review: editValue,
    });
  };

  return (
    <CommentBox key={review.id}>
      <h2>닉네임: {review?.displayName}</h2>
      {!editBox ? (
        <h2>댓글 : {review?.review}</h2>
      ) : (
        <input
          placeholder={review?.review}
          value={editValue}
          onChange={(e) => {
            setEditValue(e.target.value);
          }}
        />
      )}

      {loginUser?.uid === review?.uid ? (
        <button
          onClick={() => {
            setAlarmMsg('리뷰 삭제완료!'); //알람관련 코드4 - 들어갈 내용 정하는 부분
            addNoti(); //알람관련 코드5 - useNotification 커스텀 훅 내의 addNoti 함수 실행
            handleDelete(review.id, i);
          }}
        >
          {!editBox ? '삭제' : null}
        </button>
      ) : null}
      {loginUser?.uid === review?.uid ? (
        <button
          onClick={() => {
            setAlarmMsg('리뷰 수정완료!'); //알람관련 코드4 - 들어갈 내용 정하는 부분
            addNoti(); //알람관련 코드5 - useNotification 커스텀 훅 내의 addNoti 함수 실행
            handleUpdate(review.id);
            setEditBox(!editBox);
          }}
        >
          {!editBox ? '수정' : '수정완료'}
        </button>
      ) : null}

      <h3>{getDate(review.date)}</h3>
    </CommentBox>
  );
}

const CommentBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;
