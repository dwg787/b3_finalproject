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
  DetailInfo2,
} from './styles';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { db } from '../../apis/firebase';
import noimg from '../../assets/noimg.avif';
import { useParams, Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import KakaoMap from '../../components/Map/KakaoMap';
import { FetchedStayDataType } from '../../types/apiDataTypes';
import DetailScroll from '../../components/Scroll/DetailScroll';
import { fetchRestaurantDetailInfo } from '../../apis/publicAPI';
import Communication from '../../components/Review/Communication';
import Notification from '../../components/Notification/Notification';
import RestaurantLiked from '../../components/Liked/RestaurantLiked';
import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  increment,
  DocumentData,
} from 'firebase/firestore';
import StayInfo from '../../components/Recommendation/Info/StayInfo';
import SpotInfo from '../../components/Recommendation/Info/SpotInfo';
import DetailFooter from '../../components/Footer/DetailFooter';

const RestaurantDetailPage = () => {
  const param = useParams();
  const [likeData, setLikeData] = useState<DocumentData | undefined>();

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

      if (data.exists()) {
        const restaurantData = data.data();
        setLikeData(restaurantData);
        return restaurantData;
      }
    }
    return;
  };

  const updateRestaurantRecCnt = async () => {
    if (param.id) {
      await updateDoc(doc(db, 'restaurant_recommendation', param.id), {
        viewCnt: increment(1),
      });
    }
  };

  const saveNewRestaurantRecCnt = async (
    restaurantDetailData: FetchedStayDataType,
  ) => {
    if (param.id) {
      await setDoc(doc(db, 'restaurant_recommendation', param.id), {
        ...restaurantDetailData,
        viewCnt: 1,
        likeCnt: 0,
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

  // setThisParam(param.id);
  return (
    <DetailWrap>
      <Container>
        <Notification />
        {isLoadingRestaurantDetail ? (
          <Loader />
        ) : (
          <>
            {restaurantDetailData ? (
              <DeatilBox key={param.id}>
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
                    <p>{likeData !== undefined ? likeData.likeCnt : 0}</p>
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
                    {restaurantDetailData.overview.split('<', 1)}
                  </DetailInfo>

                  <DetailInfo2>
                    <span style={{ fontWeight: '900', marginRight: '15.5px' }}>
                      주소
                    </span>
                    {restaurantDetailData.addr1}
                  </DetailInfo2>
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
                <SideInfoWrapper id="5">
                  <SpotInfo restaurantDetailData={restaurantDetailData} />
                  <StayInfo restaurantDetailData={restaurantDetailData} />
                </SideInfoWrapper>

                {/* <div>{e.homepage}</div> */}
              </DeatilBox>
            ) : (
              <div>찾으시는 정보가 없습니다</div>
            )}
          </>
        )}

        <DetailFooter />
      </Container>
    </DetailWrap>
  );
};

export default RestaurantDetailPage;
