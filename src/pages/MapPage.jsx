import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchSpotDetailData } from '../apis/publicAPI';
import KakaoMap from '../components/Map/KakaoMap';

const MapPage = () => {
  const param = useParams();
  const { data, isLoading } = useQuery(['spot_detail', param], () =>
    fetchSpotDetailData({ param })
  );

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
