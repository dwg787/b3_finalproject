import styled from 'styled-components';

//마이페이지 전체 컨테이너
const StMyPageMain = styled.div`
  width: 100%;
  display: flex;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(124, 141, 255, 1) 69%,
    rgba(255, 255, 255, 1) 120%
  );
`;
const StMyPageNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

//마이페이지 헤더부분
const StMyPageHeader = styled.div`
  width: 100%;
  margin: 19.68px 0 23.32px 0;
  font-size: 22.4px;
  line-height: 20.9px;
  display: flex;
  justify-content: center;
  color: #6478ff;
  font-weight: bold;
`;

const TabHr = styled.hr`
  border: solid #6478ff 1.34px;
  width: 90.08%;
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
  margin: 10px;
  margin: 29px 197.1px;
  cursor: pointer;
  font-size: 18.91px;
  line-height: 17.7px;
  color: #4d4d4d;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150.93px;
  height: 34.88px;
`;

//마이페이지 내용 부분
const StMyPageInfo = styled.div`
  width: 1232px;
  background-color: #ffffff;
  border-radius: 13.43px;
  flex-wrap: wrap;
  box-shadow: 5px 5px 10px 1px gray;
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
