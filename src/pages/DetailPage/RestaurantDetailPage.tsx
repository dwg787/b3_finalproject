import { useEffect } from 'react';
import { fetchRestaurantDetailInfo } from '../../apis/publicAPI';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../../components/Loader/Loader';
import KakaoMap from '../../components/Map/KakaoMap';
import { getDoc, setDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { FetchedStayDataType } from '../../apis/publicAPI';
import { db } from '../../apis/firebase';
import RestaurantLiked from '../../components/Liked/RestaurantLiked';
import MapImoji from '../../components/Map/MapImoji';
import DetailScroll from '../../components/Scroll/DetailScroll';
import Communication from '../../components/Review/Communication';
import Notification from '../../components/Notification/Notification';
import noimg from '../../assets/noimg.avif';

import {
  DetailWrap,
  Container,
  DeatilBox,
  DeatilImojiBox,
  CommunicationWrap,
  DetailInfo,
  DetailInfoText,
  DetailInfoTextBox,
  DetailInformation,
  SideInfoWrapper,
  DetailImg,
  DetailImgBox,
  DetailText,
  DetailTextArr,
  DeatilTextBox,
  DetailInfoAdd,
  DetailInformationMap,
  TabHr,
  RecommendSide,
} from './styles';

const RestaurantDetailPage = () => {
  const param = useParams();
  const {
    data: restaurantDetailData,
    isLoading: isLoadingRestaurantDetail,
  } = useQuery(['restaurant_detail', param], () =>
    fetchRestaurantDetailInfo({ param }),
  );

  const getRestaurantRecCnt = async () => {
    if (param.id) {
      const data = await getDoc(
        doc(db, 'restaurant_recommendation', `${param.id}`),
      );
      return data.data();
    } else {
      return;
    }
  };

  const updateRestaurantRecCnt = async () => {
    if (param.id) {
      await updateDoc(doc(db, 'restaurant_recommendation', param.id), {
        viewCnt: increment(1),
      });
    }
  };

  const saveNewRestaurantRecCnt = async (spotData: FetchedStayDataType) => {
    if (param.id) {
      await setDoc(doc(db, 'restaurant_recommendation', param.id), {
        ...restaurantDetailData,
        viewCnt: 1,
      });
    }
  };

  useEffect(() => {
    const getFirestoreRecCnt = async () => {
      const res = await getRestaurantRecCnt();
      if (res) {
        updateRestaurantRecCnt();
      } else {
        if (restaurantDetailData) saveNewRestaurantRecCnt(restaurantDetailData);
      }
    };
    getFirestoreRecCnt();
  }, [restaurantDetailData]);

  console.log('식당정보', restaurantDetailData);
  return (
    <DetailWrap>
      <Container>
        {isLoadingRestaurantDetail ? (
          <Loader />
        ) : (
          <>
            {restaurantDetailData ? (
              <DeatilBox key={param.id}>
                {/* <Link to={'/'}>메인으로</Link> */}
                <DetailScroll />
                <TabHr />
                <DeatilTextBox>
                  <DetailText>{restaurantDetailData.title}</DetailText>
                  <DetailTextArr>
                    {restaurantDetailData.addr1.split(' ', 2)}
                  </DetailTextArr>
                  <DeatilImojiBox>
                    <RestaurantLiked
                      restaurantDetailData={restaurantDetailData}
                    />

                    {/* <Link to={`/${param.id}/map`}>
                      <MapImoji />
                    </Link> */}
                  </DeatilImojiBox>
                </DeatilTextBox>

                <DetailImgBox id="1">
                  <DetailImg
                    src={restaurantDetailData.firstimage || noimg}
                    alt="사진"
                  />
                </DetailImgBox>

                <DetailInformation id="2">
                  {/* <DetailInfoTextBox>
                  <DetailInfoText>상세정보</DetailInfoText>
                </DetailInfoTextBox> */}

                  <DetailInfo>
                    {restaurantDetailData.overview.split('.', 4)}
                  </DetailInfo>

                  <DetailInfoAdd>
                    <span style={{ fontWeight: '700', marginRight: '27px' }}>
                      주소
                    </span>
                    {restaurantDetailData.addr1}
                  </DetailInfoAdd>
                </DetailInformation>

                <DetailInformationMap id="3">
                  <KakaoMap
                    mapx={restaurantDetailData.mapx}
                    mapy={restaurantDetailData.mapy}
                  />
                </DetailInformationMap>

                <CommunicationWrap id="4">
                  <DetailInfoTextBox>
                    <DetailInfoText>여행톡</DetailInfoText>
                  </DetailInfoTextBox>

                  <Communication />
                </CommunicationWrap>

                <Notification />

                {/* <div>{e.homepage}</div> */}
              </DeatilBox>
            ) : (
              <div>찾으시는 정보가 없습니다</div>
            )}
          </>
        )}

        <RecommendSide id="5">
          {/* <StayInfo spotData={spotData} />
        <RestaurantInfo spotData={spotData} /> */}
        </RecommendSide>
      </Container>
    </DetailWrap>
  );
};

export default RestaurantDetailPage;
