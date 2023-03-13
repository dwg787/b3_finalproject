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

const MainPage = () => {
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
  background: linear-gradient(white 5%, #8a98f6);
  position: relative;
  padding-bottom: 150px;
`;
