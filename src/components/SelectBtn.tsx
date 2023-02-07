import React, { useState } from 'react';
import { fetchStayData } from '../apis/publicAPI';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { STAY_TYPE } from '../apis/apiCodes';
import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import { staySelectionState } from '../recoil/apiDataAtoms';

const SelectBtn = ({ children }: { children: string }) => {
  const [stay, setStay] = useRecoilState(staySelectionState);
  //   const { data, isLoading } = useQuery(['stay_data'], fetchStayData);
  //   const queryClient = useQueryClient();

  const value = STAY_TYPE.find((e) => e.type === children)?.id;

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
      <button
        onClick={() => {
          handleStaySelection();
        }}
      >
        {children}
      </button>
    </>
  );
};
export default SelectBtn;
