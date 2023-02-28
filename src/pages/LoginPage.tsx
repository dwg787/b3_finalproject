import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../apis/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import KakaoLoginButton from '../components/Login/KakaoLoginButton';
import Naver from '../components/Login/Naver';
import styled from 'styled-components';
import Google from '../assets/google.avif';
import useNotification from '../hooks/useNotification';

interface LoginPageProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [idValid, setIdValid] = useState<boolean>(false);
  const [pwValid, setPwValid] = useState<boolean>(false);
  const [pwErrMsg, setPwErrMsg] = useState<string>('');

  const [alarmMsg, setAlarmMsg] = useState<string>(''); // 알람관련코드2 - 어떤 메시지 띄울지 내용 넣는 state
  const { addNoti } = useNotification(alarmMsg); // 알람관련코드3 - 찜하기 버튼 클릭할 때 알람메시지 커스텀 훅 내에 addNoti 실행
  const goSignUp = () => {
    navigate('/signup');
    setShowModal(false);
  };

  // id(이메일) 유효성 검사
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (idRegex.test(currentId)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  // 비밀번호 유효성 검사
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPw = e.target.value;
    setPw(currentPw);
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!pwRegex.test(currentPw)) {
      setPwErrMsg('비밀번호를 다시 확인해주세요');
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  // 일반 로그인
  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      emailRef.current!.value,
      passwordRef.current!.value,
    )
      .then((data) => {
        alert('login 성공!');
        console.log(data);
        console.log(auth);
        console.log('이메일', emailRef.current!.value);
        console.log('비번', passwordRef.current!.value);
        localStorage.setItem('id', data.user.displayName!);
        localStorage.setItem('email', data.user.email!);
        sessionStorage.setItem('uid', data.user.uid);
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('errorMessage', errorMessage);
        setError(errorMessage);
        alert('이메일과 비밀번호를 확인해주세요!');
      });
  };

  // 구글 로그인
  const handleclick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email!);
      localStorage.setItem('id', data.user.displayName!);
      navigate('/');
    });
  };

  return (
    <MainWrap>
      <LoginText>로그인</LoginText>
      <LoginContent>
        간편하게 로그인하고 꿈꾸던 여행을 계획해보세요
      </LoginContent>
      <form onSubmit={logIn}>
        <InputWrap>
          <EmailInput
            ref={emailRef}
            type="text"
            placeholder="Email"
            onChange={onChangeId}
          />
          <Error>
            {!idValid && id.length > 0 && <div>이메일을 확인해주세요.</div>}
          </Error>
          <PwInput
            ref={passwordRef}
            type="password"
            placeholder="Password"
            onChange={onChangePw}
          />
        </InputWrap>
        <LoginBtn>로그인</LoginBtn>
        <GoSignUp
          onClick={() => {
            setAlarmMsg('로그인 성공!.'); //알람관련 코드4 - 들어갈 내용 정하는 부분
            addNoti(); //알람관련 코드5 - useNotification 커스텀 훅 내의 addNoti 함수 실행
            goSignUp();
          }}
        >
          아직 계정을 만들지 않았나요?
        </GoSignUp>
      </form>

      <TextDiv>다른 로그인 방식</TextDiv>

      <Otherlogins>
        <KakaoLoginButton />
        <GoogleBtn onClick={handleclick}>
          <GoogleImg src={Google} />
          <GoogleText>Google</GoogleText>
        </GoogleBtn>
        {/* <KakaoLogoutButton /> */}
        <Naver />
      </Otherlogins>
      <FooterText>
        회원가입 시 이용약관 정책에 동의한 것으로 간주합니다.
      </FooterText>
    </MainWrap>
  );
};

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
`;

const LoginText = styled.div`
  font-size: 27.62px;
  color: #6478ff;
  font-style: normal;
  font-weight: 700;
  font-size: 27.6248px;
`;

const LoginContent = styled.div`
  margin: 20px 0 25px 0;
  color: #6d6d6d;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled.input`
  width: 364.9px;
  height: 55.12px;
  border: 0.878971px solid #8a8a8a;
  border-radius: 12.5567px;
  padding: 15px;
  margin-bottom: -8px;
  &::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 16.4874px;
  }
`;

const PwInput = styled.input`
  width: 364.9px;
  height: 55.12px;
  border: 0.878971px solid #8a8a8a;
  border-radius: 12.5567px;
  padding: 15px;
  margin-bottom: 17px;
  &::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 16.4874px;
  }
`;

const LoginBtn = styled.button`
  background: #6478ff;
  border-radius: 12.5567px;
  color: #ffff;
  width: 364.9px;
  height: 55.12px;
  font-size: 19px;
  border: none;
  margin-bottom: 30px;
  cursor: pointer;
`;

const GoSignUp = styled.div`
  cursor: pointer;
  margin-bottom: 15px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.35px;
  text-decoration-line: underline;
  color: #9a9a9a;
`;

const GoogleBtn = styled.button`
  background-color: transparent;
  border: none;
`;

const GoogleImg = styled.img`
  width: 41px;
  height: 41px;
  cursor: pointer;
`;

const GoogleText = styled.div`
  color: #8a8a8a;
  font-size: 12px;
`;

const TextDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 25px;
  width: 80%;
  margin-left: 50px;
  color: #8a8a8a;
  font-size: 15.13px;
  display: flex;
  align-items: center;
  height: 18px;
  ::before {
    content: '';
    flex-grow: 1;
    margin: 0px 30px;
    background: #8a8a8a;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  ::after {
    content: '';
    flex-grow: 1;
    margin: 0px 30px;
    background: #8a8a8a;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
`;

const Otherlogins = styled.div`
  display: flex;
  margin: 0 100px 0 100px;
`;

const FooterText = styled.div`
  display: flex;
  justify-content: center;
  color: #9a9a9a;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 30px;
  margin-bottom: 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.479859px;
  text-decoration-line: underline;
  color: #9a9a9a;
`;

const Error = styled.div`
  color: red;
  font-size: 13px;
  margin-bottom: 15px;
  margin-top: 10px;
`;

export default LoginPage;