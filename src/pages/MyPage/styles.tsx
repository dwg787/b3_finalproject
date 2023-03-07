import styled from 'styled-components';

//마이페이지 전체 컨테이너
const StMyPageMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-bottom: 110px; */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(162, 174, 255, 1) 69%,
    rgba(162, 174, 255, 1) 100%
  );
`;
const StMyPageNav = styled.div`
  /* width: 100%; */
  max-width: 1036px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//마이페이지 헤더부분
const StMyPageHeader = styled.div`
  width: 100%;
  height: 55px;
  font-size: 18.83px;
  line-height: 17.6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6478ff;
  font-weight: bold;
`;

const TabHr = styled.hr`
  border: solid #6478ff 1.13px;
  width: 1036px;
  @media screen and (max-width: 820px) {
    width: 100%;
  }
  @media screen and (max-width: 390px) {
    width: 90%;
  }
`;

//마이페이지 탭 부분
const StMyList = styled.ul`
  width: 100%;
  list-style: none;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const StMyListTab = styled.div`
  margin: 14px 155px 19px 155px;
  cursor: pointer;
  font-size: 16px;
  line-height: 14.9px;
  color: #4d4d4d;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 126px;
  height: 29px;
  @media screen and (max-width: 820px) {
    margin: 16.81px 40px 19px 40px;
  }
`;

//마이페이지 내용 부분
const StMyPageInfo = styled.div`
  width: 1036px;
  @media screen and (max-width: 820px) {
    width: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 390px) {
    width: 100%;
  }
`;

export {
  StMyPageMain,
  StMyPageNav,
  StMyPageHeader,
  TabHr,
  StMyList,
  StMyListTab,
  StMyPageInfo,
};
