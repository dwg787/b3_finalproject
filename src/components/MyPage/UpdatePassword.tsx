import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../apis/firebase';
import styled from 'styled-components';
import { useEffect } from 'react';

const UpdatePassword = () => {
  const initPasswordInput = {
    password: '',
    updatePassword: '',
    updatePasswordCheck: '',
  };

  const initHelperPasswordInput = {
    updatePassword: '',
    updatePasswordCheck: '',
  };

  const [check, setCheck] = useState(false);
  const [passwordInput, setPasswordInput] = useState(initPasswordInput);
  const [helperPasswordInput, setHelperPasswordInput] = useState(
    initHelperPasswordInput,
  );
  // 저장 버튼 활성화
  const [buttonValidation, setButtonValidation] = useState(true);

  const user = auth?.currentUser;
  const email = auth?.currentUser?.email;

  //////// 현재 비밀번호를 확인하는 함수 ////////
  const firstPasswordCheck = async () => {
    const credential = EmailAuthProvider.credential(
      email!,
      passwordInput.password,
    );
    await reauthenticateWithCredential(user!, credential!)
      .then(() => {
        alert('확인되었습니다.');
        setCheck(true);
      })
      .catch((error) => {
        if (error.message.includes('wrong-password')) {
          alert('비밀번호가 틀립니다!');
        }
      });
  };

  const checkHelperText = () => {
    const isUpdatePassword = helperPasswordInput.updatePassword !== '';
    const isUpdatePasswordCheck =
      helperPasswordInput.updatePasswordCheck !== '';
    return isUpdatePassword || isUpdatePasswordCheck;
  };

  //////// 비밀번호를 변경하는 함수 ////////
  const passwordCheckHandler = () => {
    if (checkHelperText()) {
      return alert('비밀번호를 확인해 주세요!');
    }
    if (
      check &&
      passwordInput.updatePassword === passwordInput.updatePasswordCheck &&
      passwordInput.updatePassword !== '' &&
      passwordInput.updatePasswordCheck !== ''
    ) {
      updatePassword(user!, passwordInput.updatePassword).then(() =>
        // setCheck(false),
        alert('변경되었습니다!'),
      );
    } else if (!check) {
      alert('현재 비밀번호로 인증해 주세요!');
    } else {
      alert('입력한 비밀번호가 다릅니다. 다시 확인 후 입력해 주세요!');
    }
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordInput({
      ...passwordInput,
      [event.target.name]: event.target.value,
    });
  };

  //////// 유효성 검사 ////////
  const validatePasswordHandler = (
    event: React.FocusEvent<HTMLInputElement>,
  ) => {
    console.log('event.target.value', event.target.value);
    var regexPw = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!regexPw.test(event.target.value)) {
      setHelperPasswordInput({
        ...helperPasswordInput,
        updatePassword:
          '비밀번호는 8자 이상이어야 하며, 숫자/소문자/특수문자를 모두 포함해야 합니다.',
      });
      console.log('event.target.value1', event.target.value);
    } else {
      setHelperPasswordInput({
        ...helperPasswordInput,
        updatePassword: initHelperPasswordInput.updatePassword,
      });
      console.log('event.target.value2', event.target.value);
    }
  };

  const validatePasswordCheckHandler = () => {
    if (passwordInput.updatePassword !== passwordInput.updatePasswordCheck) {
      setHelperPasswordInput({
        ...helperPasswordInput,
        updatePasswordCheck: '비밀번호가 다릅니다. 확인해주세요.',
      });
    } else {
      setHelperPasswordInput({
        ...helperPasswordInput,
        updatePasswordCheck: initHelperPasswordInput.updatePasswordCheck,
      });
    }
  };
  //////// 유효성 검사 ////////
  useEffect(() => {
    if (check) {
      setButtonValidation(false);
      return;
    }
    setButtonValidation(true);
  }, [check]);

  return (
    <div>
      <input
        value={passwordInput.password}
        type="password"
        name="password"
        onChange={passwordChangeHandler}
      />
      <button onClick={firstPasswordCheck}>비밀번호 확인</button>
      <input
        value={passwordInput.updatePassword}
        type="password"
        name="updatePassword"
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
      />

      <Error>
        <span>{helperPasswordInput.updatePassword}</span>
      </Error>
      <input
        value={passwordInput.updatePasswordCheck}
        type="password"
        name="updatePasswordCheck"
        onChange={passwordChangeHandler}
        onBlur={validatePasswordCheckHandler}
      />
      <Error>
        <span>{helperPasswordInput.updatePasswordCheck}</span>
      </Error>
      <button disabled={buttonValidation} onClick={passwordCheckHandler}>
        비밀번호 변경
      </button>
    </div>
  );
};

export default UpdatePassword;

const Error = styled.div`
  color: #f87038;
  font-weight: 500;
  font-size: 11.7px;
  line-height: 9.75px;
`;
