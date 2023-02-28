import { FetchedStayDataType } from '../apis/publicAPI';
import styled from 'styled-components';
import noimg from '../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';
import TapHeart from '../assets/TapHeart.avif';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../apis/firebase';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const RestaurantDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();
  const [likeData, setLikeData] = useState<DocumentData | undefined>();
  const restaurantRecommendationList = async () => {
    const fbdata = await getDoc(doc(db, 'restaurant_recommendation', props.id));
    if (fbdata) {
      setLikeData(fbdata.data());
    }
  };

  useEffect(() => {
    restaurantRecommendationList();
  }, []);

  return (
    <RestaurantEachItemWrapper>
      <RestaurantImgWrapper>
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
      </RestaurantImgWrapper>
      <MyCildTextBox>
        <MyChildTexth3>{props.children}</MyChildTexth3>
        <MyChildTextp>{props.address}</MyChildTextp>
        <LikeBox>
          <LikeImg src={TapHeart} alt="" />
          <LikeText>{likeData !== undefined ? likeData.likeCnt : 0}</LikeText>
        </LikeBox>
      </MyCildTextBox>
    </RestaurantEachItemWrapper>
  );
};

export default RestaurantDetail;

const RestaurantEachItemWrapper = styled.div`
  width: 20%;
  height: 320px;
  margin: 20px 20px 20px 20px;
  border-radius: 10px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const RestaurantImgWrapper = styled.picture`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const RestaurantEachItemImg = styled.img`
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
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #333333;
  padding-top: 15px;
  padding-left: 10px;
`;

const MyChildTextp = styled.p`
  font-size: 12px;
  color: #7f7f7f;
  margin-top: 4px;
  margin-left: 10px;
`;

const LikeBox = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 20px;
  margin-left: 10px;
  align-items: center;
`;

const LikeImg = styled.img`
  width: 15px;
  height: 15px;
`;

const LikeText = styled.p`
  font-size: 12px;
`;
