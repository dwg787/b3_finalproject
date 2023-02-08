import LandingPage from "../components/Map/LandingPage";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchAttractionDetailData } from "../apis/publicAPI";
import KakaoMap from "../components/Map/KakaoMap";

const MapPage = () => {
  const param = useParams();
  const { data, isLoading } = useQuery(["attractions_detail", param], () =>
    fetchAttractionDetailData({ param })
  );

  console.log("상세페이지 정보:", data);
  return (
    <div>
      {data &&
        data.map((e) => {
          return (
            <div>
              <KakaoMap mapx={e.mapx} mapy={e.mapy} />
            </div>
          );
        })}
    </div>
  );
};

export default MapPage;
