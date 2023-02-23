import React, { useState } from 'react';
import styled from 'styled-components';
import Chat from './Chat';
import chatbot from '../../assets/chatbot.png';

export default function ChatBotModal() {
  const [modal, setModal] = useState(false);
  console.log(modal);
  const modalEvents = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <Chatimgbtn onClick={modalEvents} tooggle={modal}>
        <img src={chatbot} alt="" />
      </Chatimgbtn>
      {modal === true ? <Chat /> : null}
    </>
  );
}

const Chatimgbtn = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;

  width: 58px;
  height: 58px;

  left: 94%;
  top: 90%;
  z-index: 1000;
`;
