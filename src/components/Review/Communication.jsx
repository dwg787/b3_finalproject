import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

import React, { useState, useEffect } from 'react';
import { db, auth } from '../../apis/firebase';
import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useNotification from '../../hooks/useNotification'; // 알람관련코드1
import styled from 'styled-components';
import Pagination from 'react-js-pagination';

const Communication = () => {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');
  const params = useParams();
  const [alarmMsg, setAlarmMsg] = useState(''); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalReviewCount, setTotalReviewCount] = useState(0);

  // 화면이 처음 렌더링 할때 데이터를 가져옴
  useEffect(() => {
    const getReviews = async () => {
      const q = query(usersCollectionRef, orderBy('date', 'desc'));
      const unsubscrible = onSnapshot(q, (querySnapshot) => {
        const newList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredList = newList.filter(
          (review) => review.paramId === params.id,
        );
        setReviews(filteredList);
        setTotalReviewCount(filteredList.length);
      });
      return unsubscrible;
    };
    getReviews();
  }, []);

  const creatReview = async (event) => {
    const Kakaologinid = localStorage.getItem('uid');
    const Naverloginid = localStorage.getItem('uid');
    const loginUser = auth.currentUser;
    const inputValue = event.target.value;
    if (!newReview || newReview.length === 0) {
      alert('리뷰를 입력해주세요.');
    } else if (loginUser) {
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
        paramId: params.id,
        date: Date.now(),
      });
      setNewReview('');
    } else if (Naverloginid) {
      const addRev = await addDoc(usersCollectionRef, {
        review: newReview,
        uid: localStorage.getItem('uid'),
        displayName: localStorage.getItem('id'),
        paramId: params.id,
        date: Date.now(),
      });
      setNewReview('');
    } else {
      alert('로그인 해주세요');
    }
  };

  return (
    <ReviewContainerWrap>
      <ReviewContainer>
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
              onClick={(event) => {
                // setAlarmMsg('리뷰가 등록되었습니다.'); //알람관련 코드4 - 들어갈 내용 정하는 부분
                // addNoti(); //알람관련 코드5 - useNotification 커스텀 훅 내의 addNoti 함수 실행
                creatReview(event);
              }}
            >
              등록
            </ReviewButton>
            <BottomLine />
          </InputAndBtnWrap>
        </ReviewBox>

        <ReviewBoxList>
          {reviews
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((review, i) => {
              if (review.paramId === params.id) {
                // 상세페이지 params.id와 리뷰의  paramId가 같은것만 보여주기
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
        </ReviewBoxList>
        <PaginationBox>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalReviewCount}
            pageRangeDisplayed={5}
            onChange={setCurrentPage}
            hideDisabled={true}
            hideNavigation={true}
            hideFirstLastPages={true}
          />
        </PaginationBox>
      </ReviewContainer>
    </ReviewContainerWrap>
  );
};

export default Communication;

const ReviewContainerWrap = styled.div`
  border: 1.00654px solid #9eabff;
  width: 1146.11px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 2.6841px 2.6841px 6.71024px rgba(0, 0, 0, 0.18);
  border-radius: 13.4205px;
`;

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;

    height: 30px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 9px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 14.34px;
    margin: 6.6px;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #909090;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: #6478ff;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #6478ff;
  }
`;

const BottomLine = styled.div`
  width: 95%;
  border-bottom: 1.5px solid #9eabff;
`;

const ReviewContainer = styled.div`
  width: 1146.11px;
  height: 576.41px;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  border-radius: 13.4205px;
`;

const ReviewBox = styled.div`
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
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  overflow: hidden;
`;
