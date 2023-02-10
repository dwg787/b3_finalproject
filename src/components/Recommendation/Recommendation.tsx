import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchSpotSearchData } from '../../apis/publicAPI';

const Recommendation = () => {
  const { data, isLoading } = useQuery(
    ['recommendation_key'],
    fetchSpotSearchData
  );

  //   console.log('추천 컴포넌트 데이터', data);
  return <Container></Container>;
};

export default Recommendation;

const Container = styled.div`
  width: 100%;
  height: 500px;
  background-color: #d7d7d7;
`;
