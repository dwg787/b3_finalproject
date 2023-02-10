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
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../apis/firebase';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/Review/ReviewList';
import { Snapshot } from 'recoil';
export default function CommunicationPage() {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');
  // console.log(loginUser.uid);
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
        displayName: loginUser?.displayName,
        //파이어스토어 db, reviews 에 저장
      });
      setNewReview('');
    } else {
      alert('로그인을 하세요');
    }
    // console.log(addRev);
  };

  //useparams 를 사용하여 url 주소값을 파이어베이스로 보낸후
  //파이어베이스에서 데이터를 가져올 때 useparams의 값이 같은 것만
  //map을 돌려서 return 해준다!

  // 화면이 처음 렌더링 할때 데이터를 가져옴
  useEffect(() => {
    const getReviews = async () => {
      const q = query(usersCollectionRef);
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
  return (
    <div>
      <div>커뮤니케이션</div>
      <div>
        {reviews.map((review, i) => {
          return (
            <ReviewList
              reviews={reviews}
              setReviews={setReviews}
              review={review}
              i={i}
            />
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
