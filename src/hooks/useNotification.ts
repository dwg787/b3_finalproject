import { SetStateAction, useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { alarmState } from '../recoil/apiDataAtoms';

const useNotification = (alarmMsg: string) => {
  const [noti, setNoti] = useRecoilState(alarmState);

  const deleteNoti = () => {
    setNoti((prev) => prev.slice(1));
  };

  const addNoti = () => {
    setNoti((prev) => {
      return prev.concat(`${alarmMsg}`);
    });
    setTimeout(() => {
      setNoti((prev) => prev.slice(1));
    }, 2000);
  };
  return { noti, setNoti, addNoti, deleteNoti };
};

export default useNotification;
