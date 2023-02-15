import { useQuery } from 'react-query';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  fetchSpotDetailData,
  fetchNearStayData,
  fetchNearRestaurantData,
  FetchedStayDataType,
} from '../apis/publicAPI';
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
import '../App.css';

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
              <div key={param.id}>
                {/* <Link to={'/'}>메인으로</Link> */}
                <DeatilTextBox>
                  <DetailText>{spotData.title}</DetailText>
                  <Liked spotData={spotData} />
                </DeatilTextBox>
                <DetailImgBox>
                  <DetailImg src={spotData.firstimage} alt="관광지 사진" />
                </DetailImgBox>

                <div>주소 : {spotData.addr1}</div>
                <Communication />
                <Notification />
                <Link to={`/spot/${param.id}/map`}>지도보기</Link>
                {/* <div>{e.homepage}</div> */}

                <div>{spotData.overview}</div>
              </div>
            ) : (
              <div>찾으시는 정보가 없습니다</div>
            )}
          </>
        )}
        <SideInfoWrapper>
          <StayInfoWrapper>
            <StayInfo spotData={spotData} />
          </StayInfoWrapper>
          <RestaurantInfoWrapper>
            <RestaurantInfo spotData={spotData} />
          </RestaurantInfoWrapper>
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
  justify-content: center
  background-color: #cda8a8;
 
`;

const Container = styled.div`
  /* width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; */

  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  background-color: #8eb9dc;
`;

const DeatilTextBox = styled.div`
  width: 100%;
  gap: 0.3rem;
  margin-bottom: 50px;
  border-bottom: solid #d3d3d3 2px;
`;

const DetailText = styled.p`
  font-weight: 900;
  text-align: center;
  font-size: 40px;
  margin-bottom: 50px;
`;

const DetailImgBox = styled.div`
  width: 100%;
`;
const DetailImg = styled.img`
  width: 90%;
  justify-content: center;
  display: flex;
`;

const SideInfoWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const StayInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RestaurantInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StayImage = styled.img`
  width: 300px;
  height: 200px;
`;
