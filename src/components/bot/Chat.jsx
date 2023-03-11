import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import styled, { ThemeProvider } from 'styled-components';
import { db } from '../../apis/firebase';

export default function Chat({ setModal }) {
  const [suggestions, setSuggestions] = useState();
  const [bug, setBug] = useState();
  const [serviceError, setServiceError] = useState();
  const addSuggestions = async (message) => {
    // const userSuggestions = {
    //   suggestionsMessage: `${message}`,
    //   userId: localStorage.getItem('id'),
    // };
    // console.log(userSuggestions, '<<<<<<<<<<123');      // db.json 에 올릴때로직
    // return await axios.post(
    //   'http://localhost:3001/Suggestions',
    //   userSuggestions,
    // );
    return await addDoc(collection(db, 'userSuggestions'), {
      suggestionsMessage: `${message}`,
      userId: localStorage.getItem('uid'),
      userName: localStorage.getItem('id'),
    });
  };
  const addBug = async (bugmessage) => {
    // const userBug = {
    //   bugMessage: `${bugmessage}`,
    //   userId: localStorage.getItem('id'),                //// db.json 에 올릴때로직
    // };
    // return await axios.post('http://localhost:3001/Bug', userBug);
    return await addDoc(collection(db, 'userBug'), {
      bugMessage: `${bugmessage}`,
      userId: localStorage.getItem('uid'),
      userName: localStorage.getItem('id'),
    });
  };
  const addServiceError = async (serviceMessage) => {
    // const userServiceError = {
    //   serviceErrorMessage: `${serviceMessage}`,
    //   userId: localStorage.getItem('id'),                  ///// db.json 에 올릴때로직
    // };
    // return await axios.post(
    //   'http://localhost:3001/ServiceError',
    //   userServiceError,
    // );
    return await addDoc(collection(db, 'userService'), {
      serveiceMessage: `${serviceMessage}`,
      userId: localStorage.getItem('uid'),
      userName: localStorage.getItem('id'),
    });
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
      trigger: '29',
    },
    {
      id: '8',
      message: '어떤 문제점인지 말해주시겠어요?',
      trigger: '32',
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
      component: <div>{suggestions?.steps['25'].message}</div>,
      metadata: {
        custom: 'suggestions',
      },
      message: '건의사항 {previousValue}이가 서비스지원팀으로 전달되었습니다:)',
      trigger: '28',
    },
    {
      id: '28',
      message: (params) => {
        console.log(params);
        addSuggestions(params.steps['25'].message);
        setSuggestions(params);
      },
      trigger: '12',
    },
    {
      id: '29',
      user: true,
      trigger: '30',
    },
    {
      id: '30',
      component: <div>{suggestions?.steps['25'].message}</div>,
      metadata: {
        custom: 'suggestions',
      },
      message:
        '버그문의 <{previousValue}>이가 서비스지원팀으로 전달되었습니다:)',
      trigger: '31',
    },
    {
      id: '31',
      message: (params) => {
        console.log(params);
        addBug(params.steps['29'].message);
        setBug(params);
      },
      trigger: '12',
    },
    {
      id: '32',
      user: true,
      trigger: '33',
    },
    {
      id: '33',
      component: <div>{suggestions?.steps['25'].message}</div>,
      metadata: {
        custom: 'suggestions',
      },
      message:
        '서비스에러 <{previousValue}>이가 서비스지원팀으로 전달되었습니다:)',
      trigger: '34',
    },
    {
      id: '34',
      message: (params) => {
        console.log(params);
        addServiceError(params.steps['32'].message);
        setServiceError(params);
      },
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
      <ModalBackground
        onClick={() => {
          setModal(false);
        }}
      ></ModalBackground>
      <Modaldiv>
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            hideHeader={true}
            placeholder={'이곳에 질문하세요 :)'}
            recognitionEnable={true}
            hideBotAvatar={true}
          />
        </ThemeProvider>
      </Modaldiv>
      {/* <button onClick={addUserList}>하이</button> */}
    </>
  );
}

const Modaldiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  left: 80%;
  top: 13%;
  z-index: 1000;
  @media screen and (max-width: 820px) {
    left: 10%;
    top: 13%;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(48, 48, 48, 0.472);
  z-index: 3;
`;
