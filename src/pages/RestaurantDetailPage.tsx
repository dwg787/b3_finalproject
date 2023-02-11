import { fetchRestaurantDetailInfo } from '../apis/publicAPI';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../components/Loader/Loader';
import Liked from '../components/Liked';
import KakaoMap from '../components/Map/KakaoMap';

const RestaurantDetailPage = () => {
  const param = useParams();
  const { data: restaurantDetailData, isLoading: isLoadingRestaurantDetail } =
    useQuery(['restaurant_detail', param], () =>
      fetchRestaurantDetailInfo({ param })
    );

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
              <img src={restaurantDetailData.firstimage} alt='관광지 사진' />
              <div>주소 : {restaurantDetailData.addr1}</div>
              {/* <Link to={`/restaurant/${param.id}/map`}>지도보기</Link> */}
              {/* <div>{e.homepage}</div> */}
              <Liked restaurantDetailData={restaurantDetailData} />
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
