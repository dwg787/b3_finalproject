import styled from 'styled-components';
import SpotDetail from '../SpotDetail';
import { FetchedStayDataType } from '../../apis/publicAPI';
import noimg from '../../assets/noimg.avif';
import { useQuery } from 'react-query';
import { fetchSpotData } from '../../apis/publicAPI';
import { useRecoilValue } from 'recoil';
import { regionSelectionState } from '../../recoil/apiDataAtoms';
import Loader from '../Loader/Loader';
import SkeletonSelectionResult from '../Skeleton/SkeletonSelectionResult';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import leftArrow from '../../assets/left-arrow.avif';
import rightArrow from '../../assets/right-arrow.avif';

const SpotSelectionResult = () => {
  const region = useRecoilValue(regionSelectionState);
  const [spotCurPage, setSpotCurPage] = useState(1);
  const maxPageNo = useRef(1);
  const firstNum = useRef(1);

  //페이지네이션
  if (spotCurPage % 5 === 1) {
    firstNum.current = 5 * Math.floor(spotCurPage / 5) + 1;
  }
  if (spotCurPage < firstNum.current) {
    firstNum.current = 5 * (Math.floor(spotCurPage / 5) - 1) + 1;
  }

  const { data, isFetching, isLoading, isPreviousData } = useQuery(
    ['spot_data', region, spotCurPage],
    () => fetchSpotData({ region, spotCurPage }),
    {
      staleTime: 1000 * 60 * 60,
      keepPreviousData: true,
    },
  );

  // console.log('firstNum', firstNum.current);
  // console.log('총 페이지 수', Math.ceil(data?.totalCount / 8));
  // console.log('현재 페이지', spotCurPage);
  //   console.log('선택한 페이지에 대한 데이터?', data);
  //   useEffect(() => {
  //     console.log('firstNum', firstNum.current);
  //     console.log('총 페이지 수', Math.ceil(data?.totalCount / 8));
  //     console.log('현재 페이지', spotCurPage);
  //   }, [firstNum.current, spotCurPage, data?.totalCount]);

  const handleFetchNextPage = useCallback(() => {
    setSpotCurPage(spotCurPage + 1);
  }, [spotCurPage]);

  useEffect(() => {
    maxPageNo.current = 1;
    setSpotCurPage(1);
  }, [region]);

  return (
    <SearchOverallResultContainer>
      {isLoading || data === undefined ? (
        <>
          {/* <SkeletonSelectionResult /> */}
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
                  onClick={() => setSpotCurPage(spotCurPage - 1)}
                />
              )}
            </BtnWrapper>
            {isFetching || isLoading ? (
              <SkeletonSelectionResult />
            ) : (
              <ResultWrapper>
                {data?.items.item.map((e: FetchedStayDataType) => {
                  return (
                    <SpotDetail
                      key={e.contentid}
                      id={e.contentid}
                      img={e.firstimage || noimg}
                      address={e.addr1}
                    >
                      {e.title.split(/[\\(\\[]/)[0]}
                    </SpotDetail>
                  );
                })}
              </ResultWrapper>
            )}
            <BtnWrapper>
              {Math.ceil(data.totalCount / 8) <= spotCurPage ? (
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
                  firstNum.current + i === spotCurPage ? true : false;
                if (firstNum.current + i <= Math.ceil(data.totalCount / 8)) {
                  return (
                    <PaginationDot
                      key={firstNum.current + i}
                      isSelectedPage={isSelectedPage}
                      onClick={() => {
                        setSpotCurPage(firstNum.current + i);
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

export default SpotSelectionResult;

const SearchOverallResultContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  position: relative;
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
