import { FetchedStayDataType } from '../../../apis/publicAPI';
import styled from 'styled-components';
import noimg from '../../../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';
import TapHeart from '../../../assets/TapHeart.avif';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../../../apis/firebase';
import { useEffect, useState } from 'react';

const MobileSpotDetail = (props: FetchedStayDataType) => {
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

  //   console.log('모바일 반응 props:', props);

  return (
    <StTicketCard>
      <StTicketCardLeft onClick={() => navigate(`/spot/${props.contentid}`)}>
        <StMyTicketImage src={props.img || noimg} alt="사진" />
      </StTicketCardLeft>
      <StTicketCardRight>
        <StCartTitle>{props.children.split('[', 1)}</StCartTitle>
        <StCartTitleAdd>{props.addr1}</StCartTitleAdd>
        {/* 좋아요카운트 */}
        <>
          <LikeImg src={TapHeart} alt="" />
          <LikeText>{likeData !== undefined ? likeData.likeCnt : 0}</LikeText>
        </>
        {/* <StCartTitleAdd>{data.viewCnt}</StCartTitleAdd> */}
      </StTicketCardRight>
    </StTicketCard>
  );
};

export default MobileSpotDetail;

const LikeText = styled.p`
  font-size: 12px;
`;

const StTicketCard = styled.div`
  width: 480.01px;
  /* height: 172.54px; */
  height: 86.27px;
  margin: 0 0 18.8px 0;
  border-radius: 11.41px;
  align-items: center;
  clear: both;
  display: flex;
  flex-direction: row;
  background-size: contain;
  box-shadow: 3px 3px 5px grey;
`;

const StTicketCardLeft = styled.div`
  width: 254px;
  /* height: 172.54px; */
  height: 86.27px;
  box-sizing: border-box;
  border-radius: 5px;
  /* position: relative; */
  cursor: pointer;
`;

const StTicketCardRight = styled.div`
  width: 226px;
  /* height: 172.54px; */
  height: 86.27px;
  box-sizing: border-box;
  border-radius: 5px;
  flex-direction: column;
  display: flex;
  position: relative;
`;

const StMyTicketImage = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 11.41px;
  cursor: pointer;
  display: flex;
`;

const StCartTitle = styled.span`
  color: #4d4d4d;
  font-weight: 900;
  z-index: 100;
  font-size: 19.7px;
  line-height: 18.4px;
  margin: 22.15px 31.01px 11.21px 30.42px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StCartTitleAdd = styled(StCartTitle)`
  margin: 0 31.01px 0 30.42px;
  font-size: 15.44px;
  line-height: 24.8px;
`;

const StCartMenu = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15.75px;
  line-height: 14.1px;
  font-weight: 500;
  width: 62px;
  height: 33.54px;
  border-radius: 239.36px;
  background-color: rgba(77, 77, 77, 0.56);
  margin: 17.89px 18.58px 0 0;
`;

const StTicketHeader = styled.div`
  display: flex;
  justify-content: right;
  position: absolute;
  width: 254px;
  height: 172.54px;
`;

const StTicketHeader2 = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  width: 226px;
  height: 172.54px;
  padding: 10px;
`;

const LikeImg = styled.img`
  width: 15px;
  height: 15px;
`;
