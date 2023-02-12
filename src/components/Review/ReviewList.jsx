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

export default function ReviewList({ review, i, reviews, key }) {
  const [newReview, setNewReview] = useState('');
  const [editBox, setEditBox] = useState(false);
  const [editValue, setEditValue] = useState(reviews.review);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');

  const handleDelete = async (id, i) => {
    if (auth.currentUser.uid === reviews[i].uid) {
      const reviewDoc = doc(db, 'reviews', id);
      await deleteDoc(reviewDoc);
    } else {
      alert('작성자가 다릅니다.');
      //작성가 다르거나 비로그인 유저에게 버튼이 보이지 않는다면 필요없어짐.
    }
  };
  // console.log('유저 uid ', auth.currentUser.displayName);
  // console.log('리뷰 uid', reviews);

  //업데이트
  const handleUpdate = async (id) => {
    await updateDoc(doc(usersCollectionRef, id), {
      review: editValue,
    });
  };

  return (
    <div key={review.id}>
      <h2>닉네임: {review?.displayName}</h2>
      {!editBox ? (
        <h2>댓글: {review?.review}</h2>
      ) : (
        <input
          placeholder={review?.review}
          value={editValue}
          onChange={(e) => {
            setEditValue(e.target.value);
            // console.log(editValue);
          }}
        />
      )}

      {loginUser?.uid === review?.uid ? (
        <button
          onClick={() => {
            handleDelete(review.id, i);
          }}
        >
          {!editBox ? '삭제' : null}
        </button>
      ) : null}
      {loginUser?.uid === review?.uid ? (
        <button
          onClick={() => {
            handleUpdate(review.id);
            setEditBox(!editBox);
          }}
        >
          {!editBox ? '수정' : '수정완료'}
        </button>
      ) : null}
    </div>
  );
}
