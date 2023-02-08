import { useEffect, useState } from 'react';
import { useQueryClient, useInfiniteQuery, useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchAttractionData } from '../apis/publicAPI';
import SelectBtn from '../components/SelectBtn';
import SelectRegionBtn from '../components/SelectRegionBtn';
import { STAY_TYPE, AREA_CODE } from '../apis/apiCodes';
import { useRecoilValue } from 'recoil';
import {
  regionSelectionState,
  staySelectionState,
} from '../recoil/apiDataAtoms';
import { FetchedStayDataType } from '../apis/publicAPI';
import SpotDetail from '../components/SpotDetail';
import Loader from '../components/Loader';

const MainPage = () => {
  const queryClient = useQueryClient();
  const stay = useRecoilValue(staySelectionState);
  const region = useRecoilValue(regionSelectionState);
  const { data, isLoading } = useQuery(['attractions_data', stay, region], () =>
    fetchAttractionData({ stay, region })
  );

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <SearchListWrapper>
          <ListItemCount>총 {data.totalCount} 개의 결과</ListItemCount>
          {data.items.item.map((e: FetchedStayDataType) => {
            return (
              <SpotDetail key={e.contentid} id={e.contentid}>
                {e.title}
              </SpotDetail>
            );
          })}
        </SearchListWrapper>
      )}
      {/* {data ? (
        <SearchListWrapper>
          <ListItemCount>총 {data.totalCount} 개의 결과</ListItemCount>
          {data.items.item.map((e: FetchedStayDataType) => {
            return (
              <StayDetail key={e.contentid} id={e.contentid}>
                {e.title}
              </StayDetail>
            );
          })}
        </SearchListWrapper>
      ) : (
        <SearchListWrapper></SearchListWrapper>
      )} */}
      <BtnWrapper>
        <SelectRegionBtnWrapper>
          {AREA_CODE.map((e) => {
            return <SelectRegionBtn key={e.id}>{e.area}</SelectRegionBtn>;
          })}
        </SelectRegionBtnWrapper>
        {/* <SelectStayBtnWrapper>
          {STAY_TYPE.map((e) => {
            return <SelectBtn key={e.id}>{e.type}</SelectBtn>;
          })}
        </SelectStayBtnWrapper> */}
      </BtnWrapper>
    </Container>
  );
};

export default MainPage;

const BtnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SelectRegionBtnWrapper = styled.div`
  width: 300px;
  height: 500px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const SelectStayBtnWrapper = styled.div`
  width: 300px;
  height: 300px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const SearchListWrapper = styled.div`
  width: 500;
  height: 100%;
  /* background-color: #dddada; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ListItemCount = styled.p`
  margin-bottom: 30px;
`;
