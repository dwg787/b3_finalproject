import styled from 'styled-components';
import SpotDetail from '../SpotDetail';
import { FetchedStayDataType } from '../../apis/publicAPI';
import noimg from '../../assets/noimg.avif';
import Slider from 'react-slick';
import { useInfiniteQuery, useQuery } from 'react-query';
import { fetchSpotData } from '../../apis/publicAPI';
import { useRecoilValue } from 'recoil';
import { regionSelectionState } from '../../recoil/apiDataAtoms';
import Loader from '../Loader/Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useRef, useState } from 'react';

const SelectionResult = () => {
  const region = useRecoilValue(regionSelectionState);
  const [spotCurPage, setSpotCurPage] = useState(1);
  const maxPageNo = useRef(1);

  const {
    data,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage: fetchSpotNextPage,
  } = useInfiniteQuery(
    ['spot_data', region],
    ({ pageParam = 1 }) => fetchSpotData({ region, pageParam }),
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
      // staleTime: 1000 * 60,
    },
  );

  console.log('관광지 spotCurPage', spotCurPage);
  console.log('관광지 데이터', data);
  console.log('관광지 maxPage', maxPageNo);

  // useEffect(() => {
  //   fetchNextPage();
  // }, [spotCurPage]);

  useEffect(() => {
    setSpotCurPage(1);
  }, [region]);

  const handleFetchNextPage = () => {
    setSpotCurPage(spotCurPage + 1);
    if (data) {
      console.log(
        'fetch된 가장 last 페이지 넘버:',
        data.pages[spotCurPage - 1]?.pageNo,
      );
    }

    if (data) {
      if (maxPageNo.current < data.pages.length) {
        maxPageNo.current = data.pages.length;
      }
      if (spotCurPage === data.pages[maxPageNo.current - 1].pageNo) {
        fetchSpotNextPage();
      }
    }
  };

  return (
    <SearchOverallResultContainer>
      {isLoading || data === undefined ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <ListItemCount>
            총 {data.pages[spotCurPage - 1]?.totalCount} 개의 결과
          </ListItemCount>
          <SearchListWrapper>
            <BtnWrapper>
              <button
                onClick={() => setSpotCurPage(spotCurPage - 1)}
                disabled={
                  data.pages[spotCurPage - 1]?.pageNo - 1 < 1 ? true : false
                }
              >
                이전
              </button>
            </BtnWrapper>
            <ResultWrapper>
              {data.pages[spotCurPage - 1]?.items.item.map(
                (e: FetchedStayDataType) => {
                  return (
                    <SpotDetail
                      key={e.contentid}
                      id={e.contentid}
                      img={e.firstimage || noimg}
                    >
                      {e.title}
                    </SpotDetail>
                  );
                },
              )}
            </ResultWrapper>
            <BtnWrapper>
              <button
                onClick={handleFetchNextPage}
                disabled={
                  Math.ceil(
                    data.pages[0]?.totalCount / data.pages[0]?.numOfRows,
                  ) <= spotCurPage
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

export default SelectionResult;

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
`;

const ResultWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
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
