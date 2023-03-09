import styled from 'styled-components';
import Menu from '../components/Menu/Menu';
import WeeklyTop10 from '../components/Recommendation/WeeklyTop10';
import MyChild from '../components/Recommendation/MyChild';
import BestDate from '../components/Recommendation/BestDate';
import MySpot from '../components/Recommendation/MySpot';
import SliderBanner from '../components/SliderBanner';
import SlotBanner from '../components/Slot/SlotBanner';
import EventBenner from '../components/Slot/EventBenner';
import Footer from '../components/Footer/Footer';
// import { useMediaQuery } from 'react-responsive';

const MainPage = () => {
  // const isMobile: boolean = useMediaQuery({
  //   query: '(max-width:820px)',
  // });
  return (
    <Container>
      <Menu />
      <SliderBanner />
      <MySpot />
      <SlotBanner />
      <EventBenner />
      <WeeklyTop10 />
      <MyChild />
      <BestDate />
      <Footer />
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
  /* padding-bottom: 500px; */
  background: linear-gradient(white 5%, #8a98f6);
  position: relative;
  padding-bottom: 150px;
`;

const RegionSelectionBtnWrapper = styled.div`
  display: flex;
  padding-top: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
