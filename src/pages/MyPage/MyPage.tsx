import React, { useState } from 'react';
import BlueFooter from '../../components/Footer/BlueFooter';
import DetailFooter from '../../components/Footer/DetailFooter';
import Footer from '../../components/Footer/Footer';
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
        <Footer />
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
        borderRadius: isActive ? '282px' : '',

        boxShadow: isActive ? '0.5px 0.5px 0.5px 0.3px#c6c2c2' : '',
        width: '126px',
        height: '29px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px 23px 8px 22px',
      }}
    >
      {title}
    </li>
  );
};
