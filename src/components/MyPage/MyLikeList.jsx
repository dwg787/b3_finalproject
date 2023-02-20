import {
  arrayRemove,
  collection,
  getDocs,
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
    const q = query(collection(db, 'bookmarks'), uid);
    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
    }));
    setRestaurant(newData);
    console.log('파베 북마크 데이터', newData);
  };

  useEffect(() => {
    getRestaurantLiked();
  }, []);

  //   if (isLoading) {
  //     return <Loader />;
  //   }

  // 파이어베이스에 저장한 배열의 타이틀을 삭제해보자
  const delResLiked = async (targetId) => {
    // console.log('삭제버튼 누른 타겟', targetId);
    if (restaurant) {
      const docRef = doc(db, 'bookmarks', uid);
      //   console.log(docRef);
      const TargetBookmark = restaurant[0].bookmarks.find(
        (e) => e.contentid === targetId,
      );
      await deleteDoc(docRef, {
        bookmarks: arrayRemove(TargetBookmark),
      });
    }
    getRestaurantLiked();
  };

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
            restaurant[0]?.bookmarks.map((data) => {
              //   console.log('jsx에서 받은 데이터', restaurant);
              switch (data.contenttypeid) {
                case '39':
                  return (
                    <StTicketCard key={data.contentid}>
                      <StTicketCardLeft>
                        <StTicketHeader>
                          <StCartMenu>음식점</StCartMenu>
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
                      <StDeleteBtn onClick={() => delResLiked(data.contentid)}>
                        X
                      </StDeleteBtn>
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
`;

const StTicket = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const StTicketCard = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 10px;

  /* box-sizing: border-box; */
  border-radius: 10px;
  /* padding: 10px; */
  /* display: grid; */
  align-items: center;
  /* flex-direction: column; */
  clear: both;
  display: flex;
  justify-content: center;
  /* background-color: rgba(255, 255, 255, 0.5); */
  background-size: contain;
`;

const StTicketCardLeft = styled.div`
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const StMyTicketImage = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  /* &:hover {
      transform: scale(1.1);
      transition: all 0.35s;
    } */
  position: relative;
  display: flex;

  box-shadow: 5px 5px 10px grey;
  opacity: 0.7;
`;

const StCartTitle = styled.span`
  position: absolute;
  color: #fafafa;
  font-weight: 900;
  z-index: 100;
  text-align: center;
`;

// const StCartMenu = styled.span`
//   color: #fafafa;
//   font-weight: 900;
//   z-index: 100;
//   background-color: teal;
//   margin-right: 130px;
// `;

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
