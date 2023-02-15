import styled from 'styled-components';
import RestaurantDetail from '../RestaurantDetail';
import { FetchedStayDataType } from '../../apis/publicAPI';
import noimg from '../../assets/noimg.avif';
import Slider from 'react-slick';
import { useInfiniteQuery, useQuery } from 'react-query';
import { fetchRestaurantData } from '../../apis/publicAPI';
import { useRecoilValue } from 'recoil';
import { regionSelectionState } from '../../recoil/apiDataAtoms';
import Loader from '../Loader/Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const RestaurantSelectionResult = () => {
  const region = useRecoilValue(regionSelectionState);
  const [restaurantCurPage, setRestaurantCurPage] = useState(1);
  const maxPageNo = useRef(1);

  const {
    data,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage: fetchRestaurantNextPage,
    // fetchPreviousPage,
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

  console.log('음식점 데이터', data);
  console.log('음식점 curPage', restaurantCurPage);
  console.log('음식점 maxPage', maxPageNo);

  // useEffect(() => {
  //   fetchNextPage();
  // }, [curPage]);
  const handleFetchNextPage = () => {
    setRestaurantCurPage(restaurantCurPage + 1);
    if (data) {
      if (restaurantCurPage >= data?.pages[maxPageNo.current - 1]?.pageNo) {
        fetchRestaurantNextPage();
      }
      // if (hasNextPage) {
      //   fetchRestaurantNextPage();
      // }
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
    console.log('setCurPage');
    setRestaurantCurPage(1);
  }, [region]);

  return (
    <SearchOverallResultContainer>
      {isLoading || data === undefined ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <ListItemCount>
            총 {data.pages[restaurantCurPage - 1]?.totalCount} 개의 결과
          </ListItemCount>
          <SearchListWrapper>
            <BtnWrapper>
              <button
                onClick={() => setRestaurantCurPage(restaurantCurPage - 1)}
                disabled={
                  data.pages[restaurantCurPage - 1]?.pageNo - 1 < 1
                    ? true
                    : false
                }
              >
                이전
              </button>
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
              <button
                onClick={handleFetchNextPage}
                disabled={
                  Math.ceil(
                    data.pages[0]?.totalCount / data.pages[0]?.numOfRows,
                  ) <= restaurantCurPage
                    ? true
                    : false
                }
              >
                다음
              </button>
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
  width: 100px;
  height: 30px;
`;
