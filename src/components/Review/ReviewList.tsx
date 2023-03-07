import React from 'react';
import { collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db, auth } from '../../apis/firebase';
import styled from 'styled-components';
import { getDate } from '../../common/utils';
import useNotification from '../../hooks/useNotification';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Review {
  id: string;
  review: string;
  uid: string;
  email?: string;
  displayName: string;
  date: number;
  paramId: string;
}

interface ReviewListProps {
  review: Review;
  i: number;
  reviews: Review[];
  key: string;
}

export default function ReviewList({
  review,
  i,
  reviews,
  key,
}: ReviewListProps) {
  const [newReview, setNewReview] = useState<string>('');
  const [editBox, setEditBox] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(reviews[i].review);
  const loginUser = auth.currentUser;
  const usersCollectionRef = collection(db, 'reviews');
  const [toggle, setToggle] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>('수정');

  const [alarmMsg, setAlarmMsg] = useState<string>('');
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행

  const KakaoAndNaverLoginid = localStorage.getItem('uid');
  const Naverloginid = localStorage.getItem('uid');

  //삭제
  const handleDelete = async (id: string, i: number) => {
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
  const handleUpdate = async (id: string) => {
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
                  {editBox === false ? '수정' : '완료'}
                </UpdateBtn>
              ) : null}
              {(toggle === true && loginUser?.uid === review?.uid) ||
              (toggle === true &&
                localStorage.getItem('uid') === review?.uid) ? (
                <DeleteBtn
                  onClick={() => {
                    handleDelete(review.id, i);
                  }}
                >
                  삭제
                  {/* {!editBox ? '삭제' : null} */}
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
              maxLength={64}
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
  /* flex-wrap: wrap; */
  margin: 0 32.72px 0 37px;
  @media screen and (max-width: 820px) {
    margin-bottom: 10px;
  }
`;

const CommentBox = styled.div`
  width: 405.1px;
  height: 66.58px;

  background: #ffffff;
  box-shadow: 2.25685px 2.25685px 5.64213px rgba(0, 0, 0, 0.15);
  border-radius: 7.89898px;
  display: flex;
  flex-direction: column;
  &:hover {
    border: 1px solid #6478ff;
  }
  @media screen and (max-width: 820px) {
    width: 304px;
    height: 55px;
    box-shadow: 1.69289px 1.69289px 4.23224px rgba(0, 0, 0, 0.15);
    border-radius: 5.92513px;
  }

  /* margin: 0 32.72px 0 32.72px; */
`;

const NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  margin-left: 19.18px;
  margin-bottom: 0.95px;

  /* gap: 10px; */
  /* width: 450px; */
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 11.8485px;
  color: #595959;
  width: 35%;
  @media screen and (max-width: 820px) {
    width: 40%;
    font-weight: 700;
    font-size: 11px;
  }
`;

const Date = styled.div`
  font-weight: 500;
  font-size: 10.1558px;
  color: #979797;
  width: 300px;
  @media screen and (max-width: 820px) {
    width: 300px;
    font-weight: 500;
    font-size: 9px;
  }
`;

const ToggleWrap = styled.div`
  display: flex;
  position: relative;
  width: 90px;
  margin-right: 10px;
  margin-top: -5px;
  /* margin-top: -5px;
  margin-bottom: 5px; */

  /* border: 1px solid purple; */
  @media screen and (max-width: 820px) {
    margin-right: 20px;
    margin-top: -5px;
  }
`;

const BtnWrap = styled.div`
  background-color: #ececec;
  display: flex;
  align-items: center;
  border-radius: 5px;
  height: 20.72px;
  position: absolute;
  right: 10px;
  @media screen and (max-width: 820px) {
    position: absolute;
    right: -10px;
  }

  /* border: 1px solid red; */
`;
const UpdateBtn = styled.button`
  border: none;
  width: 40px;
  padding: 5px;
  background-color: transparent;
  border-right: 1px solid white;
  font-weight: 500;
  font-size: 10.0654px;
  color: #595959;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  border-radius: 60px;
  width: 40px;
  padding: 5px;
  border: none;
  background-color: transparent;
  font-weight: 500;
  font-size: 10.0654px;
  color: #595959;
  cursor: pointer;
`;

const ToggleBtn = styled.button`
  display: flex;
  border: none;
  background-color: transparent;
  position: absolute;
  left: 53px;
  top: -2px;
  height: 25px;
  cursor: pointer;
  @media screen and (max-width: 820px) {
    height: 25px;
    top: -4px;
    left: 50px;
  }
`;

const Toggle = styled(BsThreeDotsVertical)`
  color: #6478ff;
  margin-top: 5px;
`;

const Comment = styled.div`
  /* width: 100%;
  padding: 5px;
  height: 400px;
   */

  margin-top: 5px;
  margin-left: 19.18px;
`;

const RealComment = styled.p`
  font-weight: 500;
  font-size: 11.8485px;
  color: #595959;
  @media screen and (max-width: 820px) {
    font-size: 10px;
  }
`;

const EditInput = styled.input`
  font-weight: 500;
  font-size: 11.8485px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  color: #595959;

  border: none;
  &:focus {
    outline: 1px solid #6478ff;
  }
`;
