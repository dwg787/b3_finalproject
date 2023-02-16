import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  fetchRestaurantDetailInfo,
  fetchSpotDetailData,
} from '../apis/publicAPI';
import KakaoMap from '../components/Map/KakaoMap';

const MapPage = () => {
  const param = useParams();
  const { data, isLoading } = useQuery(['spot_detail', param], () =>
    fetchSpotDetailData({ param }),
  );

  // const {
  //   data: restaurantDetailData,
  //   isLoading: isLoadingRestaurantDetail,
  // } = useQuery(['restaurant_detail', param], () =>
  //   fetchRestaurantDetailInfo({ param }),
  // );

  // console.log(restaurantDetailData);

  return (
    <div>
      {data && (
        <div key={param.id}>
          <KakaoMap mapx={data.mapx} mapy={data.mapy} />
        </div>
      )}
    </div>
  );
};

export default MapPage;
