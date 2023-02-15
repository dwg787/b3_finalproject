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
    <SignUpContainer>
      <Login>
        <h2>Login</h2>
      </Login>

      <form>
        <LoginBox>
          <LoginInput className="user-box" type="text" />
          <LoginLabel>이메일</LoginLabel>
        </LoginBox>
        <LoginBox>
          <LoginInput type="text" />
          <LoginLabel>닉네임</LoginLabel>
        </LoginBox>
        <LoginBox>
          <LoginInput type="password" />
          <LoginLabel>비밀번호</LoginLabel>
        </LoginBox>
        <LoginBox>
          <LoginInput type="password" />
          <LoginLabel>비밀번호확인</LoginLabel>
        </LoginBox>
        <LoginBox>
          <LoginInput type="text" />
          <LoginLabel>주소</LoginLabel>
        </LoginBox>
        <LoginBox>
          <LoginInput type="text" />
          <LoginLabel>휴대폰</LoginLabel>
        </LoginBox>
        <SignUpBtn>회원가입</SignUpBtn>
      </form>
    </SignUpContainer>
  );
};
export default SignUpPage;

// const Error = styled.div`
//   font-size: 12px;
//   padding: 5px;
//   .message {
//     &.error {
//       color: red;
//     }
//   }
// `;

// const Id = styled.div`
//   display: flex;
//   align-items: center;
//   width: 300px;
// `;

// const Name = styled.div`
//   display: flex;
//   align-items: center;
//   width: 300px;
// `;

// const Password = styled.div`
//   display: flex;
//   align-items: center;
//   width: 300px;
//   padding-right: 5px;
// `;

// const PasswordCheck = styled.div`
//   display: flex;
//   align-items: center;
//   width: 300px;
//   padding-right: 30px;
// `;

const SignUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  padding: 40px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 40px;
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
  width: 70%;
  background-color: #e5e9ef;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  color: #343436;
  font-size: 16px;
  font-weight: 600;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  :hover {
    background: #03e9f4;
    color: #fff;
    box-shadow: 0 0 5px #27bdc5, 0 0 25px #2ac5cd, 0 0 50px #49c0c6,
      0 0 100px #29b3bb;
  }
`;

// const Label = styled.div`
//   display: flex;
// `;

// const PasswordCheckLabel = styled.div`
//   white-space: nowrap;
//   /* font-size: 10px; */
// `;

// const Input = styled.input`
//   border: none;
//   border-bottom: 1px solid #ccc;
//   color: #555;
//   box-sizing: border-box;
//   font-size: 18px;
//   :focus-visible {
//     outline: none;
//   }
//   margin-top: 3px;
//   padding-left: 5px;
// `;

// const BlueButton = styled.button`
//   align-items: center;
//   background-color: #555555;
//   border-radius: 5px;
//   width: 250px;
//   height: 40px;
//   color: #ffff;
//   font-size: 15px;
//   cursor: pointer;
// `;
