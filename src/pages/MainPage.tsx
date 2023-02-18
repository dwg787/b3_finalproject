import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { menuSelectionState } from '../recoil/apiDataAtoms';
import Menu from '../components/Menu/Menu';
import RegionSelection from '../components/Selection/RegionSelection';
// import SelectionResult from '../components/Selection/SelectionResult';
import SliderBanner from '../components/SliderBanner';
// import StayRecommendation from '../components/Recommendation/StayRecommendation';
// import RestaurantRecommendation from '../components/Recommendation/RestaurantRecommendation';
import StaySelectionResult from '../components/Selection/StaySelectionResult';
import RestaurantSelectionResult from '../components/Selection/RestaurantSelectionResult';
import WeeklyTop10 from '../components/Recommendation/WeeklyTop10';
import MyChild from '../components/Recommendation/MyChild';
import BestDate from '../components/Recommendation/BestDate';
import MySpot from '../components/Recommendation/MySpot';
import { useEffect } from 'react';
import WeeklyTop10v2 from '../components/Recommendation/WeeklyTop10v2';
import SpotSelectionResult from '../components/Selection/SpotSelectionResult';

const MainPage = () => {
  const [selectedMenu, setSelectedMenu] = useRecoilState(menuSelectionState);
  const selected = sessionStorage.getItem('mainpage_menu_type');

  useEffect(() => {
    if (selected) setSelectedMenu(selected);
  }, [selected]);

  return (
    <Container>
      <Menu />
      {(selectedMenu === '관광지' ||
        selectedMenu === '음식점' ||
        selectedMenu === '숙박') && (
        <RegionSelectionBtnWrapper>
          <RegionSelection />
        </RegionSelectionBtnWrapper>
      )}
      {selectedMenu === 'HOME' ? (
        <>
          <SliderBanner />
          <MySpot />
          <WeeklyTop10 />
          {/* <WeeklyTop10v2 /> */}
          <MyChild />
          <BestDate />
          {/* <StayRecommendation />
          <RestaurantRecommendation /> */}
        </>
      ) : selectedMenu === '관광지' ? (
        <SpotSelectionResult />
      ) : // <SelectionResult />
      selectedMenu === '숙박' ? (
        <StaySelectionResult />
      ) : selectedMenu === '음식점' ? (
        <RestaurantSelectionResult />
      ) : (
        <>
          <SliderBanner />
          <MySpot />
          <WeeklyTop10 />
          {/* <WeeklyTop10v2 /> */}
          <MyChild />
          <BestDate />
          {/* <StayRecommendation />
          <RestaurantRecommendation /> */}
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
  background: linear-gradient(white 40%, #6478ff);
`;

const RegionSelectionBtnWrapper = styled.div`
  display: flex;
  padding-top: 30px;
  /* align-items: center; */
  justify-content: center;
  width: 70%;
  height: 200px;
`;
