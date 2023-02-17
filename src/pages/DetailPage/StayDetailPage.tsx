import { useEffect } from 'react';
import { fetchStayDetailInfo } from '../../apis/publicAPI';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../../components/Loader/Loader';
import Liked from '../../components/Liked/Liked';
import KakaoMap from '../../components/Map/KakaoMap';
import { getDoc, setDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { FetchedStayDataType } from '../../apis/publicAPI';
import { db } from '../../apis/firebase';
import Cart from '../../components/Cart';
import StayLiked from '../../components/Liked/StayLiked';

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
} from './styles';
import DetailScroll from '../../components/Scroll/DetailScroll';
import MapImoji from '../../components/Map/MapImoji';
import Communication from '../../components/Review/Communication';
import Notification from '../../components/Notification/Notification';

const StayDetailPage = () => {
  const param = useParams();
  const { data: stayDetailData, isLoading: isLoadingStayDetail } = useQuery(
    ['stay_detail', param],
    () => fetchStayDetailInfo({ param }),
  );

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
        {isLoadingStayDetail ? (
          <Loader />
        ) : (
          <>
            {stayDetailData ? (
              <DeatilBox key={param.id}>
                {/* <Link to={'/'}>메인으로</Link> */}
                <DeatilTextBox>
                  <DetailText>{stayDetailData.title}</DetailText>
                  <DetailTextArr>
                    {stayDetailData.addr1.split(' ', 2)}
                  </DetailTextArr>
                  <DeatilImojiBox>
                    <StayLiked stayDetailData={stayDetailData} />

                    <Link to={`/${param.id}/map`}>
                      <MapImoji />
                    </Link>
                  </DeatilImojiBox>
                </DeatilTextBox>
                <DetailScroll />

                <DetailImgBox id="1">
                  <DetailImg
                    src={stayDetailData.firstimage || noimg}
                    alt="사진"
                  />
                </DetailImgBox>

                <DetailInformation id="2">
                  {/* <DetailInfoTextBox>
                  <DetailInfoText>상세정보</DetailInfoText>
                </DetailInfoTextBox> */}

                  <DetailInfo>
                    {stayDetailData.overview.split('.', 4)}
                  </DetailInfo>
                  <DetailInfo>
                    <KakaoMap
                      mapx={stayDetailData.mapx}
                      mapy={stayDetailData.mapy}
                    />
                  </DetailInfo>
                  <DetailInfo>주소 : {stayDetailData.addr1}</DetailInfo>
                </DetailInformation>

                <CommunicationWrap id="3">
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

        {/* <SideInfoWrapper id="4">
        <StayInfo spotData={spotData} />
        <RestaurantInfo spotData={spotData} />
      </SideInfoWrapper> */}
      </Container>
    </DetailWrap>
  );
};

export default StayDetailPage;