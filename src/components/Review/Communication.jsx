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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useNotification from '../../hooks/useNotification'; // 알람관련코드1
import styled from 'styled-components';

const Communication = () => {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');
  const params = useParams();
  const [alarmMsg, setAlarmMsg] = useState(''); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행

  console.log(loginUser);
  // const settings = {
  //   slide: <ReviewBoxList />, // slide 해주고 싶은 단위
  //   infinite: true, //무한 슬라이더로 할지
  //   speed: 500,
  //   arrows: true, //화살표 (양옆 버튼) 구현할 것인지
  //   autoplay: true, //자동 재생 할 것인지
  //   autoplaySpeed: 5000,
  //   slidesToShow: 1, // 한번에 몇개 슬라이드 보여줄 것인지
  //   slidesToScroll: 1,
  //   centerMode: true,
  //   variableWidth: true,
  //   centerPadding: '0px',
  // };

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  // };

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
    const Kakaologinid = localStorage.getItem('id');
    const Naverloginid = localStorage.getItem('id');
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
      const addRev2 = await addDoc(usersCollectionRef, {
        review: newReview,
        uid: localStorage.getItem('id'),
        displayName: localStorage.getItem('id'),
        //loginUser?.displayName
        paramId: params.id,
        date: Date.now(),
        //파이어스토어 db, reviews 에 저장
      });
      setNewReview('');
    } else if (Naverloginid) {
      const addRev3 = await addDoc(usersCollectionRef, {
        review: newReview,
        uid: localStorage.getItem('id'),
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
        {/* <Slider {...settings}> */}
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
        {/* </Slider> */}
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
  width: 1710px;
  height: 800px;
  /* width: 100%; */
  display: flex;

  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid red;
`;

const ReviewBox = styled.div`
  /* gap: 1rem;
  margin: 10px 0;  */

  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const ReviewLabel = styled.label`
  font-weight: 700;
  font-size: 16.5327px;
  color: #6478ff;
  margin-bottom: 20px;
  margin-left: 90px;
`;

const InputAndBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewInput = styled.textarea`
  width: 90%;
  height: 112px;
  background: #eef1ff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  font-weight: 500;
  font-size: 21px;
  color: #595959;
  padding: 20px;
  border: none;
  margin-bottom: 20px;
  resize: none;
  overflow-y: scroll;
  overflow-x: 'hidden';
  &::placeholder {
    font-weight: 500;
    font-size: 21px;
    color: #595959;
  }
`;

const ReviewButton = styled.button`
  width: 277px;
  height: 51px;
  background: #6478ff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-weight: 500;
  font-size: 22.7664px;
  margin-bottom: 20px;
`;

const ReviewBoxList = styled.div`
  border: 1px solid blue;
  display: flex;
  height: 450px;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  overflow: hidden;
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

//700 //100// 250 //350// div나눔

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
}
