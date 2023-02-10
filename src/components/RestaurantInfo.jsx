import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchNearRestaurantData } from '../apis/publicAPI';
import Loader from './Loader/Loader';

const RestaurantInfo = ({ spotData }) => {
  const { data: restaurantData, isLoading: isLoadingRestaurant } = useQuery(
    ['restaurant_detail', spotData],
    () =>
      fetchNearRestaurantData({
        mapx: spotData.mapx,
        mapy: spotData.mapy,
      }),
    {
      enabled: !!spotData,
    }
  );

  return (
    <>
      <div>주변 맛집정보</div>
      <Stres>
        {isLoadingRestaurant ? (
          <Loader />
        ) : (
          <>
            {restaurantData ? (
              <>
                {restaurantData.slice(0, 5).map((item) => {
                  return (
                    <SpotEachItemWrapper key={item.contentid}>
                      <SpotEachItemImgWrapper
                        src={item?.firstimage}
                        alt='주변맛집 이미지'
                      />
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/${item.contentid}`}
                      >
                        {item?.title}
                      </Link>
                    </SpotEachItemWrapper>
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
    </>
  );
};

export default RestaurantInfo;

const StayImage = styled.img`
  width: 300px;
  height: 200px;
`;
const Stres = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 10px;
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

const SpotEachItemImgWrapper = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  /* &:hover {
    transform: scale(1.4);
  } */
`;
