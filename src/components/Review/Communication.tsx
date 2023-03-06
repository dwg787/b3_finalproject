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

interface Review {
  id: string;
  review: string;
  uid: string;
  email?: string;
  displayName: string;
  date: number;
  paramId: string;
}

const Communication = () => {
  const [newReview, setNewReview] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');
  const params = useParams<{ id: string }>();
  const [alarmMsg, setAlarmMsg] = useState<string>(''); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [totalReviewCount, setTotalReviewCount] = useState<number>(0);

  // 화면이 처음 렌더링 할때 데이터를 가져옴
  useEffect(() => {
    const getReviews = async () => {
      const q = query(usersCollectionRef, orderBy('date', 'desc'));
      const unsubscrible = onSnapshot(q, (querySnapshot) => {
        const newList: Review[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          review: doc.data().review,
          uid: doc.data().uid,
          displayName: doc.data().displayName,
          date: doc.data().date,
          paramId: doc.data().paramId,
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

  const creatReview = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const Kakaologinid = localStorage.getItem('uid');
    const Naverloginid = localStorage.getItem('uid');
    const loginUser = auth.currentUser;
    const inputValue = event.currentTarget.value;
    if (!newReview || newReview.length === 0) {
      alert('리뷰를 입력해주세요.');
    } else if (loginUser) {
      const addRev = await addDoc(usersCollectionRef, {
        review: newReview,
        uid: loginUser?.uid,
        email: loginUser.email,
        displayName: localStorage.getItem('id'),
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
          <ReviewLabel htmlFor="review">후기작성</ReviewLabel>
          <InputAndBtnWrap>
            <ReviewInput
              id="review"
              maxLength={64}
              value={newReview}
              placeholder="리뷰를 입력하세요. 최대 64 글자"
              onChange={(event) => {
                setNewReview(event.target.value);
              }}
            />

            <ReviewButton
              onClick={(event) => {
                event.preventDefault();
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
                    key={review.id}
                    reviews={reviews}
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
  width: 964px;
  height: 504px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 2.25685px 2.25685px 5.64213px rgba(0, 0, 0, 0.18);
  border-radius: 11.2843px;
  @media screen and (max-width: 820px) {
    width: 340px;
    height: 460px;
    box-shadow: 0.795985px 0.795985px 1.98996px rgba(0, 0, 0, 0.18);
    border-radius: 3.97992px;
  }
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
    width: 10px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 14.3151px;
    /* margin: 6.6px; */
    margin: 0 6.6px 0px 6.6px;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #909090;
    font-weight: 700;
    font-size: 14.3151px;
    margin-bottom: 10px;
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
  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

const ReviewContainer = styled.div`
  width: 964px;
  height: 504px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  @media screen and (max-width: 820px) {
    width: 340px;
    height: 460px;
  }
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ReviewLabel = styled.label`
  font-weight: 700;
  font-size: 9.59162px;
  color: #6478ff;
  margin-top: 48.52px;
  margin-bottom: 15px;
  margin-left: 50px;
  @media screen and (max-width: 820px) {
    margin-left: 20px;
    font-size: 8px;
  }
`;

const InputAndBtnWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewInput = styled.input`
  width: 862.68px;
  height: 63.19px;
  background: #eef1ff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  font-weight: 500;
  font-size: 11.8485px;
  color: #595959;
  padding: 0 20px 10px 20px;
  border: none;
  margin-top: -10px;
  margin-bottom: 20px;
  resize: none;
  overflow-y: scroll;
  overflow-x: 'hidden';
  &::placeholder {
    font-weight: 500;
    font-size: 11.8485px;
    color: #595959;
  }
  &:focus {
    outline: 1px solid #6478ff;
  }
  @media screen and (max-width: 820px) {
    box-shadow: 0.795985px 0.795985px 1.98996px rgba(0, 0, 0, 0.15);
    border-radius: 2.78595px;
    width: 304px;
    height: 66px;
    font-size: 10px;

    resize: none;

    &::placeholder {
      font-size: 10px;
    }
  }
`;

const ReviewButton = styled.button`
  width: 156.29px;
  height: 28.77px;
  background: #6478ff;
  box-shadow: 2.6841px 2.6841px 6.71024px rgba(0, 0, 0, 0.15);
  border-radius: 9.39433px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-weight: 500;
  font-size: 12.8451px;
  margin-bottom: 20px;
  @media screen and (max-width: 820px) {
    width: 160px;
    height: 39px;
    box-shadow: 2.1118px 2.1118px 5.27949px rgba(0, 0, 0, 0.18);
    border-radius: 9px;
    font-size: 15px;
  }
`;

const ReviewBoxList = styled.div`
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  /* justify-content: center; */
  /* gap: 20px; */
  /* align-items: center; */
  /* border: 1px solid red; */
  margin-left: 5px;
  overflow: hidden;
  @media screen and (max-width: 820px) {
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    margin: 0;
  }
`;
