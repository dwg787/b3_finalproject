import { doc, updateDoc, setDoc, getDoc, collection } from "firebase/firestore";
import React from "react";
import { auth, db } from "../../apis/firebase";

export default function StayLiked({
  stayDetailData,
}: UserProps): React.ReactElement {
  // const uid = auth.currentUser.uid;
  // console.log(uid);

  const addStayLiked = async () => {
    //유저 아이디 가져오기
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, "staylike"));

    // 유저 컬렉션이 존재하는지 확인
    await getDoc(docRef)
      .then((doc) => {
        // 없으면 새로 생성
        if (!doc.exists()) {
          setDoc(docRef, {
            stay: stayDetailData.title,
            uid: uid,
            img: stayDetailData.firstimage,
            contentid: stayDetailData.contentid,
          });
        }
      })
      .catch((e) => console.log(e));
    await updateDoc(docRef, {
      stay: stayDetailData.title,
      uid: uid,
      img: stayDetailData.firstimage,
      contentid: stayDetailData.contentid,
    }).catch((e) => console.log(e));
    alert("StayLike저장");
  };

  return (
    <div>
      {/* 버튼 이모지 임의 지정 */}
      <button onClick={addStayLiked}>Like❤️</button>
    </div>
  );
}
