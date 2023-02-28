import {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  collection,
  arrayUnion,
  arrayRemove,
  increment,
  DocumentData,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../apis/firebase';
import useNotification from '../../hooks/useNotification';
import heart from '../../assets/heart.avif';
import redheart from '../../assets/redheart.avif';
import { useParams } from 'react-router-dom';
import { DetailDataTypes } from '../../types/apiDataTypes';
// import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
// import { useRecoilValue } from 'recoil';
// import { paramTransfer } from '../../recoil/apiDataAtoms';

export default function RestaurantLiked({
  restaurantDetailData,
}: {
  restaurantDetailData: DetailDataTypes;
}): React.ReactElement {
  const param = useParams();
  //좋아요 클릭시 하트 색상 변화
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //좋아요 클릭시 팝업창으로 알람뜨게해줌
  const [alarmMsg, setAlarmMsg] = useState('찜하기 추가!');
  const { addNoti } = useNotification(alarmMsg); //토스트 메시지 띄우는 커스텀훅
  const uid = sessionStorage.getItem('uid');

  const combinedData = {
    ...restaurantDetailData,
  };

  const fetchBookmarkData = async () => {
    if (uid) {
      const docRef = doc(collection(db, 'bookmarks'), uid);
      const res = await getDoc(docRef);
      return res.data();
    }
  };

  useEffect(() => {
    const bookmarkData = async () => {
      setIsLoading(true);
      const res = await fetchBookmarkData();
      const myBookmark = new Set(res?.contentid);
      const likeTarget = myBookmark.has(param.id);
      setIsLiked(likeTarget);
      setIsLoading(false);
    };
    bookmarkData();
  }, []);

  const handleLiked = async () => {
    // const uid = auth.currentUser.uid;
    if (uid && param.id) {
      const restaurantDocRef = doc(db, 'restaurant_recommendation', param.id);
      const docRef = doc(collection(db, 'bookmarks'), uid);
      if (isLiked) {
        setAlarmMsg('찜하기 추가!');
        setIsLiked(false);
        await getDoc(docRef).then((doc: DocumentData) => {
          const TargetBookmark = doc
            .data()
            .bookmarks.find(
              (e: { contentid: string | undefined }) =>
                e.contentid === param.id,
            );
          if (doc.exists()) {
            updateDoc(docRef, {
              bookmarks: arrayRemove(TargetBookmark),
              contentid: arrayRemove(combinedData.contentid),
            });
            updateDoc(restaurantDocRef, {
              // likeCnt: arrayRemove(`${uid}`), //좋아요 한 사람 배열에서 제거
              likeCnt: increment(-1),
            });
          }
        });
      } else {
        setAlarmMsg('찜하기 제거!');
        setIsLiked(true);
        await getDoc(docRef)
          .then((doc) => {
            if (!doc.exists()) {
              setDoc(docRef, {
                bookmarks: arrayUnion({
                  restaurant: combinedData.title,
                  img: combinedData.firstimage,
                  contentid: combinedData.contentid,
                  date: Date.now(),
                  contenttypeid: combinedData.contenttypeid,
                  addr1: combinedData.addr1,
                  // uid: uid,
                }),
                contentid: arrayUnion(combinedData.contentid),
              });
              updateDoc(restaurantDocRef, {
                // likeCnt: arrayUnion(`${uid}`), //좋아요 한 사람이 누군지 알 수 있도록 배열
                likeCnt: increment(1),
              });
            } else {
              updateDoc(docRef, {
                bookmarks: arrayUnion({
                  restaurant: combinedData.title,
                  img: combinedData.firstimage,
                  contentid: combinedData.contentid,
                  date: Date.now(),
                  contenttypeid: combinedData.contenttypeid,
                  addr1: combinedData.addr1,
                  // uid: uid,
                }),
                contentid: arrayUnion(combinedData.contentid),
              });
              updateDoc(restaurantDocRef, {
                // likeCnt: arrayUnion(`${uid}`), //좋아요 한 사람이 누군지 알 수 있도록 배열
                likeCnt: increment(1),
              });
            }
          })
          .catch((e) => console.log(e));
      }
    }
    addNoti(); //메시지 창 자체를 띠워주는 함수
  };

  return (
    <div>
      {uid ? (
        <>
          {isLoading ? (
            <></>
          ) : (
            <HeartBtn onClick={handleLiked}>
              {isLiked ? <Heart src={redheart} /> : <Heart src={heart} />}
              {/* {isLiked ? (
                <AiFillHeart fontSize="27.09px" />
              ) : (
                <AiOutlineHeart fontSize="27.09px" />
              )} */}
            </HeartBtn>
          )}
        </>
      ) : (
        <>
          <HeartBtn
            onClick={() => alert('로그인하셔야 이용하실 수 있는 기능입니다.')}
          >
            {isLiked ? <Heart src={redheart} /> : <Heart src={heart} />}
            {/* {isLiked ? (
              <AiFillHeart fill="red" fontSize="27.09px" />
            ) : (
              <AiOutlineHeart fontSize="27.09px" />
            )} */}
          </HeartBtn>
        </>
      )}
    </div>
  );
}

const HeartBtn = styled.button`
  border: none;
  background-color: #fff;
`;

const Heart = styled.img`
  width: 27.09px;
  margin-top: 13px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;