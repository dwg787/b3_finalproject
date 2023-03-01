import styled from 'styled-components';
import SelectRegionBtn from './SelectRegionBtn';
import { AREA_CODE } from '../../apis/apiCodes';

const RegionSelection = () => {
  return (
    <SelectRegionBtnWrapper>
      {/* <MainImg src={mainImg} alt='이미지' /> */}
      {AREA_CODE.map((e) => {
        return <SelectRegionBtn key={e.id}>{e.area}</SelectRegionBtn>;
      })}
    </SelectRegionBtnWrapper>
  );
};

export default RegionSelection;

const SelectRegionBtnWrapper = styled.div`
  border-top: 1px solid #6478ff;
  max-width: 1036px;
  padding: 17px 50px 0px 50px;
  width: 100%;
  height: 100px;
  background-size: cover;
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap; */
  gap: 8px;
`;
