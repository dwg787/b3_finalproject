import { FetchedStayDataType } from '../apis/publicAPI';
import styled from 'styled-components';
import noimg from '../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';

const RestaurantDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();
  return (
    <RestaurantEachItemWrapper>
      <RestaurantImgWrapper>
        <picture>
          <source srcSet={props.img || noimg} type="image/avif"></source>
          <source srcSet={props.img || noimg} type="image/webp"></source>
          <source srcSet={props.img || noimg} type="image/jpg"></source>
          <RestaurantEachItemImg
            src={props.img || noimg}
            alt="사진"
            decoding="async"
            loading="lazy"
            onClick={() => navigate(`/restaurant/${props.id}`)}
          />
        </picture>
      </RestaurantImgWrapper>
      <RestaurantTitle>{props.children}</RestaurantTitle>
    </RestaurantEachItemWrapper>
  );
};

export default RestaurantDetail;

const RestaurantEachItemWrapper = styled.div`
  width: 20%;
  height: 200px;
  margin: 10px 10px 10px 10px;
`;

const RestaurantImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;

const RestaurantEachItemImg = styled.img`
  width: 250px;
  aspect-ratio: 1;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
`;

const RestaurantTitle = styled.div``;
