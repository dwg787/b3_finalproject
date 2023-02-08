import React, { useState } from 'react';
// import { fetchAttractionData } from '../apis/publicAPI';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { STAY_TYPE } from '../apis/apiCodes';
import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import { staySelectionState } from '../recoil/apiDataAtoms';
import styled from 'styled-components';

const SelectBtn = ({ children }: { children: string }) => {
  const [stay, setStay] = useRecoilState(staySelectionState);
  const value = STAY_TYPE.find((e) => e.type === children)?.id;

  const isSelectedStay = value === stay ? true : false;

  const handleStaySelection = () => {
    if (value) {
      //숙소 유형 코드
      console.log('숙소유형', value);
      setStay(value);
    }
  };

  //   const { mutate } = useMutation(fetchStayData, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['stay_data']);
  //     },
  //   });
  //   if (!isLoading) console.log('data', data);

  return (
    <>
      <CustomBtn
        onClick={() => {
          handleStaySelection();
        }}
        isSelectedStay={isSelectedStay}
      >
        {children}
      </CustomBtn>
    </>
  );
};
export default SelectBtn;

const CustomBtn = styled.button<{ isSelectedStay: boolean }>`
  width: 70px;
  height: 30px;
  background-color: ${(props) =>
    props.isSelectedStay ? '#f19936' : '#d7d7d7'};
  border: none;
  border-radius: 5px;
`;
