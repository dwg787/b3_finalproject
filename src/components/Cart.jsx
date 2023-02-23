import React from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
  collection,
} from "firebase/firestore";

import styled from "styled-components";
import { auth, db } from "../apis/firebase";

const Cart = ({ stayDetailData }) => {
  const addCart = async (e) => {
    //유저 아이디 가져오기
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, "carts"));

    // 유저 컬렉션이 존재하는지 확인
    await getDoc(docRef)
      .then((doc) => {
        // 없으면 새로 생성
        if (!doc.exists()) {
          setDoc(docRef, {
            carts: stayDetailData.title,
            uid: uid,
            img: stayDetailData.firstimage,
            contentid: stayDetailData.contentid,
          });
        }
      })
      .catch((e) => console.log(e));
    await updateDoc(docRef, {
      carts: stayDetailData.title,
      uid: uid,
      img: stayDetailData.firstimage,
      contentid: stayDetailData.contentid,
    }).catch((e) => console.log(e));
    alert("장바구니 저장 완료");
  };

  return (
    <>
      <div>
        {/* 버튼 이모지 임의 지정 */}
        <button onClick={addCart}>장바구니🛒</button>
        {/* 장바구니에 넣어놓고 예약페이지로 가게하는게 나을듯 */}
      </div>
    </>
  );
};

export default Cart;
