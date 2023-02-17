import styled from 'styled-components';
import SpotDetail from '../SpotDetail';
import { FetchedStayDataType } from '../../apis/publicAPI';
import noimg from '../../assets/noimg.avif';
import { useQuery } from 'react-query';
import { fetchSpotData } from '../../apis/publicAPI';
import { useRecoilValue } from 'recoil';
import { regionSelectionState } from '../../recoil/apiDataAtoms';
import Loader from '../Loader/Loader';
import { useEffect, useRef, useState } from 'react';
import leftArrow from '../../assets/left-arrow.avif';
import rightArrow from '../../assets/right-arrow.avif';

const SpotSelectionResult = () => {
  const region = useRecoilValue(regionSelectionState);
  const [spotCurPage, setSpotCurPage] = useState(1);
  const maxPageNo = useRef(1);
  const firstNum = useRef(1);
  const lastNum = useRef(5);

  //페이지네이션
  if (spotCurPage % 5 === 1) {
    firstNum.current = 5 * Math.floor(spotCurPage / 5) + 1;
    lastNum.current = 5 * Math.floor(spotCurPage / 5) + 5;
  }
  if (spotCurPage < firstNum.current) {
    firstNum.current = 5 * (Math.floor(spotCurPage / 5) - 1) + 1;
    lastNum.current = 5 * (Math.floor(spotCurPage / 5) - 1) + 5;
  }

  console.log('spotCurPage', spotCurPage);
  console.log('firstNum', firstNum);
  //   console.log('lastNum', lastNum);

  const { data, isLoading, isPreviousData } = useQuery(
    ['spot_data', region, spotCurPage],
    () => fetchSpotData({ region, spotCurPage }),
    {
      staleTime: 1000 * 60 * 60,
      keepPreviousData: true,
    },
  );

  console.log('선택한 페이지에 대한 데이터?', data);

  const handleFetchNextPage = () => {
    setSpotCurPage(spotCurPage + 1);
    // if (data) {
    //   if (spotCurPage >= data?.pages[maxPageNo.current - 1]?.pageNo) {
    //     fetchSpotNextPage();
    //   }
    // }
  };

  // const handleFetchRandomPage = () => {
  //   refetch({ refetchPage: (page, index) => page === spotCurPage });
  // };

  //   useEffect(() => {
  //     if (data) {
  //       if (maxPageNo.current < data.pages.length) {
  //         maxPageNo.current = data.pages.length;
  //       }
  //     }
  //   }, [spotCurPage]);

  useEffect(() => {
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
        <>
          <ListItemCount>총 {data?.totalCount} 개의 결과</ListItemCount>
          <SearchListWrapper>
            <BtnWrapper>
              {data?.pageNo - 1 < 1 ? (
                <></>
              ) : (
                <MoveBtnStyle
                  src={leftArrow}
                  alt="이전버튼"
                  onClick={() => setSpotCurPage(spotCurPage - 1)}
                />
              )}
            </BtnWrapper>
            <ResultWrapper>
              {data?.items.item.map((e: FetchedStayDataType) => {
                return (
                  <SpotDetail
                    key={e.contentid}
                    id={e.contentid}
                    img={e.firstimage || noimg}
                  >
                    {e.title}
                  </SpotDetail>
                );
              })}
            </ResultWrapper>
            <BtnWrapper>
              {Math.ceil(data?.totalCount / data?.numOfRows) <= spotCurPage ? (
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
            {Array(Math.ceil(data.totalCount / data.numOfRows))
              .fill('')
              .slice(firstNum.current, lastNum.current + 1)
              .map((_, i) => {
                const isSelectedPage =
                  firstNum.current + i === spotCurPage ? true : false;
                return (
                  <PaginationDot
                    key={firstNum.current + i}
                    isSelectedPage={isSelectedPage}
                    onClick={() => {
                      setSpotCurPage(firstNum.current + i);
                      // handleFetchRandomPage();
                    }}
                  >
                    {firstNum.current + i}
                  </PaginationDot>
                );
              })}
          </PaginationDotsWrapper>
        </>
      )}
    </SearchOverallResultContainer>
  );
};

export default SpotSelectionResult;

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
