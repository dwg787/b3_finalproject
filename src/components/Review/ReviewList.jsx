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

export default function ReviewList({ review, i }) {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [editBox, setEditBox] = useState(false);
  const [editValue, setEditValue] = useState(auth.currentUser.review);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');

  const creatReview = async () => {
    const loginUser = auth.currentUser;

    if (loginUser) {
      const addRev = await addDoc(usersCollectionRef, {
        review: newReview,
        uid: loginUser.uid,
        email: loginUser.email,
        modify: true,

        displayName: loginUser?.displayName,
        //파이어베이스에 저장이됨
      });
    } else {
      alert('로그인을 하세요');
    }
    // console.log(addRev);
  };
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
  const handleUpdate = async (id, review) => {
    await updateDoc(doc(db, 'reviews', auth.currentUser.uid), {
      review: editValue,
    });
  };

  return (
    <div key={review.id}>
      <h1>닉네임: {review.displayName}</h1>
      {!editBox ? (
        <h1>리뷰: {review.review}</h1>
      ) : (
        <input
          value={editValue}
          onChange={(e) => {
            setEditValue(e.target.value);
          }}
        />
      )}
      {/* <h1>리뷰: {review.review}</h1> */}
      {loginUser.uid === review.uid ? (
        <button
          onClick={() => {
            handleDelete(review.id, i);
          }}
        >
          {!editBox ? '삭제' : null}
        </button>
      ) : null}
      {loginUser.uid === review.uid ? (
        <button
          onClick={() => {
            handleUpdate(review.id, i, auth.currentUser.id, auth.currentUser);
            setEditBox(!editBox);
          }}
        >
          {!editBox ? '수정' : '수정완료'}
        </button>
      ) : null}
    </div>
  );
}
