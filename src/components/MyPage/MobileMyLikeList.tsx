import {
  arrayRemove,
  getDoc,
  updateDoc,
  doc,
  increment,
  DocumentData,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
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
  LikedHeader,
} from './styles';

const MobileMyLikeList = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState<DocumentData | undefined>([]);
  const uid = sessionStorage.getItem('uid');

  //페이지네이션
  const [data, setData] = useState<DocumentData | undefined>([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(4);

  const getMyBookmarkList = async () => {
    try {
      if (uid) {
        const myBookmarkData = await getDoc(doc(db, 'bookmarks', uid));
        if (myBookmarkData) {
          setPlace(myBookmarkData.data());
          setData(myBookmarkData.data());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 파이어베이스에 저장한 배열 삭제
  const delResLiked = async (targetId: string) => {
    if (place && uid) {
      const docRef = doc(db, 'bookmarks', uid);
      const restaurantDocRef = doc(db, 'restaurant_recommendation', targetId);

      const TargetBookmark = place.bookmarks.find(
        (e: { contentid: string }) => e.contentid === targetId,
      );

      await updateDoc(docRef, {
        bookmarks: arrayRemove(TargetBookmark),
        contentid: arrayRemove(targetId),
      });

      await updateDoc(restaurantDocRef, {
        likeCnt: increment(-1),
      });
    }
    getMyBookmarkList();
  };

  const delSpotLiked = async (targetId: string) => {
    if (place && uid) {
      const docRef = doc(db, 'bookmarks', uid);
      const spotDocRef = doc(db, 'spot_recommendation', targetId);

      const TargetBookmark = place.bookmarks.find(
        (e: { contentid: string }) => e.contentid === targetId,
      );

      await updateDoc(docRef, {
        bookmarks: arrayRemove(TargetBookmark),
        contentid: arrayRemove(targetId),
      });

      await updateDoc(spotDocRef, {
        likeCnt: increment(-1),
      });
    }
    getMyBookmarkList();
  };

  const delStayLiked = async (targetId: string) => {
    if (place && uid) {
      const docRef = doc(db, 'bookmarks', uid);
      const stayDocRef = doc(db, 'stay_recommendation', targetId);

      const TargetBookmark = place.bookmarks.find(
        (e: { contentid: string }) => e.contentid === targetId,
      );

      await updateDoc(docRef, {
        bookmarks: arrayRemove(TargetBookmark),
        contentid: arrayRemove(targetId),
      });

      await updateDoc(stayDocRef, {
        likeCnt: increment(-1),
      });
    }
    getMyBookmarkList();
  };

  useEffect(() => {
    getMyBookmarkList();
  }, []);

  return (
    <>
      <StTicketWrap>
        <LikedHeader>나의 찜 목록</LikedHeader>
        <StTicket>
          <StLikedBox>
            {place &&
              place?.bookmarks
                ?.slice(items * (page - 1), items * (page - 1) + items)
                .map((data: any) => {
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
                                onClick={() => {
                                  if (
                                    window.confirm('정말로 삭제하시겠습니까?')
                                  ) {
                                    delResLiked(data.contentid);
                                  }
                                }}
                              />
                            </StTicketHeader2>

                            <StCartTitle>
                              {data.restaurant?.split('[', 1)}
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
                                onClick={() => {
                                  if (
                                    window.confirm('정말로 삭제하시겠습니까?')
                                  ) {
                                    delStayLiked(data.contentid);
                                  }
                                }}
                              />
                            </StTicketHeader2>

                            <StCartTitle>
                              {data.restaurant?.split('[', 1)}
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
                                  onClick={() => {
                                    if (
                                      window.confirm('정말로 삭제하시겠습니까?')
                                    ) {
                                      delSpotLiked(data.contentid);
                                    }
                                  }}
                                />
                              </StTicketHeader2>

                              <StCartTitle>
                                {data.restaurant?.split('[', 1)}
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
            place={place}
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

export default MobileMyLikeList;
