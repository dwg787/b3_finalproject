import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../apis/firebase';
import { useParams } from 'react-router-dom';
export default function CommunicationPage() {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');
  console.log(loginUser);
  // const { id } = useParams();
  // console.log({ id });
  //리뷰 등록
  const creatReview = async () => {
    const loginUser = auth.currentUser;

    if (loginUser) {
      const addRev = await addDoc(usersCollectionRef, {
        review: newReview,
        uid: loginUser.uid,
        email: loginUser.email,

        // displayName: loginUser?.displayName,
        //파이어베이스에 저장이됨
      });
      window.location.reload();
    } else {
      alert('로그인을 하세요');
    }
    // console.log(addRev);
  };
  const handleDelete = async (id, i) => {
    if (auth.currentUser.uid === reviews[i].uid) {
      const reviewDoc = doc(db, 'reviews', id);
      await deleteDoc(reviewDoc);
      window.location.reload();
    } else {
      alert('작성자가 다릅니다.');
      //작성가 다르거나 비로그인 유저에게 버튼이 보이지 않는다면 필요없어짐.
    }
  };
  //useparams 를 사용하여 url 주소값을 파이어베이스로 보낸후
  //파이어베이스에서 데이터를 가져올 때 useparams의 값이 같은 것만
  //map을 돌려서 return 해준다!
  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(usersCollectionRef);
      setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getReviews();
  }, []);
  return (
    <div>
      <div>커뮤니케이션</div>
      <div>
        {reviews.map((review, i) => {
          return (
            <div key={review.id}>
              <h1>이메일: {review.email}</h1>
              <h1>리뷰: {review.review}</h1>
              {loginUser.uid === review.uid ? (
                <button
                  onClick={() => {
                    handleDelete(review.id, i);
                  }}
                >
                  삭제
                </button>
              ) : null}
            </div>
          );
        })}
        <input
          value={newReview}
          placeholder='리뷰를 입력하세요.'
          onChange={(event) => {
            setNewReview(event.target.value);
          }}
        />
        <button onClick={creatReview}>리뷰 등록</button>
      </div>
    </div>
  );
}
