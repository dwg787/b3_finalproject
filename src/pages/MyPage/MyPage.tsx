import React, { useState } from 'react';
import BlueFooter from '../../components/Footer/BlueFooter';
import DetailFooter from '../../components/Footer/DetailFooter';
import MyFav from '../../components/MyPage/MyFav';
import MyInfo from '../../components/MyPage/MyInfo';
import {
  StMyPageMain,
  StMyPageNav,
  StMyPageHeader,
  TabHr,
  StMyList,
  StMyListTab,
  StMyPageInfo,
} from './styles';

const MyPage = () => {
  // 초기 화면에 0번째 탭이 active되길 원한다면 0값을 입력한다.
  const [activeIndex, setActiveIndex] = useState<number>(0);

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

  const tabClickHandler = (index: number) => {
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
            return <StMyListTab key={i}>{section.tabTitle}</StMyListTab>;
          })}
        </StMyList>
        {/* activeIndex의 탭콘트만 보여줌! */}
        <StMyPageInfo>{tabContArr[activeIndex].tabCont}</StMyPageInfo>
        <DetailFooter />
      </StMyPageNav>
    </StMyPageMain>
  );
};

export default MyPage;

const Tab = ({
  title,
  isActive,
  onClick,
}: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) => {
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
