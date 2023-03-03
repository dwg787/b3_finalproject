import styled from 'styled-components';
import RestaurantDetail from '../RestaurantDetail';
import { FetchedStayDataType } from '../../types/apiDataTypes';
import noimg from '../../assets/noimg.avif';
import { useQuery } from 'react-query';
import { fetchRestaurantData } from '../../apis/publicAPI';
import { useRecoilValue } from 'recoil';
import { regionSelectionState } from '../../recoil/apiDataAtoms';
import { useCallback, useEffect, useRef, useState } from 'react';
import leftbtn from '../../assets/leftbtn.png';
import rightbtn from '../../assets/rightbtn.png';
import SkeletonSelectionResult from '../Skeleton/SkeletonSelectionResult';
import SkeletonTestFrame from '../Skeleton/SkeletonTestFrame';
import { AREA_CODE } from '../../apis/apiCodes';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const RestaurantSelectionResult = () => {
  const region = useRecoilValue(regionSelectionState);
  const regionText = AREA_CODE.find((e) => e.id === region)?.area;
  const [restCurPage, setRestCurPage] = useState(1);
  const maxPageNo = useRef(1);
  const firstNum = useRef(1);
  //   const lastNum = useRef(5);

  //페이지네이션
  if (restCurPage % 5 === 1) {
    firstNum.current = 5 * Math.floor(restCurPage / 5) + 1;
  }
  if (restCurPage < firstNum.current) {
    firstNum.current = 5 * (Math.floor(restCurPage / 5) - 1) + 1;
  }
  // console.log('레스토랑 렌더링');
  const { data, isFetching, isLoading, isPreviousData } = useQuery(
    ['rest_data', region, restCurPage],
    () => fetchRestaurantData({ region, restCurPage }),
    {
      staleTime: 1000 * 60 * 60,
      keepPreviousData: true,
    },
  );

  const handleFetchNextPage = useCallback(() => {
    setRestCurPage(restCurPage + 1);
  }, [restCurPage]);
  useEffect(() => {
    maxPageNo.current = 1;
    setRestCurPage(1);
  }, [region]);

  return (
    <SearchOverallResultContainer>
      {isLoading || data === undefined ? (
        <>
          <SkeletonTestFrame />
          {/* <Loader /> */}
        </>
      ) : (
        <>
          <ListContainer>
            <ListItemCount>{regionText || '전체'}</ListItemCount>
            <SearchListWrapper>
              <BtnWrapper>
                {data.pageNo - 1 < 1 ? (
                  <></>
                ) : (
                  <MoveBtnStyle
                    src={leftbtn}
                    alt="이전버튼"
                    onClick={() => setRestCurPage(restCurPage - 1)}
                  />
                )}
              </BtnWrapper>
              {isFetching || isLoading ? (
                <SkeletonSelectionResult />
              ) : (
                <ResultWrapper>
                  {data?.items.item.map((e: FetchedStayDataType) => {
                    return (
                      <RestaurantDetail
                        key={e.contentid}
                        id={e.contentid}
                        img={e.firstimage || noimg}
                        address={e.addr1}
                        // like={eachData}
                      >
                        {/* {e.title.split(/[\\(\\[]/)[0]} */}
                        {e.title.split(/[\\[\]\\(\\)]/)[0]
                          ? e.title.split(/[\\[\]\\(\\)]/)[0]
                          : e.title.split(/[\\[\]\\(\\)]/)[2]}
                      </RestaurantDetail>
                    );
                  })}
                </ResultWrapper>
              )}
              <BtnWrapper>
                {Math.ceil(data.totalCount / 8) <= restCurPage ? (
                  <></>
                ) : (
                  <MoveBtnStyle
                    src={rightbtn}
                    alt="다음버튼"
                    onClick={handleFetchNextPage}
                  />
                )}
              </BtnWrapper>
            </SearchListWrapper>
          </ListContainer>
          <PaginationDotsWrapper>
            {data.pageNo - 1 < 1 ? (
              <></>
            ) : (
              <MobilePrevBtn onClick={() => setRestCurPage(restCurPage - 1)} />
            )}
            {Array(Math.ceil(data.totalCount / 8) + 1)
              .fill('')
              .slice(firstNum.current, firstNum.current + 5)
              .map((_, i) => {
                const isSelectedPage =
                  firstNum.current + i === restCurPage ? true : false;
                // console.log('토탈카운', data.totalCount);
                if (firstNum.current + i <= Math.ceil(data.totalCount / 8)) {
                  return (
                    <PaginationDot
                      key={firstNum.current + i}
                      isSelectedPage={isSelectedPage}
                      onClick={() => {
                        setRestCurPage(firstNum.current + i);
                      }}
                    >
                      {firstNum.current + i}
                    </PaginationDot>
                  );
                }
              })}
            {Math.ceil(data.totalCount / 8) <= restCurPage ? (
              <></>
            ) : (
              <MobileNextBtn onClick={handleFetchNextPage} />
            )}
          </PaginationDotsWrapper>
        </>
      )}
    </SearchOverallResultContainer>
  );
};
export default RestaurantSelectionResult;

const SearchOverallResultContainer = styled.div`
  position: relative;
  max-width: 1036px;
  min-width: 390px;
  width: 100%;
  min-height: 632px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #6478ff; */
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 11px;
  box-shadow: 2.16px 2.16px 5.4px rgba(0, 0, 0, 0.18);
  padding-bottom: 50px;
  margin-top: 36px;
`;

const ListItemCount = styled.p`
  margin-top: 30px;
  margin-left: 59px;
  font-size: 17px;
  margin-bottom: 20px;
  margin-top: 40px;
  color: #6478ff;
  font-weight: bold;
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
  width: 94%;
  /* height: 500px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
`;

const BtnWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 30px;
  @media (max-width: 390px) {
    display: none;
  }
`;

const MoveBtnStyle = styled.img`
  width: 18px;
  height: 45px;
  cursor: pointer;
`;

const PaginationDotsWrapper = styled.div`
  margin-top: 30px;
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 10;
`;

const PaginationDot = styled.div<{ isSelectedPage: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  color: ${(props) => (props.isSelectedPage ? '#000000' : '#ffffff')};
  /* color: #878787; */
  font-weight: 800;
  cursor: pointer;
  font-size: 10.11px;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MobilePrevBtn = styled(GrFormPrevious)`
  font-size: 14px;
  cursor: pointer;
  @media (min-width: 391px) {
    display: none;
  }
`;

const MobileNextBtn = styled(GrFormNext)`
  font-size: 14px;
  cursor: pointer;
  @media (min-width: 391px) {
    display: none;
  }
`;
