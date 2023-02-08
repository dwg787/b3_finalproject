

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchSpotDetailData } from '../apis/publicAPI';
import KakaoMap from "../components/Map/KakaoMap";

const MapPage = () => {
  const param = useParams();
  const { data, isLoading } = useQuery(['spot_detail', param], () =>
    fetchSpotDetailData({ param })
  );

  // console.log('상세페이지 정보:', data);

  return (
    <div>
      {data &&
        data.map((e) => {
          return (

            <div key={param.id}>
              <KakaoMap mapx={e.mapx} mapy={e.mapy} />

            </div>
          );
        })}
    </div>
  );
};

export default MapPage;
