import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { auth, db } from "../../apis/firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

const MyFavDetail = ({ title, getLiked }) => {
  const uid = auth.currentUser.uid;

  // 파이어베이스에 저장한 배열의 타이틀을 삭제해보자->이걸 delbookmark안으로?
  const delLiked = async () => {
    const docRef = doc(db, "bookmarks", uid);
    console.log(docRef);

    await updateDoc(docRef, {
      bookmarks: arrayRemove(title),
    });
  };

  console.log(title);

  return (
    <StFavDetail>
      <h2>{title}</h2>
      <button
        onClick={() => {
          delLiked()
            .then(() => {
              window.alert("Like 삭제 완료");
              getLiked();
            })
            .catch((e) => console.log(e));
        }}
      >
        삭제
      </button>
    </StFavDetail>
  );
};

export default MyFavDetail;

const StFavDetail = styled.div`
  display: flex;
  margin: 10px;
  width: 200px;
  height: 100px;
  border: 1px solid black;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;
