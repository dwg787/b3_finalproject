import React, { useState } from 'react';
import {
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
  collection,
} from 'firebase/firestore';
import { auth, db } from '../../apis/firebase';
import styled from 'styled-components';

const Ticketing = ({ stayDetailData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState();
  const [termDate, setTermDate] = useState();

  const handleSubmit = async (e) => {
    //유저 아이디 가져오기
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, 'reservations'));

    // 유저 컬렉션이 존재하는지 확인
    await getDoc(docRef)
      .then((doc) => {
        // 없으면 새로 생성
        if (!doc.exists()) {
          setDoc(docRef, {
            title: stayDetailData.title,
            count: quantity,
            startDate: startDate,
            termDate: termDate,
            name: name,
            email: email,
            uid: uid,
            img: stayDetailData.firstimage,
            contentid: stayDetailData.contentid,
          });
        }
      })
      .catch((e) => console.log(e));
    await updateDoc(docRef, {
      title: stayDetailData.title,
      count: quantity,
      startDate: startDate,
      termDate: termDate,
      name: name,
      email: email,
      uid: uid,
      img: stayDetailData.firstimage,
      contentid: stayDetailData.contentid,
    }).catch((e) => console.log(e));
    alert(
      `${quantity} 장의 티켓이 ${startDate}~${termDate}로 예약되었습니다 ${name} 님 (${email}) 로 ${stayDetailData.title}예약발송 되셧습니다`,
    );
  };

  return (
    <StTicketingWrap>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">이름 : </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="email">이메일 : </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="quantity">숙박인원 : </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br />
        <label htmlFor="start">시작일</label>
        <input
          id="start"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br />
        <label htmlFor="term">종료일</label>
        <input
          id="term"
          type="date"
          value={termDate}
          onChange={(e) => setTermDate(e.target.value)}
        />
        <StButton>
          <Button>장바구니</Button>
          <Button>구매하기</Button>
        </StButton>
      </form>
    </StTicketingWrap>
  );
};

export default Ticketing;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
  font-size: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 10px;
  width: 100px;
  background-color: #6478ff;
  color: white;
  margin: 10px;
  cursor: pointer;
`;

const StButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const StTicketingWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;
