import { FetchedStayDataType } from '../types/apiDataTypes';
import styled from 'styled-components';
import noimg from '../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';
import TapHeart from '../assets/TapHeart.avif';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../apis/firebase';
import { useEffect, useState } from 'react';

const SpotDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();

  const [likeData, setLikeData] = useState<DocumentData | undefined>();
  const spotRecommendationList = async () => {
    const fbdata = await getDoc(doc(db, 'spot_recommendation', `${props.id}`));
    if (fbdata) {
      setLikeData(fbdata.data());
    }
  };

  useEffect(() => {
    spotRecommendationList();
  }, []);

  return (
    <SpotEachItemWrapper>
      <SpotImgWrapper>
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
      </SpotImgWrapper>
      <MyCildTextBox>
        <MyChildTexth3>{props.children}</MyChildTexth3>
        <MyChildTextp>{props.address}</MyChildTextp>
        <LikeBox>
          <LikeImg src={TapHeart} alt="" />
          <LikeText>{likeData !== undefined ? likeData.likeCnt : 0}</LikeText>
        </LikeBox>
      </MyCildTextBox>
    </SpotEachItemWrapper>
  );
};

export default SpotDetail;

const SpotEachItemWrapper = styled.div`
  width: 216px;
  height: 234px;
  /* margin: 20px 20px 20px 20px; */
  margin-bottom: 35.66px;
  border-radius: 7px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SpotImgWrapper = styled.picture`
  width: 100%;
  height: 138.94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const SpotEachItemImg = styled.img`
  width: 220px;
  height: 300px;
  /* aspect-ratio: 1.2; */
  background-color: white;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
`;

const MyCildTextBox = styled.div`
  background-color: #fff;
  height: 130px;
`;

const MyChildTexth3 = styled.h3`
  font-size: 15.84px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #333333;
  padding-top: 15px;
  padding-left: 19.81px;
`;

const MyChildTextp = styled.p`
  height: 20px;
  font-size: 11.72px;
  color: #7f7f7f;
  margin-top: 4px;
  margin-left: 19.81px;
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10.83px;
  margin-left: 142.95px;
  align-items: center;
`;

const LikeImg = styled.img`
  width: 20.64px;
  height: 17.25px;
`;

const LikeText = styled.p`
  font-size: 15.62px;
`;
