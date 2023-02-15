import { useEffect } from 'react';
import { fetchStayDetailInfo } from '../apis/publicAPI';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../components/Loader/Loader';
import Liked from '../components/Liked/Liked';
import KakaoMap from '../components/Map/KakaoMap';
import { getDoc, setDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { FetchedStayDataType } from '../apis/publicAPI';
import { db } from '../apis/firebase';
import Cart from '../components/Cart';
import StayLiked from '../components/Liked/StayLiked';

const StayDetailPage = () => {
  const param = useParams();
  const { data: stayDetailData, isLoading: isLoadingStayDetail } = useQuery(
    ['stay_detail', param],
    () => fetchStayDetailInfo({ param }),
  );

  const getStayRecCnt = async () => {
    if (param.id) {
      const data = await getDoc(doc(db, 'stay_recommendation', `${param.id}`));
      return data.data();
    } else {
      return;
    }
  };

  const updateStayRecCnt = async () => {
    if (param.id) {
      await updateDoc(doc(db, 'stay_recommendation', param.id), {
        viewCnt: increment(1),
      });
    }
  };

  const saveNewStayRecCnt = async (spotData: FetchedStayDataType) => {
    if (param.id) {
      await setDoc(doc(db, 'stay_recommendation', param.id), {
        ...stayDetailData,
        viewCnt: 1,
      });
    }
  };

  useEffect(() => {
    const getFirestoreRecCnt = async () => {
      const res = await getStayRecCnt();
      if (res) {
        updateStayRecCnt();
      } else {
        if (stayDetailData) saveNewStayRecCnt(stayDetailData);
      }
    };
    getFirestoreRecCnt();
  }, [stayDetailData]);
  // console.log("숙박 상세정보", stayDetailData);
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
              <img src={stayDetailData.firstimage} alt="숙박 사진" />
              <div>주소 : {stayDetailData.addr1}</div>
              {/* <Link to={`/restaurant/${param.id}/map`}>지도보기</Link> */}
              {/* <div>{e.homepage}</div> */}
              <StayLiked stayDetailData={stayDetailData} />
              <Cart stayDetailData={stayDetailData} />

              <button>
                <Link to={`/stay/${param.id}/reservation`}>숙소예약</Link>
              </button>

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
