import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  fetchSpotDetailData,
  fetchNearStayData,
  fetchNearRestaurantData,
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
  updateDoc,
  collection,
  DocumentData,
  increment,
} from 'firebase/firestore';
import { db } from '../apis/firebase';
import Stayinfo from '../components/Stayinfo';
import RestaurantInfo from '../components/RestaurantInfo';

const DetailPage = () => {
  const param = useParams();
  const [recCnt, setRecCnt] = useRecoilState(recommendationCnt);
  const recCntRef = collection(db, 'recommendation');
  const target = recCnt.findIndex((e) => e.id === param.id);
  // const target = recCnt.find((e: string | undefined)=>e === param.id)

  const { data: spotData, isLoading: isLoadingSpot } = useQuery(
    ['spot_detail', param],
    () => fetchSpotDetailData({ param })
  );

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

  const saveNewRecCnt = async () => {
    await setDoc(doc(recCntRef), {
      param: param.id,
      viewCnt: 0,
    });
  };

  const updateRecCnt = async () => {
    await updateDoc(doc(recCntRef), {
      viewCnt: increment(1),
    });
  };

  const getRecCnt = useCallback(async () => {
    const data = await getDocs(recCntRef);
    // console.log(data)
    // setRecCnt(
    // data.docs.map((doc: DocumentData) => {
    //   return {
    //     ...doc.data(),
    //   };
    // })
    // );
  }, [setRecCnt, recCntRef]);

  useEffect(() => {
    getRecCnt();
  }, []);

  useEffect(() => {
    if (recCnt[target]) {
      updateRecCnt();
    } else {
      saveNewRecCnt();
    }
  }, []);

  console.log('타겟', target);
  console.log('이미 저장된', recCnt);
  console.log('현재 param', param.id);

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
          <StayInfoWrapper>
            {/* <div>주변 숙박정보</div>
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
            </div> */}
          </StayInfoWrapper>
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

          <Stayinfo spotData={spotData} />
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
