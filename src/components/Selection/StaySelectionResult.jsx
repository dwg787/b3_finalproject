import styled from 'styled-components';
import StayDetail from '../StayDetail';
import noimg from '../../assets/noimg.avif';
import { useQuery, useInfiniteQuery } from 'react-query';
import {
  fetchStayData,
  fetchStayAdditionalInfo1,
  fetchStayAdditionalInfo2,
} from '../../apis/publicAPI';
import { useRecoilValue } from 'recoil';
import { regionSelectionState } from '../../recoil/apiDataAtoms';
import Loader from '../Loader/Loader';
import { useEffect, useState, useRef } from 'react';
import leftArrow from '../../assets/left-arrow.avif';
import rightArrow from '../../assets/right-arrow.avif';
import { useParams } from 'react-router-dom';

const StaySelectionResult = () => {
  const param = useParams();
  const region = useRecoilValue(regionSelectionState);
  const [stayCurPage, setStayCurPage] = useState(1);
  const maxPageNo = useRef(1);

  const {
    data,
    isLoading,
    fetchNextPage: fetchStayNextPage,
  } = useInfiniteQuery(
    ['stay_data', region],
    ({ pageParam = 1 }) => fetchStayData({ region, pageParam }),
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
    setStayCurPage(stayCurPage + 1);
    if (data) {
      if (stayCurPage >= data?.pages[maxPageNo.current - 1]?.pageNo) {
        fetchStayNextPage();
      }
    }
  };

  // const {
  //   data: stayAdditionalData1,
  //   isLoading: isLoadingAdditional1,
  // } = useQuery(['stay_additional1', param], () =>
  //   fetchStayAdditionalInfo1({ param }),
  // );

  // const {
  //   data: stayAdditionalData2,
  //   isLoading: isLoadingAdditional2,
  // } = useQuery(['stay_additional2', param], () =>
  //   fetchStayAdditionalInfo1({ param }),
  // );

  // if (stayAdditionalData1 && stayAdditionalData2) {
  //   console.log('숙박 상세 소개', stayAdditionalData1);
  //   console.log('숙박 룸 정보', stayAdditionalData2);
  // }

  useEffect(() => {
    if (data) {
      if (maxPageNo.current < data.pages.length) {
        maxPageNo.current = data.pages.length;
      }
    }
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
          <ListItemCount>
            총 {data.pages[stayCurPage - 1]?.totalCount} 개의 결과
          </ListItemCount>
          <SearchListWrapper>
            <BtnWrapper>
              {data.pages[stayCurPage - 1]?.pageNo - 1 < 1 ? (
                <></>
              ) : (
                <MoveBtnStyle
                  src={leftArrow}
                  alt="이전버튼"
                  onClick={() => setStayCurPage(stayCurPage - 1)}
                />
              )}
            </BtnWrapper>
            <ResultWrapper>
              {data.pages[stayCurPage - 1]?.items.item.map((e) => {
                return (
                  <StayDetail
                    key={e.contentid}
                    id={e.contentid}
                    img={e.firstimage || noimg}
                  >
                    {e.title}
                  </StayDetail>
                );
              })}
            </ResultWrapper>
            <BtnWrapper>
              {Math.ceil(
                data.pages[0]?.totalCount / data.pages[0]?.numOfRows,
              ) <= stayCurPage ? (
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

export default StaySelectionResult;

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
  flex-direction: row;
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
