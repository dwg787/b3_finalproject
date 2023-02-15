import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import React from "react";

import { auth, db } from "../../apis/firebase";

export default function Liked({ spotData }: UserProps): React.ReactElement {
  // const uid = auth.currentUser.uid;
  // console.log(uid);

  const addLiked = async () => {
    //유저 아이디 가져오기
    const uid = auth.currentUser.uid;
    const docRef = doc(db, "bookmarks", uid);

    // 유저 컬렉션이 존재하는지 확인
    await getDoc(docRef)
      .then((doc) => {
        // 없으면 새로 생성
        if (!doc.exists()) {
          setDoc(docRef, {
            uid: uid,
            bookmarks: [],
          });
        }
      })
      .catch((e) => console.log(e));
    await updateDoc(docRef, {
      bookmarks: arrayUnion(spotData.title),
    }).catch((e) => console.log(e));
    window.alert("like 저장");
  };

  return (
    <div>
      {/* 버튼 이모지 임의 지정 */}
      <button onClick={addLiked}>Like❤️</button>
    </div>
  );
}
