import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { WEEKLY_TYPE } from '../../apis/apiCodes';
import { weeklyTypeState } from '../../recoil/apiDataAtoms';
import Cafe from './Tabs/Cafe';
import Rest from './Tabs/Rest';
import Spot from './Tabs/Spot';
import Stay from './Tabs/Stay';
import WeeklyTop10Btn from './WeeklyButton';

export default function WeeklyTop10() {
  const WeeklyTypeId = useRecoilValue(weeklyTypeState);
  const tabContArr = [<Spot />, <Stay />, <Rest />, <Cafe />];
  const selectedWeeklyTypeId: any | undefined = WEEKLY_TYPE.find(
    (e) => e.type === WeeklyTypeId,
  )?.id;

  return (
    <Container>
      <WeeklyTopText>위클리 인기 TOP 6</WeeklyTopText>
      <WeeklyButtonBox>
        {WEEKLY_TYPE.map((e) => {
          return <WeeklyTop10Btn key={e.id}>{e.type}</WeeklyTop10Btn>;
        })}
      </WeeklyButtonBox>
      <>{tabContArr[selectedWeeklyTypeId - 81]}</>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1036px;
  width: 100%;
  height: 601.72px;
  display: flex;
  flex-direction: column;
  margin-top: 14.65px;

  border-radius: 11.29px;
  box-shadow: 2.26px 2.26px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const WeeklyTopText = styled.p`
  margin-left: 23.93px;
  color: #6478ff;
  font-size: 17.88px;
  font-weight: bold;
  margin-top: 22.72px;
`;

const WeeklyButtonBox = styled.div`
  display: flex;
  margin-top: 22.02px;
  margin-left: 25.12px;
`;
