import { useQueryClient, useInfiniteQuery, useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchSpotData } from '../apis/publicAPI';
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
import Menu from '../components/Menu';
import mainImg from '../assets/mainImg.png';
import mainImg2 from '../assets/mainImg2.png';
import Recommendation from '../components/Recommendation/Recommendation';

const MainPage = () => {
  const queryClient = useQueryClient();
  const region = useRecoilValue(regionSelectionState);
  const { data, isLoading } = useQuery(['spot_data', region], () =>
    fetchSpotData({ region })
  );

  return (
    <Container>
      <Menu />
      <SelectRegionBtnWrapper>
        {/* <MainImg src={mainImg} alt='이미지' /> */}
        {AREA_CODE.map((e) => {
          return <SelectRegionBtn key={e.id}>{e.area}</SelectRegionBtn>;
        })}
      </SelectRegionBtnWrapper>
      {isLoading ? <Loader /> : <Recommendation propsData={data.items.item} />}
      {isLoading ? (
        <Loader />
      ) : (
        <SearchOverallResultContainer>
          <ListItemCount>총 {data.totalCount} 개의 결과</ListItemCount>
          <SearchListWrapper>
            {data.items.item.map((e: FetchedStayDataType) => {
              return (
                <SpotDetail
                  key={e.contentid}
                  id={e.contentid}
                  img={e.firstimage}
                >
                  {e.title}
                </SpotDetail>
              );
            })}
          </SearchListWrapper>
        </SearchOverallResultContainer>
      )}
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
  width: 100%;
  height: 500px;
  padding-top: 10px;
  background-image: url(${mainImg2});
  background-size: cover;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  /* flex-wrap: wrap; */
  /* justify-content: center; */
  gap: 10px;
`;

const SelectStayBtnWrapper = styled.div`
  width: 300px;
  height: 300px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
  align-items: center;
  justify-content: center;
`;

const SearchListWrapper = styled.div`
  width: 100%;
  /* height: 300px; */
  background-color: #f6d6d6;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  /* margin: 10px 10px 10px 10px; */
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListItemCount = styled.div`
  margin-bottom: 30px;
  margin-left: 30px;
`;

const SearchOverallResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
`;
