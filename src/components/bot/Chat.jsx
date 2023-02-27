import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import styled, { ThemeProvider } from 'styled-components';

export default function Chat() {
  const [test, setTest] = useState();
  console.log(test, '<<<<<<<<<<');
  console.log(test?.steps['25'].message);

  const addUserList = (newUser) => {
    return axios.post('http://localhost:3001/Suggestions', newUser);
  };

  const steps = [
    {
      id: '1',
      message: '안녕하세요 트리픽 고객센터입니다. 무었을도와드릴까요?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        {
          value: 1,
          label: '사이트이용문의',
          trigger: '3',
          message: '사이트이용문의문의',
        },
        { value: 3, label: '고객센터', trigger: '27', message: '고객센터' },
      ],
    },
    {
      id: '3',
      message: '사이트이용문의를 선택하셧는데 어떤 도움이 필요하세요?',
      trigger: '6',
    },
    {
      id: '5',
      message: '아직준비중이에요 :(',
      end: false,
    },
    {
      id: '6',
      options: [
        {
          value: 1,
          label: '버그제보',
          trigger: '7',
          message: '버그제보',
        },
        { value: 2, label: '서비스장애', trigger: '8', message: '서비스장애' },
        {
          value: 3,
          label: '건의사항',
          trigger: '9',
          message: '건의사항',
        },
      ],
    },
    {
      id: '7',
      message: '버그를 하단 텍스트 입력창에 서술해주세요',
      trigger: '15',
    },
    {
      id: '8',
      message: '어떤 문제점인지 말해주시겠어요?',
      trigger: '10',
    },
    {
      id: '9',
      message: '건의사항을 하단 텍스트 입력창에 서술해주세요',
      trigger: '25',
    },
    {
      id: '10',
      user: true,
      trigger: '11',
    },
    {
      id: '11',
      message:
        '문제점 <{previousValue}>가 서비스지원팀으로 전달되었습니다! 빠른시일내로 조치드리겠습니다! 감사합니다!',
      trigger: '12',
    },
    {
      id: '12',
      message: '다른문의는 없으신가요?',
      trigger: '13',
    },
    {
      id: '13',
      options: [
        { value: 1, label: '예', trigger: '14', message: '예' },
        { value: 2, label: '아니오', trigger: '2', message: '아니오' },
      ],
    },
    {
      id: '14',
      message: '쳇봇을 종료합니다 좋은하루되세요 😄',
      end: true,
    },
    {
      id: '15',
      user: true,
      trigger: '11',
    },
    {
      id: '16',
      options: [
        { value: 1, label: '환불문의', trigger: '17', message: '환물문의' },
        { value: 2, label: '돌아가기', trigger: '2', message: '환불문의' },
      ],
    },
    {
      id: '17',
      message: '환불문의가 접수되었습니다 상담사가 곧 연락드리겠습니다',
      trigger: '18',
    },
    {
      id: '18',
      message: '다른문의가 있으신가요?',
      trigger: '19',
    },
    {
      id: '19',
      options: [
        { value: 1, label: '예', trigger: '2', message: '예' },
        { value: 2, label: '아니오', trigger: '14', message: '아니오' },
      ],
    },
    {
      id: '25',
      user: true,
      trigger: '26',
    },
    {
      id: '26',
      component: <div>{test?.steps['25'].message}</div>,
      metadata: {
        custom: 'test',
      },
      message: '건의사항 {previousValue}가 서비스지원팀에 전달되었습니다. :)',
      trigger: '28',
    },
    {
      id: '28',
      message: (params) => setTest(params),
      trigger: '12',
    },
    {
      id: '27',
      message: '문의전화 010-8089-1884 ',
      trigger: '18',
    },
  ];

  const theme = {
    background: '#FAFAFA',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#6478FF',
    headerFontColor: '#333333',
    headerFontSize: '15px',
    botBubbleColor: '#6478FF',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#333333',
  };

  return (
    <>
      <Fuckdiv>
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            hideHeader={true}
            placeholder={'이곳에 질문하세요 :)'}
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
