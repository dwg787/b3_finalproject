import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../../apis/firebase';
import Loader from '../Loader/Loader';

export default function RestaurantLiked({
  spotData,
  restaurantDetailData,
  stayDetailData,
}: UserProps): React.ReactElement {
  const combinedData = {
    ...spotData,
    ...restaurantDetailData,
    ...stayDetailData,
  };

  // const addLiked = async () => {

  //   const uid = auth.currentUser.uid;
  //   const docRef = doc(collection(db, 'Liked'));

  //     await getDoc(docRef)
  //       .then((doc) => {

  //         if (!doc.exists()) {
  //           setDoc(docRef, {
  //             restaurant: combinedData.title,
  //             uid: uid,
  //             img: combinedData.firstimage,
  //             contentid: combinedData.contentid,
  //             date: Date.now(),
  //             contenttypeid: combinedData.contenttypeid,
  //           });
  //         }
  //       })
  //       .catch((e) => console.log(e));

  //     await updateDoc(docRef, {
  //       restaurant: combinedData.title,
  //       uid: uid,
  //       img: combinedData.firstimage,
  //       contentid: combinedData.contentid,
  //       date: Date.now(),
  //       contenttypeid: combinedData.contenttypeid,
  //     }).catch((e) => console.log(e));

  //   }
  // };
  const param = useParams();
  const [Liked, setLiked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const uid = auth.currentUser.uid;

  // const getLiked = async () => {
  //   const q = query(collection(db, 'Liked'), where('uid', '==', uid));
  //   const data = await getDocs(q);
  //   const newData = data.docs.map((doc) => ({
  //     ...doc.data(),
  //   }));
  //   setLiked(newData);
  //   console.log(newData);
  // };
  const getLiked = async () => {
    if (param.id) {
      const data = await getDoc(doc(db, 'Liked', `${param.id}`));
      return data.data();
    } else {
      return;
    }
  };

  const updateLiked = async () => {
    if (param.id) {
      await updateDoc(doc(db, 'Liked', param.id), {
        viewCnt: increment(1),
      });
    }
  };

  const saveLiked = async (combinedData) => {
    if (param.id) {
      await setDoc(doc(db, 'Liked', param.id), {
        ...combinedData,
        viewCnt: 1,
      });
    }
  };

  useEffect(() => {
    const getFirestoreLiked = async () => {
      const res = await getLiked();
      if (res) {
        updateLiked();
      } else {
        if (combinedData) saveLiked(combinedData);
      }
    };
    getFirestoreLiked();
  }, [combinedData]);

  return (
    <div>
      <button onClick={getLiked}>좋아요</button>
      {/* {Liked.map((data, i) => {})} */}
    </div>
  );
}
