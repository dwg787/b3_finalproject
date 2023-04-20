import { FetchedStayDataType } from '../types/apiDataTypes';
import styled from 'styled-components';
import noimg from '../assets/noimg.avif';
import { useLocation, useNavigate } from 'react-router-dom';
import TapHeart from '../assets/TapHeart.avif';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../apis/firebase';
import { useEffect, useState, useCallback } from 'react';

const PlaceDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sort = location.search.split('=')[1] || 'spot';
  const [likeData, setLikeData] = useState<DocumentData | undefined>();

  const placeRecommendationList = useCallback(async () => {
    const fbdata = await getDoc(
      doc(db, `${sort}_recommendation`, `${props.id}`),
    );
    if (fbdata) {
      setLikeData(fbdata.data());
    }
  }, []);

  useEffect(() => {
    placeRecommendationList();
  }, []);

  console.log(likeData);

  return (
    <PlaceEachItemWrapper onClick={() => navigate(`/${sort}/${props.id}`)}>
      <PlaceImgWrapper>
        <source
          srcSet={props.img || noimg}
          type="image/avif"
          width="220px"
          height="300px"
        ></source>
        <source
          srcSet={props.img || noimg}
          type="image/webp"
          width="220px"
          height="300px"
        ></source>
        <source
          srcSet={props.img || noimg}
          type="image/jpg"
          width="220px"
          height="300px"
        ></source>
        <PlaceEachItemImg
          src={props.img || noimg}
          alt="사진"
          decoding="async"
          loading="lazy"
        />
      </PlaceImgWrapper>
      <MyCildTextBox>
        <MyChildTexth3>{props.children}</MyChildTexth3>
        <MyChildTextp>{props.address}</MyChildTextp>
        <LikeBox>
          <LikeImg src={TapHeart} alt="" />
          <LikeText>{likeData !== undefined ? likeData.likeCnt : 0}</LikeText>
        </LikeBox>
      </MyCildTextBox>
    </PlaceEachItemWrapper>
  );
};

export default PlaceDetail;

const PlaceEachItemWrapper = styled.div`
  width: 216px;
  height: 234px;
  margin-bottom: 35.66px;
  border-radius: 7px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  @media (max-width: 820px) {
    width: 164px;
    height: 177px;
    border-radius: 6px;
    margin-bottom: 0px;
  }
`;

const PlaceImgWrapper = styled.picture`
  width: 100%;
  height: 138.94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  @media (max-width: 820px) {
    height: 100px;
  }
`;

const PlaceEachItemImg = styled.img`
  width: 220px;
  height: 300px;
  background-color: white;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  overflow: hidden;
  position: relative;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
  @media (max-width: 820px) {
    width: 164px;
    height: 100px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
`;

const MyCildTextBox = styled.div`
  background-color: #fff;
  height: 130px;
  @media (max-width: 820px) {
    height: 77px;
  }
`;

const MyChildTexth3 = styled.h3`
  font-size: 15.84px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #333333;
  padding-top: 15px;
  padding-left: 19.81px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 820px) {
    font-size: 13px;
    padding-top: 13px;
    padding-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const MyChildTextp = styled.p`
  height: 20px;
  font-size: 11.72px;
  color: #7f7f7f;
  margin-top: 4px;
  margin-left: 19.81px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 820px) {
    font-size: 10px;
    margin-left: 12px;
  }
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10.83px;
  margin-left: 152.95px;
  align-items: center;
  @media (max-width: 820px) {
    margin-top: 5px;
    margin-left: 112px;
  }
`;

const LikeImg = styled.img`
  width: 20.64px;
  height: 17.25px;
  @media (max-width: 820px) {
    width: 17px;
    height: 16px;
  }
`;

const LikeText = styled.p`
  font-size: 15.62px;
  @media (max-width: 820px) {
    font-size: 12px;
  }
`;
