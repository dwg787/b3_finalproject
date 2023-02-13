import styled from 'styled-components';
import SpotDetail from '../SpotDetail';
import { FetchedStayDataType } from '../../apis/publicAPI';
import noimg from '../../assets/noimg.png';

const SelectionResult = (propsData: any) => {
  return (
    <SearchOverallResultContainer>
      <SearchListWrapper>
        <ListItemCount>
          총 {propsData.propsData.totalCount} 개의 결과
        </ListItemCount>
        <ResultWrapper>
          {propsData.propsData.items.item.map((e: FetchedStayDataType) => {
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
      </SearchListWrapper>
    </SearchOverallResultContainer>
  );
};

export default SelectionResult;

const SearchOverallResultContainer = styled.div`
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
  /* height: 300px; */
  background-color: #f6d6d6;
  display: flex;
  flex-direction: column;
  /* margin: 10px 10px 10px 10px; */
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
