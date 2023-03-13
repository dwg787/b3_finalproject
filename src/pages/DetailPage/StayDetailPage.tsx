import { useEffect, useState } from 'react';
import {
  fetchStayDetailInfo,
  fetchStayAdditionalInfo1,
} from '../../apis/publicAPI';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../../components/Loader/Loader';
import KakaoMap from '../../components/Map/KakaoMap';
import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  increment,
  DocumentData,
} from 'firebase/firestore';
import { FetchedStayDataType } from '../../types/apiDataTypes';
import { db } from '../../apis/firebase';
import DetailScroll from '../../components/Scroll/DetailScroll';
import Communication from '../../components/Review/Communication';
import Notification from '../../components/Notification/Notification';
import PlaceLiked from '../../components/Liked/PlaceLiked';
import noimg from '../../assets/noimg.avif';
import useNotification from '../../hooks/useNotification';
import RestaurantInfo from '../../components/Recommendation/Info/RestaurantInfo';
import SpotInfo from '../../components/Recommendation/Info/SpotInfo';

import {
  DetailWrap,
  Container,
  DetailBox,
  DetailImojiBox,
  CommunicationWrap,
  DetailInfo,
  DetailInformation,
  SideInfoWrapper,
  DetailImg,
  DetailImgBox,
  DetailText,
  DetailTextArr,
  DetailTextBox,
  DetailInformationMap,
  DetailInfoAdd,
  TabHr,
  DetailImgBtn,
  DetailStayTextBox,
  DetailInfo2,
} from './styles';
import DetailFooter from '../../components/Footer/DetailFooter';
import { useMediaQuery } from 'react-responsive';
import MobileStayDetailPage from './MobileStayDetailPage';
import MobileCommunication from '../../components/Selection/mobile/MobileCommunication';

const StayDetailPage = () => {
  const param = useParams();
  const [likeData, setLikeData] = useState<DocumentData | undefined>();
  const [alarmMsg, setAlarmMsg] = useState(
    '예약 페이지가 준비되지 않았습니다.',
  );
  const { addNoti } = useNotification(alarmMsg);

  const isMobile: boolean = useMediaQuery({
    query: '(max-width:820px)',
  });

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

  const getStayRecCnt = async () => {
    if (param.id) {
      const data = await getDoc(doc(db, 'stay_recommendation', `${param.id}`));

      if (data.exists()) {
        const stayData = data.data();
        setLikeData(stayData);
        return stayData;
      }
    }
    return;
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
        likeCnt: 0,
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
  // console.log('숙박 상세정보', stayDetailData);

  //예약하기 url뽑기(common파일로 정리?필요)
  const reservationurl = stayAdditionalData1?.reservationurl ?? '';
  const urlRegex = /href=["']([^"']*)["']/;
  const match = reservationurl.match(urlRegex);
  const url = match ? match[1] : '';

  const ReservationClick = () => {
    if (url) {
      window.open(url);
    } else {
      setAlarmMsg('예약 페이지가 준비되지 않았습니다.');
    }
    addNoti();
  };

  return (
    <>
      {isMobile ? (
        <MobileStayDetailPage />
      ) : (
        <DetailWrap>
          <Container>
            <Notification />
            {isLoadingStayDetail || isLoadingAdditional1 ? (
              <Loader />
            ) : (
              <>
                {stayDetailData ? (
                  <DetailBox key={param.id}>
                    <DetailScroll />
                    <TabHr />
                    <DetailTextBox>
                      <DetailText>{stayDetailData.title}</DetailText>
                      <DetailTextArr>
                        {stayDetailData.addr1.split(' ', 2)}
                      </DetailTextArr>
                      <DetailImojiBox>
                        <PlaceLiked
                          stayDetailData={stayDetailData}
                          spotDetailData={undefined}
                          restaurantDetailData={undefined}
                        />
                        {/* <p>{likeData !== undefined ? likeData.likeCnt : 0}</p> */}
                      </DetailImojiBox>
                    </DetailTextBox>

                    <DetailImgBox id="1">
                      <DetailImg
                        src={stayDetailData.firstimage || noimg}
                        alt="사진"
                      />
                      <DetailImgBtn onClick={ReservationClick}>
                        예약하기
                      </DetailImgBtn>
                    </DetailImgBox>

                    <DetailInformation id="2">
                      <DetailInfo>
                        {stayDetailData.overview.split('<', 1)}
                      </DetailInfo>
                      <DetailInfo2>
                        <DetailStayTextBox>
                          <DetailInfoAdd>
                            <span
                              style={{
                                fontWeight: '900',
                                marginRight: '15.5px',
                              }}
                            >
                              문의 및 안내{' '}
                            </span>{' '}
                            {stayAdditionalData1.infocenterlodging}
                          </DetailInfoAdd>
                          <DetailInfoAdd>
                            <span
                              style={{
                                fontWeight: '900',
                                marginRight: '15.5px',
                              }}
                            >
                              홈페이지{' '}
                            </span>
                            {url}
                          </DetailInfoAdd>
                        </DetailStayTextBox>
                        <DetailStayTextBox>
                          <DetailInfoAdd>
                            <span
                              style={{
                                fontWeight: '900',
                                marginRight: '15.5px',
                              }}
                            >
                              주소{' '}
                            </span>{' '}
                            {stayDetailData.addr1}
                          </DetailInfoAdd>
                          <DetailInfoAdd>
                            <span
                              style={{
                                fontWeight: '900',
                                marginRight: '15.5px',
                              }}
                            >
                              주차{' '}
                            </span>{' '}
                            {stayAdditionalData1.parkinglodging}
                          </DetailInfoAdd>
                        </DetailStayTextBox>
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
                      {isMobile ? <MobileCommunication /> : <Communication />}
                    </CommunicationWrap>
                    <SideInfoWrapper id="5">
                      <SpotInfo stayDetailData={stayDetailData} />
                      <RestaurantInfo stayDetailData={stayDetailData} />
                    </SideInfoWrapper>
                  </DetailBox>
                ) : (
                  <div>찾으시는 정보가 없습니다</div>
                )}
              </>
            )}

            <DetailFooter />
          </Container>
        </DetailWrap>
      )}
    </>
  );
};

export default StayDetailPage;
