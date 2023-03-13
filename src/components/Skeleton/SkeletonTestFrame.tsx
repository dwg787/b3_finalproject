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
              return (
                <SpotEachItemWrapper key={idx}>
                  <ImgWrapper></ImgWrapper>
                  <TextWrapper>
                    <Texth3box></Texth3box>
                    <Textpbox></Textpbox>
                    <LikeWrapper></LikeWrapper>
                  </TextWrapper>
                </SpotEachItemWrapper>
              );
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
  height: 17px;
  margin-bottom: 20px;
  margin-top: 40px;
  @media (max-width: 820px) {
    margin-top: 16px;
    margin-left: 24px;
  }
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
  @media (max-width: 420px) {
    display: none;
  }
`;

const TotalCountArea = styled.div`
  width: 500px;
  height: 30px;
`;

const PaginationDotsWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
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
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 35.66px;
  border-radius: 7px;
  overflow: hidden;
  position: relative;
  @media (max-width: 820px) {
    width: 164px;
    height: 177px;
    border-radius: 6px;
    margin-bottom: 0px;
  }
`;

const ImgWrapper = styled.div`
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 138.94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 820px) {
    height: 100px;
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
  }
`;

const TextWrapper = styled.div`
  background-color: #fff;
  overflow: hidden;
  height: 130px;
  @media (max-width: 820px) {
    height: 77px;
  }
`;

const LikeWrapper = styled.div`
  position: relative;
  background-color: #f2f2f2;
  overflow: hidden;
  display: flex;
  width: 30px;
  height: 17.25px;
  gap: 5px;
  margin-top: 18.83px;
  margin-left: 146.95px;
  align-items: center;
  @media (max-width: 820px) {
    margin-top: 12px;
    margin-left: 112px;
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
  }
`;

const Texth3box = styled.div`
  position: relative;
  background-color: #f2f2f2;
  overflow: hidden;
  width: 100px;
  height: 15.84px;
  margin-bottom: 4px;
  margin-top: 15px;
  margin-left: 19.81px;
  @media (max-width: 820px) {
    width: 80px;
    height: 13px;
    margin-top: 13px;
    margin-left: 12px;
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
  }
`;

const Textpbox = styled.div`
  position: relative;
  background-color: #f2f2f2;
  overflow: hidden;
  width: 150px;
  height: 11.72px;
  margin-top: 4px;
  margin-left: 19.81px;
  @media (max-width: 820px) {
    width: 100px;
    height: 10px;
    margin-left: 12px;
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
  }
`;
