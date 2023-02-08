import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchAttractionDetailData } from '../apis/publicAPI';

const MapPage = () => {
  const param = useParams();
  const { data, isLoading } = useQuery(['attractions_detail', param], () =>
    fetchAttractionDetailData({ param })
  );

  console.log('상세페이지 정보:', data);
  return (
    <div>
      {data &&
        data.map((e) => {
          return (
            <div>
              x좌표:{e.mapx}, y좌표{e.mapy}
            </div>
          );
        })}
    </div>
  );
};

export default MapPage;
