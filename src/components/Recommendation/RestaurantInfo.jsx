import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchNearRestaurantData } from '../../apis/publicAPI';
import Loader from '../Loader/Loader';
import RestaurantDetail from '../RestaurantDetail';
import noimg from '../../assets/noimg.avif';

const RestaurantInfo = ({ spotData }) => {
  const { data: restaurantData, isLoading: isLoadingRestaurant } = useQuery(
    ['restaurant_list', spotData],
    () =>
      fetchNearRestaurantData({
        mapx: spotData.mapx,
        mapy: spotData.mapy,
      }),
    {
      enabled: !!spotData,
    },
  );

  return (
    <RestaurantInfoWrapper>
      <div>주변 맛집정보</div>
      <Stres>
        {isLoadingRestaurant ? (
          <Loader />
        ) : (
          <>
            {restaurantData ? (
              <>
                {restaurantData.slice(0, 4).map((item) => {
                  return (
                    <RestaurantDetail
                      key={item.contentid}
                      id={item.contentid}
                      img={item.firstimage || noimg}
                    >
                      {item.title}
                    </RestaurantDetail>
                  );
                })}
              </>
            ) : (
              <>
                <div>주변 맛집정보가 없습니다.</div>
              </>
            )}
          </>
        )}
      </Stres>
    </RestaurantInfoWrapper>
  );
};

export default RestaurantInfo;

const RestaurantInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const StayImage = styled.img`
  width: 300px;
  height: 200px;
`;
const Stres = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 10px;
  width: 90%;
`;

const Stdata = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 10px;
`;

const SpotEachItemWrapper = styled.div`
  width: 18%;
  height: 200px;
  margin: 10px 10px 10px 10px;
  /* overflow: hidden;
  border-radius: 10px; */
`;

const SpotEachItemImg = styled.img`
  width: 200px;
  aspect-ratio: 1;
  border-radius: 10px;
  /* &:hover {
    transform: scale(1.4);
  } */
`;
