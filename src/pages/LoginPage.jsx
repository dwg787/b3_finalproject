import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../apis/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import KakaoLoginButton from '../components/Login/KakaoLoginButton';
import KakaoLogoutButton from '../components/Login/KakaoLogoutButton';
import Naver from '../components/Login/Naver';
import styled from 'styled-components';
import Google from '../assets/google.png';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../apis/firebase';

const LoginPage = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwErrMsg, setPwErrMsg] = useState('');

  const goSignUp = () => {
    navigate('/signup');
    setShowModal(false);
  };

  // id(이메일) 유효성 검사
  const onChangeId = (e) => {
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
  const onChangePw = (e) => {
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
  const logIn = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value,
    )
      .then((data) => {
        alert('login 성공!');
        console.log(data);
        console.log(auth);
        console.log('이메일', emailRef.current.value);
        console.log('비번', passwordRef.current.value);
        localStorage.setItem('id', data.user.displayName);
        localStorage.setItem('email', data.user.email);
        const user_doc = addDoc(collection(db, 'users'), {
          email: emailRef.current.value,
          name: data.user.displayName,
        });

        console.log(user_doc.id);

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
      setValue(data.user.email);
      localStorage.setItem('id', data.user.displayName);
      // console.log("data", data);
      navigate('/');
    });
  };

  // useEffect(() => {
  //   setValue(sessionStorage.getItem("email"));
  // });

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
        <GoSignUp onClick={goSignUp}>아직 계정을 만들지 않았나요?</GoSignUp>
      </form>

      <TextDiv>다른 로그인 방식</TextDiv>

      <Otherlogins>
        {/* style={{ display: 'flex', gap: '40px' }} */}
        <KakaoLoginButton />
        <GoogleBtn onClick={handleclick}>
          <GoogleImg src={Google} />
          <GoogleText>Google</GoogleText>
        </GoogleBtn>
        {/* <KakaoLogoutButton /> */}
        <Naver />
      </Otherlogins>
      <FooterText>
        {/* 로그인 또는 회원가입 시 이용약관 및 개인정보 정책에<br></br>
        동의한 것으로 간주합니다. */}
        아이디/비밀번호를 잊어버렸나요?
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
  font-weight: bold;
`;

const LoginContent = styled.div`
  /* margin-top: 20px;
  margin-bottom: 25px; */
  margin: 20px 0 25px 0;

  color: #6d6d6d;
  font-weight: 600;
  font-size: 16px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled.input`
  width: 365px;
  height: 56px;
  border-radius: 10px;
  border: 1px solid #8a8a8a;
  padding: 15px;
  margin-bottom: -8px;
  &::placeholder {
    font-size: 18.7px;
    color: #b8b8b8;
  }
`;

const PwInput = styled.input`
  width: 365px;
  height: 56px;
  border-radius: 10px;
  border: 1px solid #8a8a8a;
  padding: 15px;
  margin-bottom: 17px;
  &::placeholder {
    font-size: 18.7px;
    color: #b8b8b8;
  }
`;

const LoginBtn = styled.button`
  background-color: #6478ff;
  color: #ffff;
  width: 365px;
  height: 55px;
  font-size: 19px;
  border-radius: 10px;
  border: none;
  margin-bottom: 30px;
  cursor: pointer;
`;

const GoSignUp = styled.div`
  font-size: 14px;
  color: #9a9a9a;
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 25px;
  /* border-bottom: 1px solid #9a9a9a; */
  /* width: 166px; */
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

  //
  display: flex;
  flex-basis: 100%;
  align-items: center;

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
  /* width: 500px; */
  /* gap: 10px; */
`;

const FooterText = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  color: #9a9a9a;
  font-size: 14px;
  text-decoration: underline;
`;

const Error = styled.div`
  color: red;
  font-size: 13px;
  margin-bottom: 15px;
  margin-top: 10px;
`;

export default LoginPage;
