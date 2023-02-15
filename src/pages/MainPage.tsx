import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { menuSelectionState } from '../recoil/apiDataAtoms';
import Menu from '../components/Menu/Menu';
import SpotRecommendation from '../components/Recommendation/SpotRecommendation';
import RegionSelection from '../components/Selection/RegionSelection';
import SelectionResult from '../components/Selection/SelectionResult';
import SliderBanner from '../components/SliderBanner';
import StayRecommendation from '../components/Recommendation/StayRecommendation';
import RestaurantRecommendation from '../components/Recommendation/RestaurantRecommendation';
import StaySelectionResult from '../components/Selection/StaySelectionResult';
import RestaurantSelectionResult from '../components/Selection/RestaurantSelectionResult';
import WeeklyTop10 from '../components/Recommendation/WeeklyTop10';
import MyChild from '../components/Recommendation/MyChild';
import BestDate from '../components/Recommendation/BestDate';

const MainPage = () => {
  const [selectedMenu, setSelectedMenu] = useRecoilState(menuSelectionState);
  const selected = sessionStorage.getItem('mainpage_menu_type');
  if (selected) setSelectedMenu(selected);
  useEffect(() => {
    if (selected) setSelectedMenu(selected);
  }, [selected]);
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
          <WeeklyTop10 />
          <MyChild />
          <BestDate />
          {/* <StayRecommendation />
          <RestaurantRecommendation /> */}
        </>
      ) : selectedMenu === '관광지' ? (
        <SelectionResult />
      ) : selectedMenu === '숙박' ? (
        <StaySelectionResult />
      ) : selectedMenu === '음식점' ? (
        <RestaurantSelectionResult />
      ) : (
        <>
          <SliderBanner />
          <SpotRecommendation />
          <WeeklyTop10 />
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
