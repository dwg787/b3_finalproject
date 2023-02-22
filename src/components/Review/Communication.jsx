import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from 'firebase/firestore';

import React, { useState, useEffect } from 'react';
import { db, auth } from '../../apis/firebase';
import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';
import useNotification from '../../hooks/useNotification'; // 알람관련코드1
import styled from 'styled-components';
import ReviewSlider from './ReviewSlider';

const Communication = () => {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');
  const params = useParams();
  const [alarmMsg, setAlarmMsg] = useState(''); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행

  const [lastReviewDate, setLastReviewDate] = useState(null);

  //useparams 를 사용하여 id 값을 파이어베이스로 보낸후
  //파이어베이스에서 데이터를 가져올 때 useparams의 값이 같은 것만
  //map을 돌려서 return 해준다!

  const handleLoadMore = () => {
    getReviews();
  };

  const handleMore = () => {
    setLastReviewDate(null);
    getReviews();
  };

  // 화면이 처음 렌더링 할때 데이터를 가져옴

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    let q = query(usersCollectionRef, orderBy('date', 'desc'), limit(6));
    if (lastReviewDate) {
      q = query(
        usersCollectionRef,
        orderBy('date', 'desc'),
        startAfter(lastReviewDate),
        limit(6),
      );
    }
    const unsubscrible = onSnapshot(q, (querySnapshot) => {
      const newList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(newList);
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastReviewDate(lastDoc.data().date); // 마지막 리뷰의 날짜를 저장
    });
    return unsubscrible;
  };

  //리뷰 등록
  const creatReview = async () => {
    const Kakaologinid = localStorage.getItem('uid');
    const Naverloginid = localStorage.getItem('uid');
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
    } else if (Kakaologinid) {
      const addRev = await addDoc(usersCollectionRef, {
        review: newReview,
        uid: localStorage.getItem('uid'),
        displayName: localStorage.getItem('id'),
        //loginUser?.displayName
        paramId: params.id,
        date: Date.now(),
        //파이어스토어 db, reviews 에 저장
      });
      setNewReview('');
    } else if (Naverloginid) {
      const addRev = await addDoc(usersCollectionRef, {
        review: newReview,
        uid: localStorage.getItem('uid'),
        displayName: localStorage.getItem('id'),
        //loginUser?.displayName
        paramId: params.id,
        date: Date.now(),
        //파이어스토어 db, reviews 에 저장
      });
      setNewReview('');
    } else {
      alert('로그인 해주세요');
    }
  };
  //   } else {
  //     alert('로그인을 하세요');
  //   }
  // };
  return (
    <ReviewContainer>
      {/* <DetailInfoText>여행톡</DetailInfoText> */}
      <ReviewBox>
        <ReviewLabel for="review">후기작성</ReviewLabel>
        <InputAndBtnWrap>
          <ReviewInput
            type="text"
            id="review"
            value={newReview}
            placeholder="리뷰를 입력하세요."
            onChange={(event) => {
              setNewReview(event.target.value);
            }}
          />

          <ReviewButton
            onClick={() => {
              setAlarmMsg('리뷰가 등록되었습니다.'); //알람관련 코드4 - 들어갈 내용 정하는 부분
              addNoti(); //알람관련 코드5 - useNotification 커스텀 훅 내의 addNoti 함수 실행
              creatReview();
            }}
          >
            등록
          </ReviewButton>
          <BottomLine />
        </InputAndBtnWrap>
      </ReviewBox>

      <ReviewBoxList>
        <button onClick={handleLoadMore}>⬅️ </button>
        <button onClick={handleMore}>ㅇㅇㅇ</button>

        {reviews.map((review, i) => {
          if (review.paramId === params.id) {
            return (
              <>
                <ReviewList
                  reviews={reviews}
                  setReviews={setReviews}
                  review={review}
                  i={i}
                  uid={localStorage.getItem('id')}
                  handleLoadMore={handleLoadMore}
                />
              </>
            );
          }
        })}
      </ReviewBoxList>
    </ReviewContainer>
  );
};

export default Communication;

const BottomLine = styled.div`
  width: 95%;
  border-bottom: 1.5px solid #9eabff;
`;

const ReviewContainer = styled.div`
  width: 1146.11px;
  height: 576.41px;
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1.00654px solid #9eabff;
  box-shadow: 2.6841px 2.6841px 6.71024px rgba(0, 0, 0, 0.18);
  border-radius: 13.4205px;
  /* border: 1px solid red; */
`;

const ReviewBox = styled.div`
  /* gap: 1rem;
  margin: 10px 0;  */
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ReviewLabel = styled.label`
  font-weight: 700;
  font-size: 11.4074px;
  color: #6478ff;
  margin-top: 50px;
  margin-bottom: 10px;
  margin-left: 60px;
`;

const InputAndBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid yellow; */
`;

const ReviewInput = styled.textarea`
  width: 1026px;
  height: 75.15px;
  background: #eef1ff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  font-weight: 500;
  font-size: 14.0915px;
  color: #595959;
  padding: 20px;
  border: none;
  margin-bottom: 20px;
  resize: none;
  overflow-y: scroll;
  overflow-x: 'hidden';
  &::placeholder {
    font-weight: 500;
    font-size: 14.0915px;
    color: #595959;
  }
`;

const ReviewButton = styled.button`
  width: 185.87px;
  height: 34.22px;
  background: #6478ff;
  box-shadow: 2.6841px 2.6841px 6.71024px rgba(0, 0, 0, 0.15);
  border-radius: 9.39433px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-weight: 500;
  font-size: 15.2768px;
  margin-bottom: 20px;
`;

const ReviewBoxList = styled.div`
  display: flex;
  /* width: 1146.11px; */
  /* height: 327px; */
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  overflow: hidden;
  /* border: 1px solid blue; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;
