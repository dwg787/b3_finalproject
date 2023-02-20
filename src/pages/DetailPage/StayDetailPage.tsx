import { useEffect } from 'react';
import {
  fetchStayDetailInfo,
  fetchStayAdditionalInfo1,
  fetchStayAdditionalInfo2,
} from '../../apis/publicAPI';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../../components/Loader/Loader';
import KakaoMap from '../../components/Map/KakaoMap';
import { getDoc, setDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { FetchedStayDataType } from '../../apis/publicAPI';
import { db } from '../../apis/firebase';
import DetailScroll from '../../components/Scroll/DetailScroll';
import Communication from '../../components/Review/Communication';
import Notification from '../../components/Notification/Notification';
import RestaurantLiked from '../../components/Liked/RestaurantLiked';
import noimg from '../../assets/noimg.avif';

import {
  DetailWrap,
  Container,
  DeatilBox,
  DeatilImojiBox,
  CommunicationWrap,
  DetailInfo,
  DetailInformation,
  SideInfoWrapper,
  DetailImg,
  DetailImgBox,
  DetailText,
  DetailTextArr,
  DeatilTextBox,
  DetailInformationMap,
  DetailInfoAdd,
  TabHr,
  DetailImgBtn,
  DetailTextBox,
  DetailInfo2,
} from './styles';
import StayInfo from '../../components/Recommendation/StayInfo';
import RestaurantInfo from '../../components/Recommendation/RestaurantInfo';
import SpotInfo from '../../components/Recommendation/SpotInfo';
import MapImoji from '../../components/Map/MapImoji';
import BlueFooter from '../../components/Footer/BlueFooter';

const StayDetailPage = () => {
  const param = useParams();
  const { data: stayDetailData, isLoading: isLoadingStayDetail } = useQuery(
    ['stay_detail', param],
    () => fetchStayDetailInfo({ param }),
  );

  const {
    data: stayAdditionalData1,
    isLoading: isLoadingAdditional1,
  } = useQuery(['stay_additional1', param], () =>
    fetchStayAdditionalInfo1({ param }),
  );

  console.log('숙박 상세 소개', stayAdditionalData1);

  // const {
  //   data: stayAdditionalData2,
  //   isLoading: isLoadingAdditional2,
  // } = useQuery(['stay_additional2', param], () =>
  //   fetchStayAdditionalInfo2({ param }),
  // );

  // if (stayAdditionalData1 && stayAdditionalData2) {
  //   console.log('숙박 상세 소개', stayAdditionalData1);
  //   console.log('숙박 룸 정보', stayAdditionalData2);
  // }

  const getStayRecCnt = async () => {
    if (param.id) {
      const data = await getDoc(doc(db, 'stay_recommendation', `${param.id}`));
      return data.data();
    } else {
      return;
    }
  };

  const updateStayRecCnt = async () => {
    if (param.id) {
      await updateDoc(doc(db, 'stay_recommendation', param.id), {
        viewCnt: increment(1),
      });
    }
  };

  const saveNewStayRecCnt = async (spotData: FetchedStayDataType) => {
    if (param.id) {
      await setDoc(doc(db, 'stay_recommendation', param.id), {
        ...stayDetailData,
        viewCnt: 1,
      });
    }
  };

  useEffect(() => {
    const getFirestoreRecCnt = async () => {
      const res = await getStayRecCnt();
      if (res) {
        updateStayRecCnt();
      } else {
        if (stayDetailData) saveNewStayRecCnt(stayDetailData);
      }
    };
    getFirestoreRecCnt();
  }, [stayDetailData]);
  console.log('숙박 상세정보', stayDetailData);

  return (
    <DetailWrap>
      <Container>
        {isLoadingStayDetail || isLoadingAdditional1 ? (
          <Loader />
        ) : (
          <>
            {stayDetailData ? (
              <DeatilBox key={param.id}>
                {/* <Link to={'/'}>메인으로</Link> */}
                <DetailScroll />
                <TabHr />
                <DeatilTextBox>
                  {/* <DetailScroll /> */}
                  <DetailText>{stayDetailData.title}</DetailText>
                  <DetailTextArr>
                    {stayDetailData.addr1.split(' ', 2)}
                  </DetailTextArr>
                  <DeatilImojiBox>
                    <RestaurantLiked stayDetailData={stayDetailData} />
                    {/* <Liked stayDetailData={stayDetailData} /> */}
                    <Link to={`/${param.id}/map`}>
                      <MapImoji />
                    </Link>
                  </DeatilImojiBox>
                </DeatilTextBox>

                <DetailImgBox id="1">
                  <DetailImg
                    src={stayDetailData.firstimage || noimg}
                    alt="사진"
                  />
                  <DetailImgBtn>예약하기</DetailImgBtn>
                </DetailImgBox>

                <DetailInformation id="2">
                  <DetailInfo>
                    {stayDetailData.overview.split('.', 4)}
                  </DetailInfo>
                  <DetailInfo2>
                    <DetailTextBox>
                      <DetailInfoAdd>
                        <span style={{ fontWeight: '700' }}>
                          문의 및 안내 :{' '}
                        </span>{' '}
                        {stayAdditionalData1.infocenterlodging}
                      </DetailInfoAdd>
                      <DetailInfoAdd>
                        <span style={{ fontWeight: '700' }}>홈페이지 : </span>
                        {stayAdditionalData1.reservationurl.split('"')[1]}
                      </DetailInfoAdd>
                    </DetailTextBox>
                    <DetailTextBox>
                      <DetailInfoAdd>
                        <span style={{ fontWeight: '700' }}>주소 : </span>{' '}
                        {stayDetailData.addr1}
                      </DetailInfoAdd>
                      <DetailInfoAdd>
                        <span style={{ fontWeight: '700' }}>주차 : </span>{' '}
                        {stayAdditionalData1.parkinglodging}
                      </DetailInfoAdd>
                    </DetailTextBox>
                  </DetailInfo2>
                </DetailInformation>

                <DetailInformationMap id="3">
                  <KakaoMap
                    mapx={stayDetailData.mapx}
                    mapy={stayDetailData.mapy}
                    title={stayDetailData.title}
                    tel={stayDetailData.tel}
                    homepage={stayDetailData.homepage}
                  />
                </DetailInformationMap>

                <CommunicationWrap id="4">
                  {/* <DetailInfoTextBox>
                    <DetailInfoText>여행톡</DetailInfoText>
                  </DetailInfoTextBox> */}

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
          <SpotInfo stayDetailData={stayDetailData} />
          <RestaurantInfo stayDetailData={stayDetailData} />
        </SideInfoWrapper>
        <BlueFooter />
      </Container>
    </DetailWrap>
  );
};

export default StayDetailPage;
