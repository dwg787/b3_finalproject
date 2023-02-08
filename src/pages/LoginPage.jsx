import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../apis/firebase.ts';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const logIn = async () => {
    const login = await signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    );
    alert('login 성공!');
    console.log(login);
    console.log('이메일', emailRef.current.value);
    console.log('비번', passwordRef.current.value);
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>로그인 페이지</div>
      <div>
        <input
          ref={emailRef}
          type='text'
          placeholder='이메일을 입력해주세요.'
        />
      </div>
      <div>
        <input
          ref={passwordRef}
          type='password'
          placeholder='비밀번호를 입력해주세요'
        />
      </div>
      <button onClick={logIn} type='submit'>
        login
      </button>
    </div>
  );
};

export default LoginPage;
