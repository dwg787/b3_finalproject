import { FetchedStayDataType } from '../apis/publicAPI';
import styled from 'styled-components';
import noimg from '../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';

const StayDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();

  return (
    <StayEachItemWrapper>
      <StayImgWrapper>
        <picture>
          <source srcSet={props.img || noimg} type="image/avif"></source>
          <source srcSet={props.img || noimg} type="image/webp"></source>
          <source srcSet={props.img || noimg} type="image/jpg"></source>
          <StayEachItemImg
            src={props.img || noimg}
            alt="사진"
            decoding="async"
            loading="lazy"
            onClick={() => navigate(`/stay/${props.id}`)}
          />
        </picture>
      </StayImgWrapper>
      <StayTitle>{props.children}</StayTitle>
    </StayEachItemWrapper>
  );
};

export default StayDetail;

const StayEachItemWrapper = styled.div`
  width: 20%;
  height: 200px;
  margin: 10px 10px 10px 10px;
`;

const StayImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;

const StayEachItemImg = styled.img`
  width: 300px;
  height: 400px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
`;

const StayTitle = styled.div``;
