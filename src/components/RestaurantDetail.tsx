import { FetchedStayDataType } from '../apis/publicAPI';
import styled from 'styled-components';
import noimg from '../assets/noimg.png';
import { useNavigate } from 'react-router-dom';

const RestaurantDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();
  return (
    <RestaurantEachItemWrapper>
      <RestaurantImgWrapper>
        <RestaurantEachItemImg
          src={props.img || noimg}
          alt='사진'
          onClick={() => navigate(`/restaurant/${props.id}`)}
        />
      </RestaurantImgWrapper>
      <RestaurantTitle>{props.children}</RestaurantTitle>
    </RestaurantEachItemWrapper>
  );
};

export default RestaurantDetail;

const RestaurantEachItemWrapper = styled.div`
  width: 17%;
  height: 200px;
  margin: 10px 10px 10px 10px;
`;

const RestaurantImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;

const RestaurantEachItemImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
`;

const RestaurantTitle = styled.div``;
