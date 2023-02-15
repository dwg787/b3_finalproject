import { doc, updateDoc, setDoc, getDoc, collection } from "firebase/firestore";
import React from "react";
import { auth, db } from "../../apis/firebase";

export default function RestaurantLiked({
  restaurantDetailData,
}: UserProps): React.ReactElement {
  // const uid = auth.currentUser.uid;

  const addRestaurantLiked = async () => {
    console.log(restaurantDetailData);
    //유저 아이디 가져오기
    const uid = auth.currentUser.uid;
    const docRef = doc(collection(db, "restaurantlike"));

    // 유저 컬렉션이 존재하는지 확인
    await getDoc(docRef)
      .then((doc) => {
        // 없으면 새로 생성
        if (!doc.exists()) {
          setDoc(docRef, {
            restaurant: restaurantDetailData.title,
            uid: uid,
            img: restaurantDetailData.firstimage,
            contentid: restaurantDetailData.contentid,
          });
        }
      })
      .catch((e) => console.log(e));
    await updateDoc(docRef, {
      restaurant: restaurantDetailData.title,
      uid: uid,
      img: restaurantDetailData.firstimage,
      contentid: restaurantDetailData.contentid,
    }).catch((e) => console.log(e));
    alert("Like저장");
  };

  return (
    <div>
      {/* 버튼 이모지 임의 지정 */}
      <button onClick={addRestaurantLiked}>Like❤️</button>
    </div>
  );
}
