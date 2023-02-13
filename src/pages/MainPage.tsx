import { useQueryClient, useInfiniteQuery, useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchSpotData } from '../apis/publicAPI';
import { useRecoilValue } from 'recoil';

import {
  menuSelectionState,
  regionSelectionState,
  staySelectionState,
} from '../recoil/apiDataAtoms';
import Loader from '../components/Loader/Loader';
import Menu from '../components/Menu/Menu';
import SpotRecommendation from '../components/Recommendation/SpotRecommendation';
import RegionSelection from '../components/Selection/RegionSelection';
import SelectionResult from '../components/Selection/SelectionResult';
import SliderBanner from '../components/SliderBanner';
import StayRecommendation from '../components/Recommendation/StayRecommendation';
import RestaurantRecommendation from '../components/Recommendation/RestaurantRecommendation';

const MainPage = () => {
  const region = useRecoilValue(regionSelectionState);
  const selectedMenu = useRecoilValue(menuSelectionState);
  const { data, isLoading } = useQuery(['spot_data', region], () =>
    fetchSpotData({ region })
  );

  return (
    <Container>
      <Menu />
      {(selectedMenu === '관광지' ||
        selectedMenu === '음식점' ||
        selectedMenu === '숙박') && <RegionSelection />}
      {isLoading ? (
        <Loader />
      ) : selectedMenu === 'HOME' ? (
        <>
          <SliderBanner />
          <SpotRecommendation propsData={data?.items.item} />
          <StayRecommendation />
          <RestaurantRecommendation />
        </>
      ) : selectedMenu === '관광지' ? (
        <SelectionResult propsData={data} />
      ) : selectedMenu === '숙박' ? (
        <div>숙박 정보 준비중</div>
      ) : selectedMenu === '음식점' ? (
        <div>음식점 정보 준비중</div>
      ) : (
        <>
          <SliderBanner />
          <SpotRecommendation propsData={data?.items.item} />
          <StayRecommendation />
          <RestaurantRecommendation />
        </>
      )}
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const MainImg = styled.img`
  width: 100%;
  height: 100%;
`;
