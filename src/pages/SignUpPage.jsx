import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../apis/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import '../App.css';

const SignUpPage = () => {
  const navigate = useNavigate();

  // 초기값 세팅 - 이메일, 닉네임, 비밀번호, 비밀번호 확인
  const [id, setId] = useState('');
  const [nickName, setNickName] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  // 에러 메시지
  const [idErrMsg, setIdErrMsg] = useState('');
  const [nickNameErrMsg, setNickNameErrMsg] = useState('');
  const [pwErrMsg, setPwErrMsg] = useState('');
  const [pwConfirmErrMsg, setPwConfirmErrMsg] = useState('');

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwConfirm, setIsPwConfirm] = useState(false);
  const [isNickName, setIsNickName] = useState(false);

  // 에러 나면 그곳에 커서 이동되도록
  const idRef = useRef(null);
  const nickNameRef = useRef(null);
  const pwRef = useRef(null);
  const pwConfirmRef = useRef(null);

  // 회원가입 완료

  const signup = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, id, pw).then((data) => {
      if (auth.currentUser)
        updateProfile(auth?.currentUser, {
          displayName: nickName,
        })
          .then(() => {
            alert('회원가입이 완료되었습니다');
            console.log('data', data);
            setId('');
            setNickName('');
            setPw('');
            localStorage.setItem('id', nickName);
            localStorage.setItem('email', data.user.email);
            addDoc(collection(db, 'users'), {
              email: data.user.email,
              name: data.user.displayName,
            });
            navigate('/');
          })
          .catch((error) => {
            console.log(error.message);
            alert('회원가입을 다시 진행해주세요.');
            navigate('/signup');
          });
    });
  };

  // useEffect(() => {
  //   setValue(sessionStorage.getItem("email"));
  // });

  //* id (이메일)
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!idRegex.test(currentId)) {
      setIdErrMsg(' 잘못된 이메일 주소입니다.');
      setIsId(false);
    } else {
      setIdErrMsg('');
      setIsId(true);
    }
  };

  //* 닉네임
  const onChangeNickName = (e) => {
    const currentNickName = e.target.value;
    setNickName(currentNickName);

    if (currentNickName.length < 2 || currentNickName.length > 10) {
      setNickNameErrMsg(' 2글자 이상, 10글자 미만으로만 사용할 수 있습니다.');
      setIsNickName(false);
    } else {
      setNickNameErrMsg('');
      setIsNickName(true);
    }
  };

  //* 비밀번호
  const onChangePw = (e) => {
    const currentPw = e.target.value;
    setPw(currentPw);
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!pwRegex.test(currentPw)) {
      setPwErrMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.');
      setIsPwConfirm(false);
    } else {
      setPwErrMsg('');
    }
  };

  //* 비밀번호 확인
  const onChangePwConfirm = (e) => {
    const currentPwConfirm = e.target.value;
    setPwConfirm(currentPwConfirm);
    if (pw === currentPwConfirm) {
      setPwConfirmErrMsg('');
      setIsPwConfirm(true);
    } else {
      setPwConfirmErrMsg('비밀번호가 일치하지 않습니다.');
      setIsPwConfirm(false);
    }
  };

  return (
    <TestDiv>
      <SignUpContainer>
        <Login>
          <h2>Sign Up</h2>
        </Login>

        <form onSubmit={signup}>
          <LoginBox>
            <LoginInput
              onChange={onChangeId}
              value={id}
              ref={idRef}
              className="user-box"
              type="text"
            />
            <LoginLabel>이메일</LoginLabel>
            <Error>
              {id.length > 0 && (
                <span className={`message ${isId ? 'success' : 'error'}`}>
                  {idErrMsg}
                </span>
              )}
            </Error>
          </LoginBox>

          <LoginBox>
            <LoginInput
              onChange={onChangeNickName}
              value={nickName}
              maxLength={10}
              ref={nickNameRef}
              type="text"
            />
            <LoginLabel>닉네임</LoginLabel>
            <Error>
              <span className={`message ${isNickName ? 'success' : 'error'}`}>
                {nickNameErrMsg}
              </span>
            </Error>
          </LoginBox>
          <LoginBox>
            <LoginInput
              onChange={onChangePw}
              value={pw}
              ref={pwRef}
              type="password"
            />
            <LoginLabel>비밀번호</LoginLabel>
            <Error>
              <span className={`message ${isPw ? 'success' : 'error'}`}>
                {pwErrMsg}
              </span>
            </Error>
          </LoginBox>
          <LoginBox>
            <LoginInput
              type="password"
              ref={pwConfirmRef}
              value={pwConfirm}
              onChange={onChangePwConfirm}
            />
            <LoginLabel>비밀번호확인</LoginLabel>
            <Error>
              <span className={`message ${isPwConfirm ? 'success' : 'error'}`}>
                {pwConfirmErrMsg}
              </span>
            </Error>
          </LoginBox>
          <LoginBox>
            <LoginInput type="text" />
            <LoginLabel>주소</LoginLabel>
          </LoginBox>
          <LoginBox>
            <LoginInput type="text" />
            <LoginLabel>휴대폰</LoginLabel>
          </LoginBox>

          <SignUpBtn data-text="회원가입">회원가입</SignUpBtn>
        </form>
      </SignUpContainer>
    </TestDiv>
  );
};
export default SignUpPage;

const Error = styled.div`
  position: absolute;
  top: 40px;
  font-size: 12px;
  padding: 5px;

  .message {
    &.error {
      color: red;
    }
  }
`;

const TestDiv = styled.div`
  width: 100%;
  height: 900px;
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  padding: 40px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  background: rgba(40, 45, 73, 0.5);
  border-radius: 10px;
`;

const Login = styled.div`
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
`;

const LoginBox = styled.div`
  position: relative;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
  :focus ~ label,
  :valid ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }
`;

const LoginLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
`;

const SignUpBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  margin-top: 40px;
  cursor: pointer;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: #ccc;
  :before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: #4bb5cf;
    color: #fff;
    transition: 0.5s;
    transform-origin: bottom;
    transform: translatey(-100%) rotatex(90deg);
  }
  :hover:before {
    transform: translatey(0) rotatex(0deg);
  }
  :after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: #4bb5cf;
    color: #fff;
    transition: 0.5s;
    transform-origin: top;
    transform: translatey(0) rotatex(0deg);
  }
  :hover:after {
    transform: translatey(100%) rotatex(90deg);
  }
`;
