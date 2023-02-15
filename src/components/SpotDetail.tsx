import { FetchedStayDataType } from '../apis/publicAPI';
import styled from 'styled-components';
import noimg from '../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';

const SpotDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();

  return (
    <SpotEachItemWrapper>
      <SpotImgWrapper>
        <picture>
          <source srcSet={props.img || noimg} type="image/avif"></source>
          <source srcSet={props.img || noimg} type="image/webp"></source>
          <source srcSet={props.img || noimg} type="image/jpg"></source>
          <SpotEachItemImg
            src={props.img || noimg}
            alt="사진"
            // onMouseOver={() => {}}
            decoding="async"
            loading="lazy"
            onClick={() => navigate(`/spot/${props.id}`)}
          />
        </picture>
      </SpotImgWrapper>
      <SpotTitle>{props.children}</SpotTitle>
    </SpotEachItemWrapper>
  );
};

export default SpotDetail;

const SpotEachItemWrapper = styled.div`
  width: 20%;
  height: 200px;
  margin: 10px 10px 10px 10px;
`;

const SpotImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;

const SpotEachItemImg = styled.img`
  width: 300px;
  height: 400px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
`;

const SpotTitle = styled.div``;
