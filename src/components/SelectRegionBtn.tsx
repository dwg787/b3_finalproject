import React from 'react';
import { useRecoilState } from 'recoil';
import { AREA_CODE } from '../apis/apiCodes';
import { regionSelectionState } from '../recoil/apiDataAtoms';
import styled from 'styled-components';

const SelectRegionBtn = ({ children }: { children: string }) => {
  const [region, setRegion] = useRecoilState(regionSelectionState);

  const regionCode = AREA_CODE.find((e) => e.area === children)?.id;
  const isSelectedRegion = regionCode === region ? true : false;

  const handleRegionSelection = () => {
    if (regionCode) setRegion(regionCode);
    console.log('누른 지역:', regionCode);
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

export default SelectRegionBtn;

const CustomBtn = styled.button<{ isSelectedRegion: boolean }>`
  width: 70px;
  height: 30px;
  background-color: ${(props) =>
    props.isSelectedRegion ? '#f19936' : '#000000'};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
