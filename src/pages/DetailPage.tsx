import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { fetchSpotDetailData, FetchedStayDataType } from '../apis/publicAPI';
import styled from 'styled-components';
import Loader from '../components/Loader/Loader';
import { useEffect } from 'react';
import { doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../apis/firebase';
import RestaurantInfo from '../components/RestaurantInfo';
import Liked from '../components/Liked/Liked';
import StayInfo from '../components/Stayinfo';
import Communication from '../components/Review/Communication';
import Notification from '../components/Notification/Notification';
import DetailScroll from '../components/Scroll/DetailScroll';
import MapImoji from '../components/Map/MapImoji';
import KakaoMap from '../components/Map/KakaoMap';

const DetailPage = () => {
  const param = useParams();
  const { data: spotData, isLoading: isLoadingSpot } = useQuery(
    ['spot_detail', param],
    () => fetchSpotDetailData({ param }),
  );

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

                    <Link to={`/spot/${param.id}/map`}>
                      <MapImoji />
                    </Link>
                  </DeatilImojiBox>
                </DeatilTextBox>
                <DetailScroll />

                <DetailImgBox id="1">
                  <DetailImg src={spotData.firstimage} alt="관광지 사진" />
                </DetailImgBox>

                <DetailInformation id="2">
                  <DetailInfoTextBox>
                    <DetailInfoText>상세정보</DetailInfoText>
                  </DetailInfoTextBox>

                  <DetailInfo>{spotData.overview.split('<', 1)}</DetailInfo>
                  <DetailInfo>
                    <KakaoMap mapx={spotData.mapx} mapy={spotData.mapy} />
                  </DetailInfo>
                  <DetailInfo>주소 : {spotData.addr1}</DetailInfo>
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

        <SideInfoWrapper id="4">
          <StayInfo spotData={spotData} />
          <RestaurantInfo spotData={spotData} />
        </SideInfoWrapper>
      </Container>
    </DetailWrap>
  );
};

export default DetailPage;

const DetailWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #cda8a8; */
`;

const Container = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  /* background-color: #8eb9dc; */
`;

const DeatilBox = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  /* background-color: beige; */
`;

const DeatilTextBox = styled.div`
  width: 100%;
  gap: 0.3rem;
  /* margin-bottom: 50px; */
  /* margin-bottom: 2rem; */
  /* border-bottom: solid #d3d3d3 2px; */
`;

const DeatilImojiBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: flex-end;
`;

const DetailText = styled.p`
  font-weight: 900;
  text-align: center;
  font-size: 40px;
  /* margin-bottom: 50px; */
`;

const DetailTextArr = styled.div`
  text-align: center;
  font-size: 15px;
  margin-top: 15px;
  color: #6478ff;
  font-weight: 400;
`;

const DetailImgBox = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  /* margin-bottom: 150px; */
  margin: 20px 0 100px 0;
  /* height: 800px; */
  /* background-color: #6fcfab; */
`;
const DetailImg = styled.img`
  width: 90%;
`;

const SideInfoWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
  background-color: teal;
`;

const DetailInformation = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 30px 0; */
  height: 700px;
  margin-top: 30px;
  /* flex-wrap: wrap; */
  /* background-color: #76acdc; */
`;

const DetailInfoTextBox = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: row; */
  /* border-bottom: solid #1f1f20 2px; */
  border-bottom: solid #d6dcff 1px;
  margin: 10px 0;
`;

const DetailInfoText = styled.div`
  /* display: flex; */
  /* justify-content: flex-start;
   */

  /* font-weight: 400; */
  margin-left: 30px;
  /* color: #6478ff; */
  font-size: 25px;
  font-weight: 800;
  text-align: left;
  margin-bottom: 10px;
`;

const DetailInfo = styled.div`
  width: 90%;
  margin: 10px 0;
  height: 500px;
  flex-wrap: wrap;
  font-size: 17px;
  font-weight: 400;
`;

const CommunicationWrap = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #b5a0d2; */
  height: 600px;
`;
