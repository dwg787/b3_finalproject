import styled from 'styled-components';
import MyRestaurantLiked from './MyRestaurantLiked';

const MyFav = () => {
  return (
    <StFavWrap>
      <MyRestaurantLiked />
    </StFavWrap>
  );
};

export default MyFav;

const StFavWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;
