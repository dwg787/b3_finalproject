import { useEffect, useState } from 'react';
import { useQueryClient, useInfiniteQuery, useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchStayData } from '../apis/publicAPI';
import SelectBtn from '../components/SelectBtn';
import { STAY_TYPE } from '../apis/apiCodes';
import { useRecoilValue } from 'recoil';
import { staySelectionState } from '../recoil/apiDataAtoms';
import { FetchedStayDataType } from '../apis/publicAPI';

const MainPage = () => {
  const queryClient = useQueryClient();
  const stay = useRecoilValue(staySelectionState);
  const { data, isLoading } = useQuery(['stay_data', stay], () =>
    fetchStayData({ stay })
  );

  return (
    <>
      메인페이지
      {data && (
        <SearchListWrapper>
          {data.map((e: FetchedStayDataType) => {
            return <div key={e.contentid}>{e.title}</div>;
          })}
        </SearchListWrapper>
      )}
      <SelectRegionBtnWrapper>
        {STAY_TYPE.map((e) => {
          // return <button onClick={handleStaySelection}>{e}</button>;
          return <SelectBtn key={e.id}>{e.type}</SelectBtn>;
          // if (!isLoading) {
          // }
        })}
      </SelectRegionBtnWrapper>
    </>
  );
};

export default MainPage;

const SelectRegionBtnWrapper = styled.div`
  width: 500px;
  height: 500px;
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
  background-color: #dddada;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
