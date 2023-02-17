import styled from 'styled-components';
import RestaurantDetail from '../RestaurantDetail';
import noimg from '../../assets/noimg.avif';
import { useInfiniteQuery } from 'react-query';
import { fetchRestaurantData } from '../../apis/publicAPI';
import { useRecoilValue } from 'recoil';
import { regionSelectionState } from '../../recoil/apiDataAtoms';
import Loader from '../Loader/Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState, useRef } from 'react';
import leftArrow from '../../assets/left-arrow.avif';
import rightArrow from '../../assets/right-arrow.avif';
// import SkeletonSelectionResult from '../Skeleton/SkeletonSelectionResult';

const RestaurantSelectionResult = () => {
  const region = useRecoilValue(regionSelectionState);
  const [restaurantCurPage, setRestaurantCurPage] = useState(1);
  const maxPageNo = useRef(1);

  const {
    data,
    isLoading,
    fetchNextPage: fetchRestaurantNextPage,
  } = useInfiniteQuery(
    ['restaurant_data', region],
    ({ pageParam = 1 }) => fetchRestaurantData({ region, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.pageNo ===
          Math.ceil(lastPage?.totalCount / lastPage?.numOfRows)
          ? undefined
          : lastPage?.pageNo + 1;
      },
      getPreviousPageParam: (lastPage, allPages) => {
        return lastPage?.pageNo < 1 ? undefined : lastPage?.pageNo - 1;
      },
      staleTime: 1000 * 60 * 60,
    },
  );

  const handleFetchNextPage = () => {
    setRestaurantCurPage(restaurantCurPage + 1);
    if (data) {
      if (restaurantCurPage >= data?.pages[maxPageNo.current - 1]?.pageNo) {
        fetchRestaurantNextPage();
      }
    }
  };

  useEffect(() => {
    if (data) {
      if (maxPageNo.current < data.pages.length) {
        maxPageNo.current = data.pages.length;
      }
    }
  }, [restaurantCurPage]);

  useEffect(() => {
    maxPageNo.current = 1;
    setRestaurantCurPage(1);
  }, [region]);

  return (
    <SearchOverallResultContainer>
      {isLoading || data === undefined ? (
        <>
          <Loader />
          {/* <SkeletonSelectionResult /> */}
        </>
      ) : (
        <>
          <ListItemCount>
            총 {data.pages[restaurantCurPage - 1]?.totalCount} 개의 결과
          </ListItemCount>
          <SearchListWrapper>
            <BtnWrapper>
              {data.pages[restaurantCurPage - 1]?.pageNo - 1 < 1 ? (
                <></>
              ) : (
                <MoveBtnStyle
                  src={leftArrow}
                  alt="이전버튼"
                  onClick={() => setRestaurantCurPage(restaurantCurPage - 1)}
                />
              )}
            </BtnWrapper>
            <ResultWrapper>
              {data.pages[restaurantCurPage - 1]?.items.item.map((e) => {
                return (
                  <RestaurantDetail
                    key={e.contentid}
                    id={e.contentid}
                    img={e.firstimage || noimg}
                  >
                    {e.title}
                  </RestaurantDetail>
                );
              })}
            </ResultWrapper>
            <BtnWrapper>
              {Math.ceil(
                data.pages[0]?.totalCount / data.pages[0]?.numOfRows,
              ) <= restaurantCurPage ? (
                <></>
              ) : (
                <MoveBtnStyle
                  src={rightArrow}
                  alt="다음버튼"
                  onClick={handleFetchNextPage}
                />
              )}
            </BtnWrapper>
          </SearchListWrapper>
        </>
      )}
    </SearchOverallResultContainer>
  );
};

export default RestaurantSelectionResult;

const SearchOverallResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListItemCount = styled.div`
  margin-top: 30px;
  margin-left: 30px;
`;

const SearchListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ResultWrapper = styled.div`
  width: 70%;
  height: 500px;
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const BtnWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
`;

const MoveBtnStyle = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
