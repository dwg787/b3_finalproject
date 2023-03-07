import { useRecoilState } from 'recoil';
import { alarmState } from '../recoil/apiDataAtoms';

const useNotification = (alarmMsg: string) => {
  const [noti, setNoti] = useRecoilState(alarmState);

  const addNoti = () => {
    setNoti((prev) => {
      return prev.concat(`${alarmMsg}`);
    });
    let timer = setTimeout(() => {
      setNoti((prev) => prev.slice(1));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  };
  return { noti, setNoti, addNoti };
};

export default useNotification;
