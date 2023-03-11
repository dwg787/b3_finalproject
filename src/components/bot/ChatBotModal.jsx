import React, { useState } from 'react';
import styled from 'styled-components';
import Chat from './Chat';
import chatbot from '../../assets/chatbot.png';

export default function ChatBotModal() {
  const [modal, setModal] = useState(false);
  const modalEvents = () => {
    setModal((prev) => !prev);
  };
  return (
    <>
      <Chatimgbtn onClick={modalEvents}>
        <ChatingImg src={chatbot} alt="" />
      </Chatimgbtn>
      {modal === true ? <Chat setModal={setModal} /> : null}
    </>
  );
}

const Chatimgbtn = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-left: 3px;
  width: 30px;
  height: 30px;
  left: 94%;
  top: 90%;
  z-index: 500;
  cursor: pointer;
  @media screen and (max-width: 820px) {
    width: 40px;
    height: 40px;
    left: 80%;
  }
`;

const ChatingImg = styled.img`
  width: 63px;
  height: 63px;
  @media screen and (max-width: 820px) {
    width: 43px;
    height: 43px;
  }
`;
