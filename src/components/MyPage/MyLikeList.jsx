import {
  arrayRemove,
  getDoc,
  updateDoc,
  doc,
  increment,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../../apis/firebase';
import noimg from '../../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const MyLikeList = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState([]);
  const uid = auth.currentUser.uid;

  //페이지네이션
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(6);

  const getRestaurantLiked = async () => {
    // const q = query(collection(db, 'bookmarks'), uid);
    const myBookmarkData = await getDoc(doc(db, 'bookmarks', uid));
    // const newData = data.docs.map((doc) => ({
    //   ...doc.data(),
    // }));
    // console.log('파베 북마크 데이터', myBookmarkData.data());
    if (myBookmarkData) {
      setRestaurant(myBookmarkData.data());
      setData(myBookmarkData.data());
    }
  };

  useEffect(() => {
    getRestaurantLiked();
    // getEachItemAllLikesCount();
  }, []);

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
      // console.log('타겟 북마크', TargetBookmark);
      await updateDoc(docRef, {
        bookmarks: arrayRemove(TargetBookmark),
        contentid: arrayRemove(targetId),
      }).then(
        updateDoc(restaurantDocRef, {
          // likeCnt: arrayRemove(`${uid}`),
          likeCnt: increment(-1),
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

  //페이지네이션2
  const handlePageChange = (page) => {
    setPage(page);
  };
  const itemChange = (e) => {
    setItems(Number(e.target.value));
  };

  // console.log(items * (page - 1), items * (page - 1) + items);

  useEffect(() => {
    if (restaurant) {
      setData(restaurant);
    }
  }, [restaurant, items, page]);

  return (
    <>
      <StTicketWrap>
        <StTicket>
          <StLikedBox>
            {restaurant &&
              restaurant?.bookmarks
                ?.slice(items * (page - 1), items * (page - 1) + items)
                .map((data) => {
                  console.log('jsx에서 받은 데이터', data);
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
                          <StTicketCardRight>
                            <StTicketHeader2
                              onClick={() => delResLiked(data.contentid)}
                            >
                              X
                            </StTicketHeader2>

                            <StCartTitle>
                              {data.restaurant.split('[', 1)}
                            </StCartTitle>
                            <StCartTitleAdd>{data.addr1}</StCartTitleAdd>
                            {/* 좋아요카운트 */}
                            {/* <StCartTitleAdd>{data.viewCnt}</StCartTitleAdd> */}
                          </StTicketCardRight>
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
                              onClick={() =>
                                navigate(`/stay/${data.contentid}`)
                              }
                            />
                          </StTicketCardLeft>
                          <StCartTitle>
                            {data.restaurant.split('[', 1)}
                          </StCartTitle>
                          <StCartTitleAdd>{data.addr1}</StCartTitleAdd>
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
                                onClick={() =>
                                  navigate(`/spot/${data.contentid}`)
                                }
                              />
                            </StTicketCardLeft>
                            <StCartTitle>
                              {data.restaurant.split('[', 1)}
                            </StCartTitle>
                            <StCartTitleAdd>{data.addr1}</StCartTitleAdd>
                          </StTicketCard>
                        </>
                      );
                    default:
                      return null;
                  }
                })}
          </StLikedBox>
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={items}
              totalItemsCount={data?.bookmarks?.length}
              onChange={handlePageChange}
              pageRangeDisplayed={5}
              hideDisabled={true}
              hideNavigation={true}
              hideFirstLastPages={true}
            ></Pagination>
          </PaginationBox>
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

const StLikedBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 555.22px;
  box-sizing: border-box;
  padding: 0 108.42px 108.42px 108.42px;
`;

const StTicketCard = styled.div`
  width: 480.01px;
  height: 172.54px;
  margin: 0 0 18.8px 0;
  border-radius: 11.41px;
  align-items: center;
  clear: both;
  display: flex;
  flex-direction: row;
  background-size: contain;
  /* box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15); */
  box-shadow: 3px 3px 5px grey;
`;

const StTicketCardLeft = styled.div`
  width: 254px;
  height: 172.54px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const StTicketCardRight = styled.div`
  width: 226px;
  height: 172.54px;
  box-sizing: border-box;
  border-radius: 5px;
  flex-direction: column;
  display: flex;
  /* justify-content: center; */
  position: relative;
`;

const StMyTicketImage = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 11.41px;
  cursor: pointer;
  display: flex;
  /* box-shadow: 5px 5px 10px grey; */
`;

const StCartTitle = styled.span`
  /* position: absolute; */
  color: #4d4d4d;
  font-weight: 900;
  z-index: 100;
  /* text-align: center; */
  font-size: 19.7px;
  line-height: 18.4px;
  margin: 22.15px 0 11.21px 30.42px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StCartTitleAdd = styled(StCartTitle)`
  /* color: teal; */
  margin: 0 31.01px 0 30.42px;
  font-size: 15.44px;
  line-height: 24.8px;
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

const StTicketHeader2 = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  width: 226px;
  height: 172.54px;
  padding: 10px;
  cursor: pointer;
`;

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin: 41.63px 0 49.15px 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 9px;
    height: 20px;
    /* border: 1px solid #e2e2e2; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-size: 1rem; */
    font-weight: bold;
    font-size: 14.34px;
    margin: 6.6px;
  }
  /* ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  } */
  ul.pagination li a {
    text-decoration: none;
    color: #909090;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: #6478ff;
  }
  ul.pagination li.active {
    /* background-color: #337ab7; */
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #6478ff;
  }
`;
