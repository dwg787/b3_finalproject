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

const WeeklyBtn = styled.button<{ isTypeSelected: Boolean }>`
  width: 70px;
  height: 35px;
  border: 1px solid #6478ff;
  background-color: ${(props) => (props.isTypeSelected ? '#6478ff' : '#fffff')};
  cursor: pointer;
  margin-left: 30px;
  color: ${(props) => (props.isTypeSelected ? '#fffff' : '#6478ff')};
  border-radius: 20px;
`;

export default WeeklyTop10Btn;
