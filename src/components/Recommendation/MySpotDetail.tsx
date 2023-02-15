import { FetchedStayDataType } from '../../apis/publicAPI';
import styled from 'styled-components';
import noimg from '../../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';

const MySpotDetail = (props: FetchedStayDataType) => {
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
        <SpotTitle>{props.children}</SpotTitle>
      </SpotImgWrapper>
    </SpotEachItemWrapper>
  );
};

export default MySpotDetail;

const SpotEachItemWrapper = styled.div`
  width: 100%;
  height: 420px;
  margin: 40px 20px 10px 20px;
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
  position: relative;
`;

const SpotEachItemImg = styled.img`
  width: 300px;
  height: 420px;
  aspect-ratio: 1;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
  filter: brightness(50%);
`;

const SpotTitle = styled.div`
  position: absolute;
  font-size: 26px;
  font-weight: bold;
  color: white;
  margin-top: 220px;
`;
