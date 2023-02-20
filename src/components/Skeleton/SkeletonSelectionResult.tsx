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
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(100%);
  }
`;

const ResultWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const SpotEachItemWrapper = styled.div`
  width: 20%;
  height: 350px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 20px 20px 20px 20px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${SkeletonLoadingAnimation} 1s infinite linear;
  }
`;
