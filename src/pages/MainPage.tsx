import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { menuSelectionState } from '../recoil/apiDataAtoms';
import Menu from '../components/Menu/Menu';
import SpotRecommendation from '../components/Recommendation/SpotRecommendation';
import RegionSelection from '../components/Selection/RegionSelection';
import SelectionResult from '../components/Selection/SelectionResult';
import SliderBanner from '../components/SliderBanner';
import StayRecommendation from '../components/Recommendation/StayRecommendation';
import RestaurantRecommendation from '../components/Recommendation/RestaurantRecommendation';

const MainPage = () => {
  const selectedMenu = useRecoilValue(menuSelectionState);

  return (
    <Container>
      <Menu />
      {(selectedMenu === '관광지' ||
        selectedMenu === '음식점' ||
        selectedMenu === '숙박') && <RegionSelection />}
      {selectedMenu === 'HOME' ? (
        <>
          <SliderBanner />
          <SpotRecommendation />
          <StayRecommendation />
          <RestaurantRecommendation />
        </>
      ) : selectedMenu === '관광지' ? (
        <SelectionResult />
      ) : selectedMenu === '숙박' ? (
        <div>숙박 정보 준비중</div>
      ) : selectedMenu === '음식점' ? (
        <div>음식점 정보 준비중</div>
      ) : (
        <>
          <SliderBanner />
          <SpotRecommendation />
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
