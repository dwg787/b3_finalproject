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
import { BsThreeDotsVertical } from 'react-icons/bs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ReviewList({ review, i, reviews, key }) {
  const [newReview, setNewReview] = useState('');
  const [editBox, setEditBox] = useState(false);
  const [editValue, setEditValue] = useState(reviews.review);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');
  const [toggle, setToggle] = useState(false);
  console.log(toggle);
  console.log('ed', editBox);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      >
        Next
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      >
        Prev
      </div>
    );
  }

  return (
    <CommentBoxWrap>
      <CommentBox key={review.id}>
        <NameAndDate>
          <Name>{review?.displayName}</Name>

          <Date>{getDate(review.date)} 작성</Date>

          <ToggleWrap>
            <BtnWrap>
              {toggle === true && loginUser?.uid === review?.uid ? (
                <UpdateBtn
                  onClick={() => {
                    handleUpdate(review.id);
                    setEditBox(!editBox);
                  }}
                >
                  {editBox === false ? '수정' : '수정완료'}
                </UpdateBtn>
              ) : null}
              {toggle === true && loginUser?.uid === review?.uid ? (
                <DeleteBtn
                  onClick={() => {
                    setAlarmMsg('리뷰 삭제완료!'); //알람관련 코드4 - 들어갈 내용 정하는 부분
                    addNoti(); //알람관련 코드5 - useNotification 커스텀 훅 내의 addNoti 함수 실행
                    handleDelete(review.id, i);
                  }}
                >
                  {!editBox ? '삭제' : null}
                </DeleteBtn>
              ) : null}
            </BtnWrap>
            <ToggleBtn
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <Toggle />
            </ToggleBtn>
          </ToggleWrap>
        </NameAndDate>
        <Comment>
          {!editBox ? (
            <RealComment>{review?.review}</RealComment>
          ) : (
            <input
              placeholder={review?.review}
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            />
          )}
        </Comment>
      </CommentBox>
    </CommentBoxWrap>
  );
}

const CommentBoxWrap = styled.div`
  flex-wrap: wrap;
`;

const CommentBox = styled.div`
  /* width: 100%;
  justify-content: center;
  gap: 1rem;
  display: flex; */
  width: 618px;
  height: 118px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Name = styled.div`
  font-size: 21px;
  font-weight: 700;
  color: #595959;
`;

const Date = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #979797;
`;

const ToggleWrap = styled.div`
  display: flex;
  margin-left: 241px;

  position: relative;
`;

const BtnWrap = styled.div`
  background-color: #ececec;
  display: flex;
  align-items: center;
  border-radius: 5px;

  position: absolute;
  width: 80px;
  left: 3px;
`;
const UpdateBtn = styled.button`
  border: none;
  padding: 5px;
  background-color: transparent;
  border-right: 1px solid white;
`;

const DeleteBtn = styled.button`
  border-radius: 60px;
  padding: 5px;

  border: none;
  background-color: transparent;
`;

const ToggleBtn = styled.button`
  border: none;
  background-color: transparent;
`;

const Toggle = styled(BsThreeDotsVertical)`
  color: #6478ff;
  top: 5px;
  position: absolute;
  left: 90px;
`;

const Comment = styled.div`
  font-weight: 500;
  font-size: 21px;
  color: #595959;
  margin-top: 30px;
`;

const RealComment = styled.p`
  font-weight: 500;
  font-size: 21px;
  color: #595959;
`;
