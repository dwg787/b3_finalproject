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
        <SpotTopdiv>관광</SpotTopdiv>
        <SpotTitle>{props.children}</SpotTitle>
        <SpotSubText1>여긴어때?</SpotSubText1>
        <SpotSubText2>Click Here!</SpotSubText2>
      </SpotImgWrapper>
    </SpotEachItemWrapper>
  );
};

export default MySpotDetail;

const SpotEachItemWrapper = styled.div`
  width: 100%;
  height: 420px;
  margin: 40px 20px 10px 20px;
  border-radius: 15px;
`;

const SpotImgWrapper = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
`;

const SpotEachItemImg = styled.img`
  width: 300px;
  height: 420px;
  aspect-ratio: 1;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
    border-radius: 15px;
  }
  filter: brightness(50%);
  /* border-radius: 15px; */
`;

const SpotTitle = styled.div`
  position: absolute;
  font-size: 26px;
  font-weight: bold;
  color: white;
  margin-top: 220px;
`;

const SpotSubText1 = styled.p`
  color: white;
  position: absolute;
  margin-top: 300px;
  font-size: 16px;
`;

const SpotSubText2 = styled.p`
  color: white;
  position: absolute;
  margin-top: 340px;
  font-weight: bold;
`;

const SpotTopdiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 60px;
  height: 28px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-bottom: 360px;
  margin-right: 200px;
`;
