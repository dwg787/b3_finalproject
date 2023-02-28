import {
  arrayRemove,
  getDoc,
  updateDoc,
  doc,
  increment,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../apis/firebase';
import noimg from '../../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';
import PaginationList from './PaginationList';
import DeleteImg from '../../assets/DeleteImg.avif';
import {
  StTicketWrap,
  StTicket,
  StLikedBox,
  StTicketCard,
  StTicketCardLeft,
  StTicketCardRight,
  StMyTicketImage,
  StCartTitle,
  StCartTitleAdd,
  StCartMenu,
  StTicketHeader,
  StTicketHeader2,
  DelBtn,
} from './styles';

const MyLikeList = () => {
  // interface Bookmark {
  //   contentid: number;
  //   contenttypeid: number;
  //   img: string;
  //   addr1: string;
  //   restaurant: string;
  // }
  // interface Restaurant {
  //   bookmarks: Bookmark[];
  // }

  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState([]);
  const uid = sessionStorage.getItem('uid');

  //페이지네이션
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(6);

  const getRestaurantLiked = async () => {
    try {
      const myBookmarkData = await getDoc(doc(db, 'bookmarks', uid));
      if (myBookmarkData) {
        setRestaurant(myBookmarkData.data());
        setData(myBookmarkData.data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurantLiked();
  }, []);

  // 파이어베이스에 저장한 배열 삭제
  const delResLiked = async (targetId) => {
    if (restaurant) {
      const docRef = doc(db, 'bookmarks', uid);
      const restaurantDocRef = doc(db, 'restaurant_recommendation', targetId);
      const TargetBookmark = restaurant.bookmarks.find(
        (e) => e.contentid === targetId,
      );

      await updateDoc(docRef, {
        bookmarks: arrayRemove(TargetBookmark),
        contentid: arrayRemove(targetId),
      }).then(
        updateDoc(restaurantDocRef, {
          likeCnt: increment(-1),
        }),
      );
    }
    getRestaurantLiked();
  };

  return (
    <>
      <StTicketWrap>
        <StTicket>
          <StLikedBox>
            {restaurant &&
              restaurant?.bookmarks
                ?.slice(items * (page - 1), items * (page - 1) + items)
                .map((data, i) => {
                  switch (data.contenttypeid) {
                    case '39':
                      return (
                        <StTicketCard key={data.contentid}>
                          <StTicketCardLeft
                            onClick={() =>
                              navigate(`/restaurant/${data.contentid}`)
                            }
                          >
                            <StTicketHeader>
                              <StCartMenu>맛집</StCartMenu>
                            </StTicketHeader>
                            <StMyTicketImage
                              src={data.img || noimg}
                              alt="사진"
                            />
                          </StTicketCardLeft>
                          <StTicketCardRight>
                            <StTicketHeader2>
                              <DelBtn
                                src={DeleteImg}
                                onClick={() => delResLiked(data.contentid)}
                              />
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
                          <StTicketCardLeft
                            onClick={() => navigate(`/stay/${data.contentid}`)}
                          >
                            <StTicketHeader>
                              <StCartMenu>숙박</StCartMenu>
                            </StTicketHeader>
                            <StMyTicketImage
                              src={data.img || noimg}
                              alt="사진"
                            />
                          </StTicketCardLeft>

                          <StTicketCardRight>
                            <StTicketHeader2>
                              <DelBtn
                                src={DeleteImg}
                                onClick={() => delResLiked(data.contentid)}
                              />
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
                    case '12':
                      return (
                        <>
                          <StTicketCard key={data.contentid}>
                            <StTicketCardLeft
                              onClick={() =>
                                navigate(`/spot/${data.contentid}`)
                              }
                            >
                              <StTicketHeader>
                                <StCartMenu>관광</StCartMenu>
                              </StTicketHeader>

                              <StMyTicketImage
                                src={data.img || noimg}
                                alt="사진"
                              />
                            </StTicketCardLeft>
                            <StTicketCardRight>
                              <StTicketHeader2>
                                <DelBtn
                                  src={DeleteImg}
                                  onClick={() => delResLiked(data.contentid)}
                                />
                              </StTicketHeader2>

                              <StCartTitle>
                                {data.restaurant.split('[', 1)}
                              </StCartTitle>
                              <StCartTitleAdd>{data.addr1}</StCartTitleAdd>
                              {/* 좋아요카운트 */}
                              {/* <StCartTitleAdd>{data.viewCnt}</StCartTitleAdd> */}
                            </StTicketCardRight>
                          </StTicketCard>
                        </>
                      );
                    default:
                      return null;
                  }
                })}
          </StLikedBox>
          <PaginationList
            restaurant={restaurant}
            data={data}
            page={page}
            items={items}
            setPage={setPage}
            setItems={setItems}
            setData={setData}
          />
        </StTicket>
      </StTicketWrap>
    </>
  );
};

export default MyLikeList;
