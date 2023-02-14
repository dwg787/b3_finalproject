// import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useNotification from '../../hooks/useNotification';

const Notification = () => {
  // const [alarmMsg, setAlarmMsg] = useState();
  const { noti, addNoti } = useNotification('');

  return (
    <div>
      <NotiContainer>
        {noti.map((message, idx) => (
          <NotificationCard key={idx}>{message}</NotificationCard>
        ))}
      </NotiContainer>
    </div>
  );
};

export default Notification;

const alarmFadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const NotificationCard = styled.div`
  width: 300px;
  height: 50px;
  z-index: 10;
  background-color: rgba(6, 6, 6, 0.5);
  border-radius: 5px;
  margin-top: 30px;
  margin-right: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  animation: ${alarmFadeOut} 3s ease-out;
`;

const NotiContainer = styled.div`
  position: absolute;
  right: 500px;
  top: 50px;
  /* opacity: 0.3; */
`;
