import { useQuery } from 'react-query';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchSpotDetailData, FetchedStayDataType } from '../../apis/publicAPI';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';
import { doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../apis/firebase';
import RestaurantInfo from '../../components/Recommendation/RestaurantInfo';

import StayInfo from '../../components/Recommendation/StayInfo';

import Communication from '../../components/Review/Communication';
import Notification from '../../components/Notification/Notification';
import DetailScroll from '../../components/Scroll/DetailScroll';
import MapImoji from '../../components/Map/MapImoji';
import KakaoMap from '../../components/Map/KakaoMap';
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
  DetailInformationMap,
  DetailInfoAdd,
  TabHr,
} from './styles';
import RestaurantLiked from '../../components/Liked/RestaurantLiked';
import Footer from '../../components/Footer/BlackFooter';

const DetailPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { data: spotData, isLoading: isLoadingSpot } = useQuery(
    ['spot_detail', param],
    () => fetchSpotDetailData({ param }),
  );

  // console.log(spotData);

  const getRecCnt = async () => {
    if (param.id) {
      const data = await getDoc(doc(db, 'recommendation', `${param.id}`));
      return data.data();
    } else {
      return;
    }
  };

  const updateRecCnt = async () => {
    if (param.id) {
      await updateDoc(doc(db, 'recommendation', param.id), {
        viewCnt: increment(1),
      });
    }
  };

  const saveNewRecCnt = async (spotData: FetchedStayDataType) => {
    if (param.id) {
      await setDoc(doc(db, 'recommendation', param.id), {
        ...spotData,
        viewCnt: 1,
      });
    }
  };

  useEffect(() => {
    const getFirestoreRecCnt = async () => {
      const res = await getRecCnt();
      if (res) {
        updateRecCnt();
      } else {
        if (spotData) saveNewRecCnt(spotData);
      }
    };
    getFirestoreRecCnt();
  }, [spotData]);

  return (
    <DetailWrap>
      <Container>
        {isLoadingSpot ? (
          <Loader />
        ) : (
          <>
            {spotData ? (
              <DeatilBox key={param.id}>
                {/* <Link to={'/'}>메인으로</Link> */}

                <DetailScroll />
                <TabHr />
                <DeatilTextBox>
                  <DetailText>{spotData.title}</DetailText>
                  <DetailTextArr> {spotData.addr1.split(' ', 2)}</DetailTextArr>
                  <DeatilImojiBox>
                    <RestaurantLiked spotData={spotData} />
                    <Link to={`/${param.id}/map`}>
                      <MapImoji />
                    </Link>
                  </DeatilImojiBox>
                </DeatilTextBox>

                <DetailImgBox id="1">
                  <DetailImg
                    src={spotData.firstimage || noimg}
                    alt="관광지 사진"
                  />
                </DetailImgBox>

                <DetailInformation id="2">
                  {/* <DetailInfoTextBox>
                    <DetailInfoText>상세정보</DetailInfoText>
                  </DetailInfoTextBox> */}

                  <DetailInfo>{spotData.overview.split('<', 1)}</DetailInfo>

                  <DetailInfoAdd>주소 : {spotData.addr1}</DetailInfoAdd>
                </DetailInformation>

                <DetailInformationMap id="3">
                  <KakaoMap mapx={spotData.mapx} mapy={spotData.mapy} />
                </DetailInformationMap>

                <CommunicationWrap id="4">
                  {/* <DetailInfoTextBox>
                    <DetailInfoText>여행톡</DetailInfoText>
                  </DetailInfoTextBox> */}

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

        <SideInfoWrapper id="5">
          <StayInfo spotData={spotData} />
          <RestaurantInfo spotData={spotData} />
        </SideInfoWrapper>
      </Container>
    </DetailWrap>
  );
};

export default DetailPage;
