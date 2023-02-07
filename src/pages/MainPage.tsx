import { useEffect, useState } from 'react';
import { useQueryClient, useInfiniteQuery, useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchStayData } from '../apis/publicAPI';
import SelectBtn from '../components/SelectBtn';
import SelectRegionBtn from '../components/SelectRegionBtn';
import { STAY_TYPE, AREA_CODE } from '../apis/apiCodes';
import { useRecoilValue } from 'recoil';
import {
  regionSelectionState,
  staySelectionState,
} from '../recoil/apiDataAtoms';
import { FetchedStayDataType } from '../apis/publicAPI';

const MainPage = () => {
  const queryClient = useQueryClient();
  const stay = useRecoilValue(staySelectionState);
  const region = useRecoilValue(regionSelectionState);
  const { data, isLoading } = useQuery(['stay_data', stay, region], () =>
    fetchStayData({ stay, region })
  );

  return (
    <Container>
      {data && (
        <SearchListWrapper>
          {data.map((e: FetchedStayDataType) => {
            return <div key={e.contentid}>{e.title}</div>;
          })}
        </SearchListWrapper>
      )}
      <BtnWrapper>
        <SelectRegionBtnWrapper>
          {AREA_CODE.map((e) => {
            return <SelectRegionBtn key={e.id}>{e.area}</SelectRegionBtn>;
          })}
        </SelectRegionBtnWrapper>
        <SelectStayBtnWrapper>
          {STAY_TYPE.map((e) => {
            return <SelectBtn key={e.id}>{e.type}</SelectBtn>;
          })}
        </SelectStayBtnWrapper>
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
