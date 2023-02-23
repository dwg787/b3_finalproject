import { useState } from 'react';
import styled from 'styled-components';
import Cafe from './Tabs/Cafe';
import Rest from './Tabs/Rest';
import Spot from './Tabs/Spot';
import Stay from './Tabs/Stay';

const WeeklyTop10v2 = () => {
  // 초기 화면에 0번째 탭이 active되길 원한다면 0값을 입력한다.
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  //(1) 탭 Title, (2) 탭 Content를 담은 배열
  const tabContArr = [
    {
      tabTitle: (
        <div
          className={activeIndex === 0 ? 'is-active' : ''}
          onClick={() => tabClickHandler(0)}
        >
          관광지
        </div>
      ),
      tabCont: (
        <div>
          <Spot />
        </div>
      ),
    },
    {
      tabTitle: (
        <div
          className={activeIndex === 1 ? 'is-active' : ''}
          onClick={() => tabClickHandler(1)}
        >
          숙박
        </div>
      ),
      tabCont: (
        <div>
          <Stay />
        </div>
      ),
    },
    {
      tabTitle: (
        <div
          className={activeIndex === 2 ? 'is-active' : ''}
          onClick={() => tabClickHandler(2)}
        >
          맛집
        </div>
      ),
      tabCont: (
        <div>
          <Rest />
        </div>
      ),
    },
    {
      tabTitle: (
        <div
          className={activeIndex === 3 ? 'is-active' : ''}
          onClick={() => tabClickHandler(3)}
        >
          카페
        </div>
      ),
      tabCont: (
        <div>
          <Cafe />
        </div>
      ),
    },
  ];

  return (
    <Container>
      <WeeklyTopText>위클리 인기 TOP10</WeeklyTopText>
      <div>
        {/* map 함수를 사용해서 각 obj의 탭 Title이 작성되도록  */}
        <WeeklyButtonBox>
          {tabContArr.map((section, i) => {
            return (
              <WeeklyButton
                key={i}
                style={{
                  backgroundColor:
                    activeIndex === 0 &&
                    activeIndex === 1 &&
                    activeIndex === 2 &&
                    activeIndex === 3
                      ? '#6478ff'
                      : 'white',
                }}
              >
                {section.tabTitle}
              </WeeklyButton>
            );
          })}
        </WeeklyButtonBox>
        {/* activeIndex의 탭콘트만 보여줌! */}
        <div>{tabContArr[activeIndex].tabCont}</div>
      </div>
    </Container>
  );
};

export default WeeklyTop10v2;

const Container = styled.div`
  width: 90%;
  height: 800px;
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  border: 1.5px solid #6478ff;
  border-radius: 50px;
  box-shadow: 5px 5px #c8c8c8;
  background-color: white;
`;

const WeeklyTopText = styled.p`
  margin-left: 70px;
  color: #6478ff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
`;

const WeeklyButtonBox = styled.div`
  margin-top: 20px;
  margin-left: 40px;
`;

const WeeklyButton = styled.button`
  width: 70px;
  height: 35px;
  border: 1px solid #6478ff;
  cursor: pointer;
  margin-left: 30px;
  border-radius: 20px;
  background-color: white;
  color: #6478ff;
  font-weight: bold;
`;
