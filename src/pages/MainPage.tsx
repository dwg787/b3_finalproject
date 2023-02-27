import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { menuSelectionState } from '../recoil/apiDataAtoms';
import Menu from '../components/Menu/Menu';
import RegionSelection from '../components/Selection/RegionSelection';
import SliderBanner from '../components/SliderBanner';
import StaySelectionResult from '../components/Selection/StaySelectionResult';
import RestaurantSelectionResult from '../components/Selection/RestaurantSelectionResult';
import WeeklyTop10 from '../components/Recommendation/WeeklyTop10';
import MyChild from '../components/Recommendation/MyChild';
import BestDate from '../components/Recommendation/BestDate';
import MySpot from '../components/Recommendation/MySpot';
import { useEffect } from 'react';
import SpotSelectionResult from '../components/Selection/SpotSelectionResult';
import Footer from '../components/Footer/Footer';
import BlackFooter from '../components/Footer/BlackFooter';
import SpotMainTap from '../components/MainTap/SpotMainTap';
import StayMainTap from '../components/MainTap/StayMainTap';
import RestaurantMainTap from '../components/MainTap/RestaurantMainTap';
import SlotBanner from '../components/Slot/SlotBanner';

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
          <SlotBanner />
          <WeeklyTop10 />
          {/* <WeeklyTop10v2 /> */}
          <MyChild />
          <BestDate />
          <Footer />
          {/* <StayRecommendation />
          <RestaurantRecommendation /> */}
        </>
      ) : selectedMenu === '관광지' ? (
        <>
          <SpotSelectionResult />
          <SpotMainTap />
          <BlackFooter />
        </>
      ) : // <SelectionResult />
      selectedMenu === '숙박' ? (
        <>
          <StaySelectionResult />
          <StayMainTap />
          <BlackFooter />
        </>
      ) : selectedMenu === '음식점' ? (
        <>
          <RestaurantSelectionResult />
          <RestaurantMainTap />
          <BlackFooter />
        </>
      ) : (
        <>
          <SliderBanner />
          <MySpot />
          <SlotBanner />
          <WeeklyTop10 />
          {/* <WeeklyTop10v2 /> */}
          <MyChild />
          <BestDate />
          <Footer />
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
  padding-bottom: 500px;
  background: linear-gradient(white 40%, #8a98f6);
  position: relative;
`;

const RegionSelectionBtnWrapper = styled.div`
  display: flex;
  padding-top: 30px;
  /* align-items: center; */
  justify-content: center;
  width: 70%;
  height: 200px;
`;
