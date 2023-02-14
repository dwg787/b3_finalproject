import { SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { alarmState } from '../recoil/apiDataAtoms';

const useNotification = (children: string) => {
  const alarmMsg = useRecoilValue(alarmState);
  const [noti, setNoti] = useState([]);

  alarmMsg.push(children);

  const addNoti = () => {
    // setNoti((prev) => {
    //   return prev.concat(alarmMsg);
    // });
    setTimeout(() => {
      setNoti((prev) => prev.slice(1));
    }, 3000);
  };
  return { noti, setNoti, addNoti };
};

export default useNotification;
