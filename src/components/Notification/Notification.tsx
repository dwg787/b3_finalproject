import { useState } from 'react';
import styled from 'styled-components';
import useNotification from '../../hooks/useNotification';

const Notification = ({ children }: { children: string }) => {
  const [alarmMsg, setAlarmMsg] = useState();
  const { noti, setNoti, addNoti } = useNotification(children);

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

const NotificationCard = styled.div`
  width: 200px;
  height: 30px;
  z-index: 10;
  background-color: rgba(6, 6, 6, 0.2);
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const NotiContainer = styled.div`
  position: absolute;
  left: 50px;
  bottom: 50px;
  /* opacity: 0.3; */
`;
