import React, { useState } from 'react';
import styled from 'styled-components';
import BlueFooter from '../components/Footer/BlueFooter';
import MyCart from '../components/MyPage/MyCart';
import MyFav from '../components/MyPage/MyFav';
import MyInfo from '../components/MyPage/MyInfo';
import MyTicket from '../components/MyPage/MyTicket';

const MyPage = () => {
  // 초기 화면에 0번째 탭이 active되길 원한다면 0값을 입력한다.
  const [activeIndex, setActiveIndex] = useState(0);

  //(1) 탭 Title, (2) 탭 Content를 담은 배열
  const tabContArr = [
    {
      tabTitle: (
        <Tab
          title="내 정보 관리"
          isActive={activeIndex === 0}
          onClick={() => tabClickHandler(0)}
        />
      ),
      tabCont: <MyInfo />,
    },
    {
      tabTitle: (
        <Tab
          title="나의 찜목록"
          isActive={activeIndex === 1}
          onClick={() => tabClickHandler(1)}
        />
      ),
      tabCont: <MyFav />,
    },
  ];

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  return (
    <StMyPageMain>
      <StMyPageNav>
        <StMyPageHeader>마이페이지</StMyPageHeader>
        <TabHr />
        {/* map 함수를 사용해서 각 obj의 탭 Title이 작성되도록  */}
        <StMyList>
          {tabContArr.map((section, i) => {
            return (
              <StMyListTab right key={i}>
                {section.tabTitle}
              </StMyListTab>
            );
          })}
        </StMyList>
        {/* activeIndex의 탭콘트만 보여줌! */}
        <StMyPageInfo>{tabContArr[activeIndex].tabCont}</StMyPageInfo>
        <BlueFooter />
      </StMyPageNav>
    </StMyPageMain>
  );
};

export default MyPage;

const Tab = (props) => {
  const { title, isActive, onClick } = props;

  return (
    <li
      className={isActive ? 'is-active' : ''}
      onClick={onClick}
      style={{
        color: isActive ? '#6478ff' : '',
        borderRadius: isActive ? '335.4px' : '',
        boxShadow: isActive ? '2px 2px 3px gray' : '',
        width: '150.93px',
        height: '34.88px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {title}
    </li>
  );
};

//마이페이지 전체 컨테이너
const StMyPageMain = styled.div`
  width: 100%;
  display: flex;
  /* height: 100%; */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(124, 141, 255, 1) 69%,
    rgba(255, 255, 255, 1) 120%
  );
`;
const StMyPageNav = styled.div`
  width: 100%;
  /* height: 800px; */
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
  /* background-color: #dcdcdc; */
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const StMyListTab = styled.div`
  margin: 10px;
  /* background-color: #d89090; */
  margin: 29px 197.1px;

  font-size: 18.91px;
  line-height: 17.7px;
  color: #4d4d4d;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 150.93px;
  height: 34.88px;

  /* margin-right: ${(props) => (props.right ? '394.2px' : '0')}; */
`;

//마이페이지 내용 부분
const StMyPageInfo = styled.div`
  width: 1232px;
  /* height: 931.4px; */

  /* height: 700px; */
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  /* border: 1px solid black; */
  background-color: #ffffff;
  border-radius: 13.43px;
  flex-wrap: wrap;
  box-shadow: 5px 5px 10px 1px gray;
`;
