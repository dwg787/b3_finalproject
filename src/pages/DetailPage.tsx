import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

import { fetchSpotDetailData } from "../apis/publicAPI";
import styled from "styled-components";
import Loader from "../components/Loader";
import RestaurantInfo from "../components/RestaurantInfo";
import Stayinfo from "../components/Stayinfo";
import Liked from "../components/Liked";

const DetailPage = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { data: spotData, isLoading: isLoadingSpot } = useQuery(
    ["spot_detail", param],
    () => fetchSpotDetailData({ param })
  );

  return (
    <Container>
      <div>
        {isLoadingSpot ? (
          <Loader />
        ) : (
          <>
            {spotData ? (
              <div key={param.id}>
                <Link to={"/"}>메인으로</Link>
                <div>{spotData.title}</div>
                <img src={spotData.firstimage} alt="관광지 사진" />
                <div>주소 : {spotData.addr1}</div>
                <Link to={`/${param.id}/map`}>지도보기</Link>
                {/* <div>{e.homepage}</div> */}
                <Liked spotData={spotData} />
                <div>{spotData.overview}</div>
              </div>
            ) : (
              <div>찾으시는 정보가 없습니다</div>
            )}
          </>
        )}

        <SideInfoWrapper>
          <StayInfoWrapper>
            <Stayinfo spotData={spotData} />
          </StayInfoWrapper>
          <RestaurantInfoWrapper>
            <RestaurantInfo spotData={spotData} />
          </RestaurantInfoWrapper>
        </SideInfoWrapper>
      </div>
    </Container>
  );
};

export default DetailPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SideInfoWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const StayInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RestaurantInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StayImage = styled.img`
  width: 300px;
  height: 200px;
`;
