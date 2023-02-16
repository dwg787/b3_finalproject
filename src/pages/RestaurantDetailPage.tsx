import { useEffect } from 'react';
import { fetchRestaurantDetailInfo } from '../apis/publicAPI';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../components/Loader/Loader';
import KakaoMap from '../components/Map/KakaoMap';
import { getDoc, setDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { FetchedStayDataType } from '../apis/publicAPI';
import { db } from '../apis/firebase';
import noimg from '../assets/noimg.avif';
import RestaurantLiked from '../components/Liked/RestaurantLiked';

const RestaurantDetailPage = () => {
  const param = useParams();
  const {
    data: restaurantDetailData,
    isLoading: isLoadingRestaurantDetail,
  } = useQuery(['restaurant_detail', param], () =>
    fetchRestaurantDetailInfo({ param }),
  );

  const getRestaurantRecCnt = async () => {
    if (param.id) {
      const data = await getDoc(
        doc(db, 'restaurant_recommendation', `${param.id}`),
      );
      return data.data();
    } else {
      return;
    }
  };

  const updateRestaurantRecCnt = async () => {
    if (param.id) {
      await updateDoc(doc(db, 'restaurant_recommendation', param.id), {
        viewCnt: increment(1),
      });
    }
  };

  const saveNewRestaurantRecCnt = async (spotData: FetchedStayDataType) => {
    if (param.id) {
      await setDoc(doc(db, 'restaurant_recommendation', param.id), {
        ...restaurantDetailData,
        viewCnt: 1,
      });
    }
  };

  useEffect(() => {
    const getFirestoreRecCnt = async () => {
      const res = await getRestaurantRecCnt();
      if (res) {
        updateRestaurantRecCnt();
      } else {
        if (restaurantDetailData) saveNewRestaurantRecCnt(restaurantDetailData);
      }
    };
    getFirestoreRecCnt();
  }, [restaurantDetailData]);

  //   console.log('식당정보', restaurantDetailData);
  return (
    <div>
      {isLoadingRestaurantDetail ? (
        <Loader />
      ) : (
        <>
          {restaurantDetailData ? (
            <div key={param.id}>
              <Link to={'/'}>메인으로</Link>
              <div>{restaurantDetailData.title}</div>
              <img
                src={restaurantDetailData.firstimage || noimg}
                alt="관광지 사진"
              />
              <div>주소 : {restaurantDetailData.addr1}</div>
              {/* <Link to={`/restaurant/${param.id}/map`}>지도보기</Link> */}
              {/* <div>{e.homepage}</div> */}
              <RestaurantLiked restaurantDetailData={restaurantDetailData} />
              <button>
                <Link to={'/reservation'}>예약하기</Link>
              </button>
              <div>{restaurantDetailData.overview}</div>
              <KakaoMap
                mapx={restaurantDetailData.mapx}
                mapy={restaurantDetailData.mapy}
              />
            </div>
          ) : (
            <div>찾으시는 정보가 없습니다</div>
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
