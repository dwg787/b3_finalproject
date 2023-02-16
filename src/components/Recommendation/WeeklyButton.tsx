import React, { useState } from 'react';
import styled from 'styled-components';
import { WEEKLY_TYPE } from '../../apis/apiCodes';

export default function WeeklyTop10Btn({ children }: { children: string }) {
  const [weeklyCodeTab, setWeeklyCodeTab] = useState('');
  const weeklyCode = WEEKLY_TYPE.find((e) => e.type === children)?.id;
  const weeklyRegion = weeklyCode === weeklyCodeTab ? true : false;

  const handleWeeklySelection = () => {
    if (weeklyCode) setWeeklyCodeTab(weeklyCode);
  };

  return (
    <WeeklyBtn
      onClick={() => {
        handleWeeklySelection();
      }}
      weeklyRegion={weeklyRegion}
    >
      {children}
    </WeeklyBtn>
  );
}

const WeeklyBtn = styled.button<{ weeklyRegion: Boolean }>`
  width: 70px;
  height: 35px;
  border: 1px solid #6478ff;
  background-color: ${(props) => (props.weeklyRegion ? '#6478ff' : '#fffff')};
  cursor: pointer;
  margin-left: 30px;
  color: ${(props) => (props.weeklyRegion ? '#6478ff' : '#fffff')};
  border-radius: 20px;
`;
