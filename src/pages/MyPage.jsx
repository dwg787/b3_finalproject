import React, { useState } from "react";
import styled from "styled-components";
import MyCart from "../components/MyPage/MyCart";
import MyFav from "../components/MyPage/MyFav";
import MyInfo from "../components/MyPage/MyInfo";
import MyTicket from "../components/MyPage/MyTicket";

const MyPage = () => {
  // 초기 화면에 0번째 탭이 active되길 원한다면 0값을 입력한다.
  const [activeIndex, setActiveIndex] = useState(0);

  //(1) 탭 Title, (2) 탭 Content를 담은 배열
  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          내 정보
        </li>
      ),
      tabCont: (
        <div>
          <MyInfo />
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          장바구니
        </li>
      ),
      tabCont: (
        <div>
          <MyCart />
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 2 ? "is-active" : ""}
          onClick={() => tabClickHandler(2)}
        >
          찜하기
        </li>
      ),
      tabCont: (
        <div>
          <MyFav />
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 3 ? "is-active" : ""}
          onClick={() => tabClickHandler(3)}
        >
          내 예약 정보
        </li>
      ),
      tabCont: (
        <div>
          <MyTicket />
        </div>
      ),
    },
  ];

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  return (
    <StMyPageMain>
      <StMyPageNav>
        {/* map 함수를 사용해서 각 obj의 탭 Title이 작성되도록  */}
        <StMyList>
          {tabContArr.map((section, i) => {
            return <div key={i}>{section.tabTitle}</div>;
          })}
        </StMyList>
        {/* activeIndex의 탭콘트만 보여줌! */}
        <StMyPageInfo>{tabContArr[activeIndex].tabCont}</StMyPageInfo>
      </StMyPageNav>
    </StMyPageMain>
  );
};

export default MyPage;

const StMyPageMain = styled.div`
  width: 100%;
  display: flex;
  /* height: 100%; */
`;
const StMyPageNav = styled.div`
  width: 100%;
  /* height: 800px; */
  display: flex;
  justify-content: center;
  /* align-items: baseline; */

  flex-direction: column;
  /* border: 1px solid black; */
`;

const StMyList = styled.ul`
  list-style: none;
  background-color: #dcdcdc;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  margin: 10px;
  /* .submenu {
    width: 100% auto;
    padding: 15px 10px;
    cursor: pointer;
  } */
`;

const StMyPageInfo = styled.div`
  width: 90%;
  /* height: 700px; */
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  border: 1px solid black;
  background-color: #c7ddf0;

  flex-wrap: wrap;
`;
