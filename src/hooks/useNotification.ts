import { SetStateAction, useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { alarmState } from '../recoil/apiDataAtoms';

const useNotification = (alarmMsg: string) => {
  const [noti, setNoti] = useRecoilState(alarmState);

  // console.log('알람메시지 잘 전달되었나?', alarmMsg);
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
    // useEffect(()=>{
    //   return () => {
    //     clearTimeout(timer)
    //   }
    // },[setNoti])
  };
  return { noti, setNoti, addNoti, deleteNoti };
};

export default useNotification;
