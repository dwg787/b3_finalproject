import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchNearStayData } from '../apis/publicAPI';
import Loader from './Loader/Loader';
import StayDetail from './StayDetail';

import noimg from '../assets/noimg.avif';

const StayInfo = ({ spotData }) => {
  const { data: stayData, isLoading: isLoadingStay } = useQuery(
    ['stay_list', spotData],
    () => fetchNearStayData({ mapx: spotData.mapx, mapy: spotData.mapy }),
    {
      enabled: !!spotData,
    },
  );

  return (
    <Container>
      <RecommendListIntroWrapper>
        <RecommendListTitle>주변 숙박정보</RecommendListTitle>
      </RecommendListIntroWrapper>
      <RecommendListWrapper>
        <SliderDiv>
          {isLoadingStay ? (
            <Loader />
          ) : (
            <>
              {stayData ? (
                <>
                  {stayData.slice(0, 4).map((item) => {
                    return (
                      <StayDetail
                        key={item.contentid}
                        id={item.contentid}
                        img={item.firstimage || noimg}
                      >
                        {item.title}
                      </StayDetail>
                    );
                  })}
                </>
              ) : (
                <>
                  <div>주변 숙박정보가 없습니다.</div>
                </>
              )}
            </>
          )}
        </SliderDiv>
      </RecommendListWrapper>
    </Container>
  );
};

export default StayInfo;

const StayInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const SliderDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  height: 300px;
  float: left;
`;
const Container = styled.div`
  width: 100%;
  height: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 50px;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 1px gray;
  padding: 30px;
`;
const RecommendListIntroWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const RecommendListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const RecommendListTitle = styled.div`
  margin-left: 70px;
  color: #6478ff;
  font-size: 20px;
  font-weight: bold;
`;
