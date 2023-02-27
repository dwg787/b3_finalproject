import React from 'react';
import { useRecoilState } from 'recoil';
import { AREA_CODE } from '../../apis/apiCodes';
import { regionSelectionState } from '../../recoil/apiDataAtoms';
import styled from 'styled-components';

// import noimg from '../../assets/'

const SelectRegionBtn = ({ children }: { children: string }) => {
  const [region, setRegion] = useRecoilState(regionSelectionState);

  const regionCode = AREA_CODE.find((e) => e.area === children)?.id;
  const isSelectedRegion = regionCode === region ? true : false;

  const handleRegionSelection = () => {
    if (regionCode) setRegion(regionCode);
  };

  return (
    <>
      <CustomBtn
        onClick={() => {
          handleRegionSelection();
        }}
        isSelectedRegion={isSelectedRegion}
      >
        {children}
      </CustomBtn>
    </>
  );
};

export default React.memo(SelectRegionBtn);

const CustomBtn = styled.button<{ isSelectedRegion: boolean }>`
  width: 70px;
  height: 30px;
  background-color: ${(props) =>
    props.isSelectedRegion ? '#6478FF' : '#EBEEFF'};
  color: ${(props) => (props.isSelectedRegion ? '#FFFFFF' : '#606060')};
  border: none;
  border-radius: 10px;
  box-shadow: 1px 1px #c8c8c8;
  font-weight: 800;
  cursor: pointer;
`;
