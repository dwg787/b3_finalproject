import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  fetchRestaurantDetailInfo,
  fetchSpotDetailData,
  fetchStayDetailInfo,
} from '../apis/publicAPI';
import KakaoMap from '../components/Map/KakaoMap';

const MapPage = () => {
  const param = useParams();

  const { data: spotData } = useQuery(['spot_detail', param], () =>
    fetchSpotDetailData({ param }),
  );

  const { data: stayDetailData } = useQuery(['stay_detail', param], () =>
    fetchStayDetailInfo({ param }),
  );

  const { data: restaurantDetailData } = useQuery(
    ['restaurant_detail', param],
    () => fetchRestaurantDetailInfo({ param }),
  );

  const combinedData = {
    ...spotData,
    ...restaurantDetailData,
    ...stayDetailData,
  };

  return (
    <div>
      {combinedData && (
        <div key={param.id}>
          <KakaoMap mapx={combinedData.mapx} mapy={combinedData.mapy} />
        </div>
      )}
    </div>
  );
};

export default MapPage;
