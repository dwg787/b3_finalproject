import { useQuery } from 'react-query';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchSpotDetailData } from '../../apis/publicAPI';
import { FetchedStayDataType } from '../../types/apiDataTypes';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';
import { doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../apis/firebase';
import RestaurantInfo from '../../components/Recommendation/Info/RestaurantInfo';
import StayInfo from '../../components/Recommendation/Info/StayInfo';
import Communication from '../../components/Review/Communication';
import Notification from '../../components/Notification/Notification';
import DetailScroll from '../../components/Scroll/DetailScroll';
import MapImoji from '../../components/Map/MapImoji';
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
  TabHr,
  DetailInfo2,
} from './styles';
import SpotLiked from '../../components/Liked/SpotLiked';
import SideInfoMap from '../../components/Map/SideInfoMap';
import DetailFooter from '../../components/Footer/DetailFooter';

const DetailPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { data: spotDetailData, isLoading: isLoadingSpot } = useQuery(
    ['spot_detail', param],
    () => fetchSpotDetailData({ param }),
  );

  const getRecCnt = async () => {
    if (param.id) {
      const data = await getDoc(doc(db, 'spot_recommendation', `${param.id}`));
      return data.data();
    } else {
      return;
    }
  };

  const updateRecCnt = async () => {
    if (param.id) {
      await updateDoc(doc(db, 'spot_recommendation', param.id), {
        viewCnt: increment(1),
      });
    }
  };

  const saveNewRecCnt = async (spotDetailData: FetchedStayDataType) => {
    if (param.id) {
      await setDoc(doc(db, 'spot_recommendation', param.id), {
        ...spotDetailData,
        viewCnt: 1,
        likeCnt: 0,
      });
    }
  };

  useEffect(() => {
    const getFirestoreRecCnt = async () => {
      const res = await getRecCnt();
      if (res) {
        updateRecCnt();
      } else {
        if (spotDetailData) saveNewRecCnt(spotDetailData);
      }
    };
    getFirestoreRecCnt();
  }, [spotDetailData]);

  return (
    <DetailWrap>
      <Container>
        <Notification />
        {isLoadingSpot ? (
          <Loader />
        ) : (
          <>
            {spotDetailData ? (
              <DeatilBox key={param.id}>
                <DetailScroll />
                <TabHr />

                <DeatilTextBox>
                  <DetailText>{spotDetailData.title}</DetailText>
                  <DetailTextArr>
                    {spotDetailData.addr1.split(' ', 2)}
                  </DetailTextArr>
                  <DeatilImojiBox>
                    <SpotLiked spotDetailData={spotDetailData} />
                    <p>00</p>
                  </DeatilImojiBox>
                </DeatilTextBox>

                <DetailImgBox id="1">
                  <DetailImg
                    src={spotDetailData.firstimage || noimg}
                    alt="관광지 사진"
                  />
                </DetailImgBox>

                <DetailInformation id="2">
                  <DetailInfo>
                    {spotDetailData.overview.split('<', 1)}
                  </DetailInfo>

                  <DetailInfo2>
                    <span style={{ fontWeight: '900', marginRight: '15.5px' }}>
                      주소
                    </span>
                    {spotDetailData.addr1}
                  </DetailInfo2>
                </DetailInformation>

                <DetailInformationMap id="3">
                  <SideInfoMap
                    mapx={spotDetailData?.mapx}
                    mapy={spotDetailData?.mapy}
                    title={spotDetailData?.title}
                    tel={spotDetailData?.tel}
                    homepage={spotDetailData?.homepage}
                  />
                </DetailInformationMap>

                <CommunicationWrap id="4">
                  <Communication />
                </CommunicationWrap>
                <SideInfoWrapper id="5">
                  <StayInfo spotData={spotDetailData} />
                  <RestaurantInfo spotData={spotDetailData} />
                </SideInfoWrapper>
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

export default DetailPage;
