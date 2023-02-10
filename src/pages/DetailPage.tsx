import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  fetchSpotDetailData,
  fetchNearStayData,
  fetchNearRestaurantData,
  FetchedStayDataType,
} from '../apis/publicAPI';
import styled from 'styled-components';
import Loader from '../components/Loader';
import { useRecoilState } from 'recoil';
import { recommendationCnt } from '../recoil/apiDataAtoms';
import { useEffect } from 'react';
import {
  doc,
  addDoc,
  setDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  getDoc,
  updateDoc,
  collection,
  DocumentData,
  increment,
} from 'firebase/firestore';
import { db } from '../apis/firebase';
import RestaurantInfo from '../components/RestaurantInfo';
import Stayinfo from '../components/Stayinfo';

const DetailPage = () => {
  const param = useParams();
  const { data: spotData, isLoading: isLoadingSpot } = useQuery(
    ['spot_detail', param],
    () => fetchSpotDetailData({ param })
  );

  console.log('확인', spotData);

  // const recCntRef = collection(db, 'recommendation');
  // const target = recCnt.findIndex((e) => e.id === param.id);
  // const target = recCnt.find((e: string | undefined)=>e === param.id)

  const getRecCnt = async () => {
    if (param.id) {
      const data = await getDoc(doc(db, 'recommendation', `${param.id}`));
      return data.data();
    } else {
      console.log('해당 데이터가 없습니다.');
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

  useEffect(() => {
    console.log('useEffect 안에 spotData', spotData);
    const getFirestoreRecCnt = async () => {
      const res = await getRecCnt();
      // console.log('파이어베이스 db에서 넘어오는 값', res);
      //혹시나 해서 주석 남겨둠
      // if (param.id) {
      //   const letsee = doc(db, 'recommendation', param.id);
      // }
      // const target = res.findIndex((e) => e.id === param.id);
      if (res) {
        updateRecCnt();
      } else {
        saveNewRecCnt(spotData);
      }
    };
    getFirestoreRecCnt();
  }, []);

  const { data: stayData, isLoading: isLoadingStay } = useQuery(
    ['stay_detail', spotData],
    () => fetchNearStayData({ mapx: spotData.mapx, mapy: spotData.mapy }),
    {
      enabled: !!spotData,
    }
  );

  const { data: restaurantData, isLoading: isLoadingRestaurant } = useQuery(
    ['restaurant_detail', spotData],
    () =>
      fetchNearRestaurantData({
        mapx: spotData.mapx,
        mapy: spotData.mapy,
      }),
    {
      enabled: !!spotData,
    }
  );

  console.log('상세페이지 관광지 정보', spotData);

  if (isLoadingSpot) {
    return <div></div>;
  }

  const saveNewRecCnt = async (spotData: FetchedStayDataType) => {
    if (param.id) {
      await setDoc(doc(db, 'recommendation', param.id), {
        ...param,
        viewCnt: 1,
      });
    }
    console.log('콘솔1', param);
    console.log('콘솔2', spotData);
  };

  return (
    <Container>
      <div>
        {isLoadingSpot ? (
          <Loader />
        ) : (
          <>
            {spotData ? (
              <div key={param.id}>
                <Link to={'/'}>메인으로</Link>
                <div>{spotData.title}</div>
                <img src={spotData.firstimage} alt='관광지 사진' />
                <div>주소 : {spotData.addr1}</div>
                <Link to={`/${param.id}/map`}>지도보기</Link>
                {/* <div>{e.homepage}</div> */}
                <div>{spotData.overview}</div>
              </div>
            ) : (
              <div>찾으시는 정보가 없습니다</div>
            )}
          </>
        )}

        <SideInfoWrapper>
          {/* 일단 이부분 주석은 지우지 말아주세요!! */}
          {/* <StayInfoWrapper>
            <div>주변 숙박정보</div>
            <div>
              {isLoadingStay ? (
                <Loader />
              ) : (
                <>
                  {stayData ? (
                    <>
                      <StayImage
                        src={stayData[0]?.firstimage}
                        alt='주변숙소 이미지'
                      />
                      <div>{stayData[0]?.title}</div>
                    </>
                  ) : (
                    <>
                      <div>주변 숙박정보가 없습니다.</div>
                    </>
                  )}
                </>
              )}
            </div>
          </StayInfoWrapper> */}
          {/* <RestaurantInfoWrapper> */}
          {/* <div>주변 맛집정보</div>
            <div>
              {isLoadingRestaurant ? (
                <Loader />
              ) : (
                <>
                  {restaurantData ? (
                    <>
                      <StayImage
                        src={restaurantData[0]?.firstimage}
                        alt='주변맛집 이미지'
                      />
                      <div>{restaurantData[0]?.title}</div>
                    </>
                  ) : (
                    <>
                      <div>주변 맛집정보가 없습니다.</div>
                    </>
                  )}
                </>
              )}
            </div> */}

          <StayInfoWrapper>
            <Stayinfo spotData={spotData} />
          </StayInfoWrapper>
          <RestaurantInfoWrapper>
            <RestaurantInfo spotData={spotData} />
          </RestaurantInfoWrapper>
        </SideInfoWrapper>
      </div>
    </Container>
  );
};

export default DetailPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
