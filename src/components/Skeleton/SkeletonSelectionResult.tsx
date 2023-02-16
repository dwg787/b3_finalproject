import React from 'react';
import styled from 'styled-components';
import leftArrow from '../../assets/left-arrow.avif';
import rightArrow from '../../assets/right-arrow.avif';

const SkeletonSelectionResult = () => {
  return (
    <>
      <ListItemCount>
        <TotalCountArea></TotalCountArea>
      </ListItemCount>
      <SearchListWrapper>
        <BtnWrapper></BtnWrapper>
        <ResultWrapper>
          <SpotEachItemWrapper></SpotEachItemWrapper>
          <SpotEachItemWrapper></SpotEachItemWrapper>
          <SpotEachItemWrapper></SpotEachItemWrapper>
          <SpotEachItemWrapper></SpotEachItemWrapper>
          <SpotEachItemWrapper></SpotEachItemWrapper>
          <SpotEachItemWrapper></SpotEachItemWrapper>
          <SpotEachItemWrapper></SpotEachItemWrapper>
          <SpotEachItemWrapper></SpotEachItemWrapper>
        </ResultWrapper>
        <BtnWrapper></BtnWrapper>
      </SearchListWrapper>
    </>
  );
};

export default SkeletonSelectionResult;

const ListItemCount = styled.div`
  margin-top: 30px;
  margin-left: 30px;
`;

const SearchListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ResultWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const BtnWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
`;

const MoveBtnStyle = styled.img`
  width: 50px;
  height: 50px;
`;

const TotalCountArea = styled.div`
  width: 500px;
  height: 30px;
`;

const SpotEachItemWrapper = styled.div`
  width: 20%;
  height: 200px;
  background-color: #d7d7d7;
  border-radius: 5px;
  margin: 10px 10px 10px 10px;
`;
