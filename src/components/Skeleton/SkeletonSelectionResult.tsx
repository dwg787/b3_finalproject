import styled, { keyframes } from 'styled-components';

const SkeletonSelectionResult = () => {
  return (
    <>
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
    </>
  );
};

export default SkeletonSelectionResult;

const SkeletonLoadingAnimation = keyframes`
   0% {
    transform: translateX(-100%);
  }
  50%,
  100% {
    transform: translateX(100%);
  }
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
