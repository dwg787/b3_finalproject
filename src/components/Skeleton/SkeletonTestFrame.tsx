import styled, { keyframes } from 'styled-components';

const SkeletonTestFrame = () => {
  return (
    <>
      <ListItemCount>
        <TotalCountArea></TotalCountArea>
      </ListItemCount>
      <SearchListWrapper>
        <BtnWrapper></BtnWrapper>
        <ResultWrapper>
          {/* {Array(8)
            .fill('')
            .map((e) => {
              return <SpotEachItemWrapper></SpotEachItemWrapper>;
            })} */}
        </ResultWrapper>
        <BtnWrapper></BtnWrapper>
      </SearchListWrapper>
      <PaginationDotsWrapper></PaginationDotsWrapper>
    </>
  );
};

export default SkeletonTestFrame;

const ListItemCount = styled.div`
  margin-top: 30px;
  margin-left: 59px;
`;

const SearchListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ResultWrapper = styled.div`
  position: relative;
  width: 94%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
`;

const BtnWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 30px;
`;

const TotalCountArea = styled.div`
  width: 500px;
  height: 30px;
`;

const PaginationDotsWrapper = styled.div`
  margin-top: 30px;
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
