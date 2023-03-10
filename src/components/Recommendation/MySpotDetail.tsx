import { FetchedStayDataType } from '../../types/apiDataTypes';
import styled from 'styled-components';
import noimg from '../../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';

const MySpotDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();

  return (
    <SpotEachItemWrapper>
      <SpotImgWrapper>
        <picture>
          <source
            srcSet={props.img || noimg}
            type="image/avif"
            width="300px"
            height="350px"
          ></source>
          <source
            srcSet={props.img || noimg}
            type="image/webp"
            width="300px"
            height="350px"
          ></source>
          <source
            srcSet={props.img || noimg}
            type="image/jpg"
            width="300px"
            height="350px"
          ></source>
          <SpotEachItemImg
            src={props.img || noimg}
            alt="사진"
            decoding="async"
            loading="lazy"
            onClick={() => navigate(`/spot/${props.id}`)}
          />
        </picture>
        <SpotTopdiv>관광</SpotTopdiv>
        <SpotTitle>{props.children}</SpotTitle>
      </SpotImgWrapper>
    </SpotEachItemWrapper>
  );
};

export default MySpotDetail;

const SpotEachItemWrapper = styled.div`
  width: 100%;
  height: 420px;
  margin: 22.02px 0px 10px 20px;
  border-radius: 15px;
  @media screen and (max-width: 820px) {
    height: 200px;
  }
`;

const SpotImgWrapper = styled.div`
  width: 273.86px;
  height: 340.49px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 7.91px;
  overflow: hidden;
  position: relative;
  box-shadow: 2.26px 2.26px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 820px) {
    width: 160px;
    height: 200px;
  }
`;

const SpotEachItemImg = styled.img`
  width: 300px;
  height: 350px;
  /* aspect-ratio: 1; */
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
    border-radius: 15px;
  }
  filter: brightness(50%);
  /* border-radius: 15px; */
  @media screen and (max-width: 820px) {
    width: 160px;
    height: 200px;
  }
`;

const SpotTitle = styled.div`
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-top: 207.16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 820px) {
    margin-top: 138.82px;
    font-size: 14.12px;
  }
`;

// const SpotSubText1 = styled.p`
//   color: white;
//   position: absolute;
//   margin-top: 251.68px;
//   font-size: 12.86px;
// `;

// const SpotSubText2 = styled.p`
//   color: white;
//   position: absolute;
//   margin-top: 250px;
//   font-weight: bold;
// `;

const SpotTopdiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  width: 60.98px;
  height: 33.32px;
  border-radius: 231.35px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-bottom: 280px;
  margin-right: 180px;
  @media screen and (max-width: 820px) {
    margin-top: 118.82px;
    margin-right: 105px;
    width: 36px;
    height: 20px;
    font-size: 10px;
  }
`;
