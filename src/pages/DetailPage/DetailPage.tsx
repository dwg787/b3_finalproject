import { useQuery } from 'react-query';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchSpotDetailData, FetchedStayDataType } from '../../apis/publicAPI';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';
import { doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../apis/firebase';
import RestaurantInfo from '../../components/RestaurantInfo';
import Liked from '../../components/Liked/Liked';
import StayInfo from '../../components/StayInfo';
import Communication from '../../components/Review/Communication';
import Notification from '../../components/Notification/Notification';
import DetailScroll from '../../components/Scroll/DetailScroll';
import MapImoji from '../../components/Map/MapImoji';
import KakaoMap from '../../components/Map/KakaoMap';
import noimg from '../../assets/noimg.avif';
import {
  DetailWrap,
  DetailInfoText,
  CommunicationWrap,
  Container,
  DeatilBox,
  DeatilImojiBox,
  DetailInfo,
  DetailInfoTextBox,
  DetailInformation,
  SideInfoWrapper,
  DetailImg,
  DetailImgBox,
  DetailText,
  DetailTextArr,
  DeatilTextBox,
} from './styles';

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

  //스크롤 탭

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
                <DeatilTextBox>
                  <DetailText>{spotData.title}</DetailText>
                  <DetailTextArr> {spotData.addr1.split(' ', 2)}</DetailTextArr>
                  <DeatilImojiBox>
                    <Liked spotData={spotData} />

                    <Link to={`/${param.id}/map`}>
                      <MapImoji />
                    </Link>
                  </DeatilImojiBox>
                </DeatilTextBox>
                <DetailScroll />

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

                  <DetailInfo>{spotData.overview.split('.', 4)}</DetailInfo>
                  <DetailInfo>
                    <KakaoMap mapx={spotData.mapx} mapy={spotData.mapy} />
                  </DetailInfo>
                  <DetailInfo>주소 : {spotData.addr1}</DetailInfo>
                </DetailInformation>

                <CommunicationWrap id="3">
                  {/* <DetailInfoTextBox> */}
                  <DetailInfoText>여행톡</DetailInfoText>
                  {/* </DetailInfoTextBox> */}

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

        <SideInfoWrapper id="4">
          <StayInfo spotData={spotData} />
          <RestaurantInfo spotData={spotData} />
        </SideInfoWrapper>
      </Container>
    </DetailWrap>
  );
};

//   return (
//     <div>
//       <CommunicationWrap id="3">
//         {/* <DetailInfoTextBox> */}
//         <DetailInfoText>여행톡</DetailInfoText>
//         {/* </DetailInfoTextBox> */}

//         <Communication />
//       </CommunicationWrap>
//     </div>
//   );
// };

export default DetailPage;
