import { fetchStayDetailInfo } from '../apis/publicAPI';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../components/Loader/Loader';
import Liked from '../components/Liked';
import KakaoMap from '../components/Map/KakaoMap';

const StayDetailPage = () => {
  const param = useParams();
  const { data: stayDetailData, isLoading: isLoadingStayDetail } = useQuery(
    ['stay_detail', param],
    () => fetchStayDetailInfo({ param })
  );

  // console.log('숙박 상세정보', stayDetailData);
  return (
    <div>
      {isLoadingStayDetail ? (
        <Loader />
      ) : (
        <>
          {stayDetailData ? (
            <div key={param.id}>
              <Link to={'/'}>메인으로</Link>
              <div>{stayDetailData.title}</div>
              <img src={stayDetailData.firstimage} alt='숙박 사진' />
              <div>주소 : {stayDetailData.addr1}</div>
              {/* <Link to={`/restaurant/${param.id}/map`}>지도보기</Link> */}
              {/* <div>{e.homepage}</div> */}
              <Liked stayDetailData={stayDetailData} />
              <div>{stayDetailData.overview}</div>
              <KakaoMap mapx={stayDetailData.mapx} mapy={stayDetailData.mapy} />
            </div>
          ) : (
            <div>찾으시는 정보가 없습니다</div>
          )}
        </>
      )}
    </div>
  );
};

export default StayDetailPage;
