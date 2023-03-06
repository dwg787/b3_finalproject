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
          {Array(8)
            .fill('')
            .map((_, idx) => {
              return <SpotEachItemWrapper key={idx}></SpotEachItemWrapper>;
            })}
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

const SkeletonLoadingAnimation = keyframes`
   0% {
    transform: translateX(-100%);
  }
  50%,
  100% {
    transform: translateX(100%);
  }
`;

const SpotEachItemWrapper = styled.div`
  width: 216px;
  height: 234px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-bottom: 35.66px;
  border-radius: 7px;
  overflow: hidden;
  position: relative;
  @media (max-width: 820px) {
    width: 164px;
    height: 177px;
    margin-bottom: 0px;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${SkeletonLoadingAnimation} 1s infinite linear;
    @media (max-width: 820px) {
      width: 164px;
      height: 177px;
      margin-bottom: 0px;
    }
  }
`;
