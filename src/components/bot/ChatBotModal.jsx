import React, { useState } from "react";
import styled from "styled-components";
import Chat from "./Chat";

export default function ChatBotModal() {
  const [modal, setModal] = useState(false);
  console.log(modal);
  const modalEvents = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <Chatimgbtn onClick={modalEvents} tooggle={modal}>
        ❔
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
  background-color: #6478ff;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  left: 94%;
  top: 90%;
`;
