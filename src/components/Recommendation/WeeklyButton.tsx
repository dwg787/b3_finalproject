import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { WEEKLY_TYPE } from '../../apis/apiCodes';
import { weeklyTypeState } from '../../recoil/apiDataAtoms';

const WeeklyTop10Btn = ({ children }: { children: string }) => {
  const [weeklyCodeTab, setWeeklyCodeTab] = useRecoilState(weeklyTypeState);
  const weeklyCode = WEEKLY_TYPE.find((e) => e.type === children)?.type;
  const isTypeSelected = weeklyCode === weeklyCodeTab ? true : false;

  const handleWeeklySelection = () => {
    if (weeklyCode) setWeeklyCodeTab(weeklyCode);
  };

  return (
    <WeeklyBtn
      onClick={() => {
        handleWeeklySelection();
      }}
      isTypeSelected={isTypeSelected}
    >
      {children}
    </WeeklyBtn>
  );
};

const WeeklyBtn = styled.div<{ isTypeSelected: Boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 35px;
  border: 1px solid #bababa;
  background-color: ${(props) => (props.isTypeSelected ? '#D6DCFF' : '#fffff')};
  cursor: pointer;
  margin-left: 5.23px;
  color: ${(props) => (props.isTypeSelected ? '#6478ff' : '#4D4D4D')};
  border-radius: 20px;
`;

export default WeeklyTop10Btn;
