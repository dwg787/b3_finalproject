import {
  arrayRemove,
  collection,
  getDocs,
  getDoc,
  query,
  updateDoc,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../../apis/firebase';
import Loader from '../Loader/Loader';
import noimg from '../../assets/noimg.avif';
import { Link, useNavigate } from 'react-router-dom';
import { combinedAllData } from '../../apis/publicAPI';

const MyLikeList = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState([]);
  const uid = auth.currentUser.uid;

  const getRestaurantLiked = async () => {
    // const q = query(collection(db, 'bookmarks'), uid);
    const myBookmarkData = await getDoc(doc(db, 'bookmarks', uid));
    // const newData = data.docs.map((doc) => ({
    //   ...doc.data(),
    // }));
    console.log('파베 북마크 데이터', myBookmarkData.data());
    if (myBookmarkData) {
      setRestaurant(myBookmarkData.data());
    }
  };

  useEffect(() => {
    getRestaurantLiked();
    // getEachItemAllLikesCount();
  }, []);

  //   if (isLoading) {
  //     return <Loader />;
  //   }

  // 파이어베이스에 저장한 배열의 타이틀을 삭제해보자
  const delResLiked = async (targetId) => {
    console.log('삭제버튼 누른 타겟', targetId);
    if (restaurant) {
      console.log('내 북마크 정보', restaurant);
      const docRef = doc(db, 'bookmarks', uid);
      // console.log('docRef의 인덱스', docRef.data());
      const restaurantDocRef = doc(db, 'restaurant_recommendation', targetId);
      // console.log('docRef의 id??', docRef.id);
      const TargetBookmark = restaurant.bookmarks.find(
        (e) => e.contentid === targetId,
      );
      await deleteDoc(docRef, {
        bookmarks: arrayRemove(TargetBookmark),
        contentid: arrayRemove(targetId),
      }).then(
        updateDoc(restaurantDocRef, {
          likeCnt: arrayRemove(`${uid}`),
        }),
      );
    }
    getRestaurantLiked();
  };

  //   한 관광지 or 숙박 or 음식점의 좋아요 총 갯수
  //   const getEachItemAllLikesCount = async () => {
  //     const q = query(
  //       collection(db, 'bookmarks'),
  //       //   where('contentid', 'array-contains', '1622544'),
  //     );
  //     console.log('q값?', q);
  //     const data = await getDocs(q);
  //     const allData = data.docs.map((doc) => ({
  //       ...doc.data(),
  //     }));
  //     setRestaurant(allData);
  //     console.log('전체 유저의 좋아요 데이터', allData);
  //   };

  //   const deleteRestaurantLiked = async () => {
  //     const uid = auth.currentUser.uid;
  //     const query = query(
  //       collection(db, 'restaurantlike'),
  //       where('uid', '==', uid),
  //       where('contentid', '==', combinedAllData.contentid),
  //     );
  //     const querySnapshot = await getDocs(query);
  //     await Promise.all(
  //       querySnapshot.docs.map(async (doc) => {
  //         await deleteDoc(doc.ref).catch((e) => console.log(e));
  //       }),
  //     );
  //   };

  return (
    <>
      <StTicketWrap>
        <StTicket>
          {restaurant &&
            restaurant?.bookmarks?.map((data) => {
              // console.log('jsx에서 받은 데이터', data);
              switch (data.contenttypeid) {
                case '39':
                  return (
                    <StTicketCard key={data.contentid}>
                      <StTicketCardLeft>
                        <StTicketHeader>
                          <StCartMenu>음식점</StCartMenu>
                          <StDeleteBtn
                            onClick={() => delResLiked(data.contentid)}
                          >
                            X
                          </StDeleteBtn>
                        </StTicketHeader>
                        <StMyTicketImage
                          src={data.img || noimg}
                          alt="사진"
                          onClick={() =>
                            navigate(`/restaurant/${data.contentid}`)
                          }
                        />
                      </StTicketCardLeft>
                      <StCartTitle>{data.restaurant.split('[', 1)}</StCartTitle>
                    </StTicketCard>
                  );
                case '32':
                  return (
                    <StTicketCard key={data.contentid}>
                      <StTicketCardLeft>
                        <StTicketHeader>
                          <StCartMenu>숙박</StCartMenu>
                        </StTicketHeader>
                        <StMyTicketImage
                          src={data.img || noimg}
                          alt="사진"
                          onClick={() => navigate(`/stay/${data.contentid}`)}
                        />
                      </StTicketCardLeft>
                      <StCartTitle>{data.restaurant.split('[', 1)}</StCartTitle>
                      <StDeleteBtn onClick={() => delResLiked(data.contentid)}>
                        X
                      </StDeleteBtn>
                    </StTicketCard>
                  );
                case '12':
                  return (
                    <>
                      <StTicketCard key={data.contentid}>
                        <StTicketCardLeft>
                          <StTicketHeader>
                            <StCartMenu>관광지</StCartMenu>
                          </StTicketHeader>

                          <StMyTicketImage
                            src={data.img || noimg}
                            alt="사진"
                            onClick={() => navigate(`/spot/${data.contentid}`)}
                          />
                        </StTicketCardLeft>
                        <StCartTitle>
                          {data.restaurant.split('[', 1)}
                        </StCartTitle>
                        <StDeleteBtn
                          onClick={() => delResLiked(data.contentid)}
                        >
                          X
                        </StDeleteBtn>
                      </StTicketCard>
                    </>
                  );
                default:
                  return null;
              }
            })}
        </StTicket>
      </StTicketWrap>
    </>
  );
};

export default MyLikeList;

const StTicketWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

const StTicket = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const StTicketCard = styled.div`
  width: 480.01px;
  height: 172.54px;
  /* margin: 10px; */
  margin: 0 27.36px 18.8px 0;
  /* box-sizing: border-box; */
  border-radius: 11.41px;
  /* padding: 10px; */
  /* display: grid; */
  align-items: center;
  /* flex-direction: column; */
  clear: both;
  display: flex;
  /* justify-content: center; */
  flex-direction: row;
  /* background-color: rgba(255, 255, 255, 0.5); */
  background-size: contain;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
`;

const StTicketCardLeft = styled.div`
  width: 254px;
  height: 172.54px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const StMyTicketImage = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 11.41px;
  cursor: pointer;
  /* &:hover {
    transform: scale(1.1);
    transition: all 0.35s;
  } */
  /* position: relative; */
  display: flex;

  box-shadow: 5px 5px 10px grey;
  /* opacity: 0.7; */
`;

const StCartTitle = styled.span`
  /* position: absolute; */
  color: #4d4d4d;
  font-weight: 900;
  z-index: 100;
  text-align: center;
  font-size: 19.7px;
  line-height: 18.4px;
  margin: 22.15px 0 0 30.42px;
`;

const StCartMenu = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  width: 50px;
  height: 24px;
  border-radius: 30px;
  background-color: rgba(207, 171, 228, 0.4);
  margin: 5px;
`;

const StTicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
`;

const StDeleteBtn = styled.div`
  top: 5px;
  right: 5px;
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;
