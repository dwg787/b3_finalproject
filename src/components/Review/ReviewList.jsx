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
  // console.log(toggle);
  // console.log('ed', editBox);
  // console.log(localStorage.getItem('uid'));

  const [alarmMsg, setAlarmMsg] = useState(''); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행

  const KakaoAndNaverLoginid = localStorage.getItem('uid');
  const Naverloginid = localStorage.getItem('uid');

  //삭제
  const handleDelete = async (id, i) => {
    console.log(id);
    if (auth.currentUser?.uid === reviews[i].uid) {
      const reviewDoc = doc(usersCollectionRef, id);
      //파이어스토어, 안에있는 컬렉션 'reviews' 의 문서 id
      await deleteDoc(reviewDoc);
    } else if (KakaoAndNaverLoginid === reviews[i].uid) {
      const reviewDoc = doc(usersCollectionRef, id);
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
    <CommentBoxWrap>
      <CommentBox key={review.id}>
        <NameAndDate>
          <Name>{review?.displayName}</Name>

          <Date>{getDate(review.date)} 작성</Date>

          <ToggleWrap>
            <BtnWrap>
              {(toggle === true && loginUser?.uid === review?.uid) ||
              (toggle === true &&
                localStorage.getItem('uid') === review?.uid) ? (
                <UpdateBtn
                  onClick={() => {
                    handleUpdate(review.id);
                    setEditBox(!editBox);
                  }}
                >
                  {editBox === false ? '수정' : '수정완료'}
                </UpdateBtn>
              ) : null}
              {(toggle === true && loginUser?.uid === review?.uid) ||
              (toggle === true &&
                localStorage.getItem('uid') === review?.uid) ? (
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
            <EditInput
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
  //========================
  /* width: 481.8px; */
  width: 30.1125rem;
  //퍼센트로 해야할듯
  //공백 포함 71글자까지
  height: 79.18px;
  background: #ffffff;
  box-shadow: 2.6841px 2.6841px 6.71024px rgba(0, 0, 0, 0.15);
  border-radius: 9.39433px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  /* width: 100%; */
  width: 450px;
  /* border: 1px solid red; */
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 14.0915px;
  color: #595959;
  width: 82px;
  /* border: 1px solid purple; */
`;

const Date = styled.div`
  font-weight: 500;
  font-size: 12.0784px;
  color: #979797;
  width: 300px;
  /* margin-left: 50px; */
  /* border: 1px solid aqua; */
`;

const ToggleWrap = styled.div`
  display: flex;
  position: relative;
  width: 90px;
  margin-top: -5px;
  margin-bottom: 5px;
  /* border: 1px solid blue; */
  /* margin-left: 241px; */
  /* position: relative; */
`;

const BtnWrap = styled.div`
  background-color: #ececec;
  display: flex;
  align-items: center;
  border-radius: 5px;
  height: 20.72px;
  /* border: 1px solid green; */
  /* position: absolute;
  width: 80px;
  left: 3px; */
`;
const UpdateBtn = styled.button`
  border: none;
  padding: 5px;
  background-color: transparent;
  border-right: 1px solid white;
  font-weight: 500;
  font-size: 10.0654px;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  border-radius: 60px;
  padding: 5px;
  border: none;
  background-color: transparent;
  font-weight: 500;
  font-size: 10.0654px;
  cursor: pointer;
`;

const ToggleBtn = styled.button`
  display: flex;
  border: none;
  background-color: transparent;
  position: absolute;
  left: 65px;
  top: -2px;
  height: 25px;
  cursor: pointer;
  /* border: 1px solid red; */
`;

const Toggle = styled(BsThreeDotsVertical)`
  color: #6478ff;
  /* top: 5px;
  position: absolute;
  left: 80px; */
  margin-top: 5px;
`;

const Comment = styled.div`
  /* margin-top: 10px; */
  width: 100%;
  padding: 5px;
  height: 400px;
  margin-left: -5px;
  /* border: 1px solid red; */
`;

const RealComment = styled.p`
  font-weight: 500;
  font-size: 14.0915px;
  color: #595959;
`;

const EditInput = styled.input`
  font-weight: 500;
  font-size: 14.0915px;
  color: #595959;
`;
