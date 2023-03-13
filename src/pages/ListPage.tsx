import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { menuSelectionState } from '../recoil/apiDataAtoms';
import { useEffect } from 'react';
import Menu from '../components/Menu/Menu';
import RegionSelection from '../components/Selection/RegionSelection';
import SpotSelectionResult from '../components/Selection/SpotSelectionResult';
import StaySelectionResult from '../components/Selection/StaySelectionResult';
import RestaurantSelectionResult from '../components/Selection/RestaurantSelectionResult';
import PlaceMainTap from '../components/MainTap/PlaceMainTap';
import Footer from '../components/Footer/Footer';
import styled from 'styled-components';

const ListPage = () => {
  const location = useLocation();
  const queryString = location.search;
  const [selectedMenu, setSelectedMenu] = useRecoilState(menuSelectionState);
  const selected = queryString.split('=')[1];

  useEffect(() => {
    if (selected) setSelectedMenu(selected);
  }, [selected]);

  return (
    <Container>
      <Menu />
      {(selectedMenu === 'spot' ||
        selectedMenu === 'restaurant' ||
        selectedMenu === 'stay') && (
        <RegionSelectionBtnWrapper>
          <RegionSelection />
        </RegionSelectionBtnWrapper>
      )}
      <>
        {selectedMenu === 'spot' ? (
          <SpotSelectionResult />
        ) : selectedMenu === 'stay' ? (
          <StaySelectionResult />
        ) : (
          selectedMenu === 'restaurant' && <RestaurantSelectionResult />
        )}
        <PlaceMainTap />
        <Footer />
      </>
    </Container>
  );
};

export default ListPage;

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

const RegionSelectionBtnWrapper = styled.div`
  display: flex;
  padding-top: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
