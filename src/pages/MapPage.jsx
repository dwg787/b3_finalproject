import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchSpotDetailData } from '../apis/publicAPI';

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
              x좌표:{e.mapx}, y좌표{e.mapy}
            </div>
          );
        })}
    </div>
  );
};

export default MapPage;
