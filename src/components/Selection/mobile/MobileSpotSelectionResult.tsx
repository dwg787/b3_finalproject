import styled from 'styled-components';
import { DetailDataTypes } from '../../../types/apiDataTypes';
import SpotDetail from '../../SpotDetail';
import noimg from '../../../assets/noimg.avif';
import { useInfiniteQuery } from 'react-query';
import { fetchSpotData } from '../../../apis/publicAPI';
import { useRecoilValue } from 'recoil';
import { regionSelectionState } from '../../../recoil/apiDataAtoms';
import Loader from '../../Loader/Loader';
import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import rightArrow from '../../assets/right-arrow.avif';
import MobileSpotDetail from './MobileSpotDetail';

const MobileSpotSelectionResult = () => {
  const region = useRecoilValue(regionSelectionState);
  const [spotCurPage, setSpotCurPage] = useState(1);
  const maxPageNo = useRef(1);

  console.log('spotCurPage', spotCurPage);

  const {
    data,
    isLoading,
    fetchNextPage: fetchSpotNextPage,
  } = useInfiniteQuery(
    ['mobile_spot_data', region],
    () => fetchSpotData({ region, spotCurPage }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.pageNo ===
          Math.ceil(lastPage?.totalCount / lastPage?.numOfRows)
          ? undefined
          : lastPage?.pageNo + 1;
      },
      staleTime: 1000 * 60 * 60,
    },
  );

  console.log('데이터', data);

  const handleFetchNextPage = () => {
    setSpotCurPage(() => spotCurPage + 1);
    if (data) {
      if (spotCurPage >= data?.pages[maxPageNo.current - 1]?.pageNo) {
        fetchSpotNextPage();
      }
    }
  };

  useEffect(() => {
    if (data) {
      if (maxPageNo.current < data.pages.length) {
        maxPageNo.current = data.pages.length;
      }
    }
  }, [spotCurPage]);

  useLayoutEffect(() => {
    maxPageNo.current = 1;
    setSpotCurPage(1);
  }, [region]);

  return (
    <SearchOverallResultContainer>
      {isLoading || data === undefined ? (
        <>
          <Loader />
        </>
      ) : (
        <ListContainer>
          <ListItemCount>
            총 {data.pages[spotCurPage - 1]?.totalCount} 개의 결과
          </ListItemCount>
          <SearchListWrapper>
            <ResultWrapper>
              {data.pages[spotCurPage - 1]?.items.item.map(
                (e: DetailDataTypes) => {
                  return (
                    <MobileSpotDetail
                      key={e.contentid}
                      id={e.contentid}
                      img={e.firstimage || noimg}
                    >
                      {e.title}
                    </MobileSpotDetail>
                  );
                },
              )}
              <BtnWrapper>
                {Math.ceil(
                  data.pages[0]?.totalCount / data.pages[0]?.numOfRows,
                ) <= spotCurPage ? (
                  <></>
                ) : (
                  <LoadMoreBtn onClick={handleFetchNextPage}>
                    더보기
                  </LoadMoreBtn>
                )}
              </BtnWrapper>
            </ResultWrapper>
          </SearchListWrapper>
        </ListContainer>
      )}
    </SearchOverallResultContainer>
  );
};

export default MobileSpotSelectionResult;

const SearchOverallResultContainer = styled.div`
  width: 768px;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResultWrapper = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  overflow: auto;
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

const LoadMoreBtn = styled.button`
  width: 70px;
  height: 30px;
  border: 1px solid '#6478ff';
  border-radius: 5px;
  background-color: white;
`;

const PaginationDotsWrapper = styled.div`
  margin-top: 30px;
  width: 500px;
  height: 10px;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
  gap: 10px;
`;

const PaginationDot = styled.div<{ isSelectedPage: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isSelectedPage ? '#6478ff' : '#ffffff'};
  box-shadow: 1px 1px #d7d7d7;
  cursor: pointer;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
`;
