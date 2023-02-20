import styled from 'styled-components';
import StayDetail from '../StayDetail';
import { FetchedStayDataType } from '../../apis/publicAPI';
import noimg from '../../assets/noimg.avif';
import { useQuery } from 'react-query';
import { fetchStayData } from '../../apis/publicAPI';
import { useRecoilValue } from 'recoil';
import { regionSelectionState } from '../../recoil/apiDataAtoms';
import Loader from '../Loader/Loader';
import { useCallback, useEffect, useRef, useState } from 'react';
import leftArrow from '../../assets/left-arrow.avif';
import rightArrow from '../../assets/right-arrow.avif';
import SkeletonSelectionResult from '../Skeleton/SkeletonSelectionResult';

const StaySelectionResult = () => {
  const region = useRecoilValue(regionSelectionState);
  const [stayCurPage, setStayCurPage] = useState(1);
  const maxPageNo = useRef(1);
  const firstNum = useRef(1);
  //   const lastNum = useRef(5);

  //페이지네이션
  if (stayCurPage % 5 === 1) {
    firstNum.current = 5 * Math.floor(stayCurPage / 5) + 1;
  }
  if (stayCurPage < firstNum.current) {
    firstNum.current = 5 * (Math.floor(stayCurPage / 5) - 1) + 1;
  }

  // console.log('숙박 렌더링');

  const { data, isFetching, isLoading, isPreviousData } = useQuery(
    ['stay_data', region, stayCurPage],
    () => fetchStayData({ region, stayCurPage }),
    {
      staleTime: 1000 * 60 * 60,
      keepPreviousData: true,
    },
  );

  //   console.log('선택한 페이지에 대한 데이터?', data);

  const handleFetchNextPage = useCallback(() => {
    setStayCurPage(stayCurPage + 1);
  }, [stayCurPage]);

  useEffect(() => {
    maxPageNo.current = 1;
    setStayCurPage(1);
  }, [region]);

  return (
    <SearchOverallResultContainer>
      {isLoading || data === undefined ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <ListItemCount>총 {data.totalCount} 개의 결과</ListItemCount>
          <SearchListWrapper>
            <BtnWrapper>
              {data.pageNo - 1 < 1 ? (
                <></>
              ) : (
                <MoveBtnStyle
                  src={leftArrow}
                  alt="이전버튼"
                  onClick={() => setStayCurPage(stayCurPage - 1)}
                />
              )}
            </BtnWrapper>
            {isFetching || isLoading ? (
              <SkeletonSelectionResult />
            ) : (
              <ResultWrapper>
                {data?.items.item.map((e: FetchedStayDataType) => {
                  return (
                    <StayDetail
                      key={e.contentid}
                      id={e.contentid}
                      img={e.firstimage || noimg}
                      address={e.addr1}
                    >
                      {e.title.split(/[\\(\\[]/)[0]}
                    </StayDetail>
                  );
                })}
              </ResultWrapper>
            )}

            <BtnWrapper>
              {Math.ceil(data.totalCount / 8) <= stayCurPage ? (
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
          <PaginationDotsWrapper>
            {Array(Math.ceil(data.totalCount / 8) + 1)
              .fill('')
              .slice(firstNum.current, firstNum.current + 5)
              .map((_, i) => {
                const isSelectedPage =
                  firstNum.current + i === stayCurPage ? true : false;

                // console.log('토탈카운', data.totalCount);

                if (firstNum.current + i <= Math.ceil(data.totalCount / 8)) {
                  return (
                    <PaginationDot
                      key={firstNum.current + i}
                      isSelectedPage={isSelectedPage}
                      onClick={() => {
                        setStayCurPage(firstNum.current + i);
                      }}
                    >
                      {firstNum.current + i}
                    </PaginationDot>
                  );
                }
              })}
          </PaginationDotsWrapper>
        </>
      )}
    </SearchOverallResultContainer>
  );
};

export default StaySelectionResult;

const SearchOverallResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #6478ff;
  border-radius: 20px;
  box-shadow: 3px 3px #d7d7d7;
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
  width: 80%;
  /* height: 500px; */
  display: flex;
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

const PaginationDotsWrapper = styled.div`
  margin-top: 10px;
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const PaginationDot = styled.div<{ isSelectedPage: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  color: ${(props) => (props.isSelectedPage ? '#000000' : '#ffffff')};
  /* color: #878787; */
  font-weight: 800;
  cursor: pointer;
`;
