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

// const slideIn = keyframes`
//   from{
//     transform: translateY(-100%);
//   }
//   to{
//     transform: translateY(0%);
//   }
// `;

const NotificationCard = styled.div`
  width: 300px;
  height: 50px;
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
  /* position: absolute; */
  position: fixed;
  right: 830px;
  top: 50px;
  z-index: 1000;

  /* opacity: 0.3; */
`;
