import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import styled, { ThemeProvider } from "styled-components";

export default function Chat() {
  const steps = [
    {
      id: "1",
      message: "안녕하세요 저는 방곡이에요! 무었을도와드릴까요?",
      trigger: "2",
    },
    {
      id: "2",
      options: [
        { value: 1, label: "결제문의", trigger: "3", message: "결제문의" },
        { value: 2, label: "상품문의", trigger: "4", message: "상품문의" },
        { value: 3, label: "고객센터", trigger: "9", message: "고객센터" },
      ],
    },
    {
      id: "3",
      message: "결제문의를 선택하셧는데 어떤 도움이 필요하세요?",
      trigger: "6",
    },
    {
      id: "4",
      message: "상품문의를 선택하셧는데 어떤 도움이 필요하신가요?",
      trigger: "20",
    },
    {
      id: "5",
      message: "아직준비중이에요 :(",
      end: false,
    },
    {
      id: "6",
      options: [
        {
          value: 1,
          label: "구매취소 및 환불",
          trigger: "7",
          message: "구매취소 및 환불",
        },
        { value: 2, label: "서비스장애", trigger: "8", message: "서비스장애" },
        {
          value: 3,
          label: "고객센터연결",
          trigger: "9",
          message: "고객센터연결",
        },
      ],
    },
    {
      id: "7",
      message: "구매취소및 환불 서비스입니다",
      trigger: "15",
    },
    {
      id: "8",
      message: "어떤 문제점인지 말해주시겠어요?",
      trigger: "10",
    },
    {
      id: "9",
      message:
        "고객센터 1511-1500로 전화주시면 보다 자세한문의가 가능합니다 😄",
      end: true,
    },
    {
      id: "10",
      user: true,
      trigger: "11",
    },
    {
      id: "11",
      message:
        "문제점 <{previousValue}>가 서비스지원팀으로 전달되었습니다! 빠른시일내로 조치드리겠습니다! 감사합니다!",
      trigger: "12",
    },
    {
      id: "12",
      message: "다른문의는 없으신가요?",
      trigger: "13",
    },
    {
      id: "13",
      options: [
        { value: 1, label: "예", trigger: "14", message: "예" },
        { value: 2, label: "아니오", trigger: "2", message: "아니오" },
      ],
    },
    {
      id: "14",
      message: "쳇봇을 종료합니다 좋은하루되세요 😄",
      end: true,
    },
    {
      id: "15",
      message: "서비스를 선택해주세요",
      trigger: "16",
    },
    {
      id: "16",
      options: [
        { value: 1, label: "환불문의", trigger: "17", message: "환물문의" },
        { value: 2, label: "돌아가기", trigger: "2", message: "환불문의" },
      ],
    },
    {
      id: "17",
      message: "환불문의가 접수되었습니다 상담사가 곧 연락드리겠습니다",
      trigger: "18",
    },
    {
      id: "18",
      message: "다른문의가 있으신가요?",
      trigger: "19",
    },
    {
      id: "19",
      options: [
        { value: 1, label: "예", trigger: "2", message: "예" },
        { value: 2, label: "아니오", trigger: "14", message: "아니오" },
      ],
    },
    {
      id: "20",
      options: [
        {
          value: 1,
          label: "상품이안와요",
          trigger: "21",
          message: "상품이안와요",
        },
        {
          value: 2,
          label: "상품하자접수",
          trigger: "22",
          message: "상품하자접수",
        },
        { value: 3, label: "고객센터", trigger: "9", message: "고객센터" },
      ],
    },
    {
      id: "21",
      message:
        "상품도착은 결제완료후 평균 2~3일후 도착은하나 악천후나 택배업체 사정에따른 지연이 걸릴수있습니다.",
      trigger: "12",
    },
    {
      id: "22",
      message: "상뭎에 하자가 발생하셧군요 어떤 문제가있는지 입력해주세요 ^^",
      trigger: "23",
    },
    {
      id: "23",
      user: true,
      trigger: "24",
    },
    {
      id: "24",
      message:
        "문제점 <{previousValue}>가 상품발송팀으로 전달되었습니다! 빠른시일내로 연락드리겠습니다! 감사합니다!",
      trigger: "12",
    },
  ];

  const theme = {
    background: "#FAFAFA",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#6478FF",
    headerFontColor: "#333333",
    headerFontSize: "15px",
    botBubbleColor: "#6478FF",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#333333",
  };

  return (
    <>
      <Fuckdiv>
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            hideHeader={true}
            placeholder={"이곳에 질문하세요 :)"}
            recognitionEnable={true}
            hideBotAvatar={true}
          />
        </ThemeProvider>
      </Fuckdiv>
    </>
  );
}

const Fuckdiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  left: 80%;
  top: 14%;
  z-index: 1000;
`;
