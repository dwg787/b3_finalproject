import {
  DetailWrap,
  Container,
  DeatilBox,
  DeatilImojiBox,
  CommunicationWrap,
  DetailInfo,
  DetailInformation,
  DetailImg,
  DetailImgBox,
  DetailText,
  DetailTextArr,
  DeatilTextBox,
  DetailInfoAdd,
  DetailInformationMap,
  TabHr,
  SideInfoWrapper,
} from './styles';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { db } from '../../apis/firebase';
import noimg from '../../assets/noimg.avif';
import { useParams, Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import KakaoMap from '../../components/Map/KakaoMap';
import { FetchedStayDataType } from '../../apis/publicAPI';
import DetailScroll from '../../components/Scroll/DetailScroll';
import { fetchRestaurantDetailInfo } from '../../apis/publicAPI';
import Communication from '../../components/Review/Communication';
import Notification from '../../components/Notification/Notification';
import RestaurantLiked from '../../components/Liked/RestaurantLiked';
import { getDoc, setDoc, doc, updateDoc, increment } from 'firebase/firestore';
import StayInfo from '../../components/Recommendation/StayInfo';
import RestaurantInfo from '../../components/Recommendation/RestaurantInfo';
import SpotInfo from '../../components/Recommendation/SpotInfo';
import MapImoji from '../../components/Map/MapImoji';

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
                    {/* <Liked restaurantDetailData={restaurantDetailData} /> */}
                    <RestaurantLiked
                      restaurantDetailData={restaurantDetailData}
                    />

                    <Link to={`/${param.id}/map`}>
                      <MapImoji />
                    </Link>
                  </DeatilImojiBox>
                </DeatilTextBox>

                <DetailImgBox id="1">
                  <DetailImg
                    src={restaurantDetailData.firstimage || noimg}
                    alt="사진"
                  />
                </DetailImgBox>

                <DetailInformation id="2">
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
                    title={restaurantDetailData.title}
                    tel={restaurantDetailData.tel}
                    homepage={restaurantDetailData.homepage}
                  />
                </DetailInformationMap>

                <CommunicationWrap id="4">
                  {/* <Communication /> */}
                </CommunicationWrap>

                <Notification />

                {/* <div>{e.homepage}</div> */}
              </DeatilBox>
            ) : (
              <div>찾으시는 정보가 없습니다</div>
            )}
          </>
        )}

        <SideInfoWrapper id="5">
          <SpotInfo restaurantDetailData={restaurantDetailData} />
          <StayInfo restaurantDetailData={restaurantDetailData} />
        </SideInfoWrapper>
      </Container>
    </DetailWrap>
  );
};

export default RestaurantDetailPage;
