import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchAttractionDetailData } from '../apis/publicAPI';

const DetailPage = () => {
  const param = useParams();
  const { data, isLoading } = useQuery(['attractions_detail', param], () =>
    fetchAttractionDetailData({ param })
  );

  console.log('상세페이지 정보:', data);
  return <div>상세</div>;
};

export default DetailPage;
