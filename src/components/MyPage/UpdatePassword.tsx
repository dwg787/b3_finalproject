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

  // 버튼 색 활성화
  const [buttonColor, setButtonColor] = useState(false);
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
      setButtonColor(true);
      return;
    }
    setButtonValidation(true);
    setButtonColor(false);
  }, [check]);

  return (
    <div>
      <UpdatePwBox>
        <UpdatePwInput1
          value={passwordInput.password}
          type="password"
          name="password"
          onChange={passwordChangeHandler}
        />

        <UpdatePwLabel1>현재 비밀번호</UpdatePwLabel1>
      </UpdatePwBox>
      <UpdatePwBox>
        <UpdatePwBtn1 onClick={firstPasswordCheck}>비밀번호 확인</UpdatePwBtn1>
      </UpdatePwBox>
      <UpdatePwBox>
        <UpdatePwInput2
          value={passwordInput.updatePassword}
          type="password"
          name="updatePassword"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <UpdatePwLabel2>새 비밀번호</UpdatePwLabel2>

        <Error>
          <span>{helperPasswordInput.updatePassword}</span>
        </Error>
      </UpdatePwBox>
      <UpdatePwBox>
        <UpdatePwInput3
          value={passwordInput.updatePasswordCheck}
          type="password"
          name="updatePasswordCheck"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordCheckHandler}
        />
        <UpdatePwLabel3>새 비밀번호 확인</UpdatePwLabel3>

        <Error1>
          <span>{helperPasswordInput.updatePasswordCheck}</span>
        </Error1>
      </UpdatePwBox>
      <UpdatePwBox>
        <UpdatePwBtn2
          state={buttonColor}
          disabled={buttonValidation}
          onClick={passwordCheckHandler}
        >
          비밀번호 변경
        </UpdatePwBtn2>
      </UpdatePwBox>
    </div>
  );
};

export default UpdatePassword;

const Error = styled.div`
  position: absolute;
  top: 90px;
  left: 10px;
  color: #f87038;
  font-weight: 500;
  font-size: 10px;
  line-height: 8px;
`;

const Error1 = styled.div`
  position: absolute;
  top: 85px;
  left: 10px;
  color: #f87038;
  font-weight: 500;
  font-size: 10px;
  line-height: 8px;
  @media screen and (max-width: 390px) {
    top: 65px;
  }
`;

const UpdatePwBox = styled.div`
  position: relative;
`;

const UpdatePwInput1 = styled.input`
  width: 380px;
  height: 36px;

  font-size: 16px;
  color: #000000;
  margin-bottom: 26px;
  margin-top: 65px;
  padding: 10px;
  border: 1px solid rgba(158, 171, 255, 0.61);
  box-shadow: 2.25827px 2.25827px 5.64568px rgba(0, 0, 0, 0.18);
  border-radius: 9px;
  outline: none;
  background: transparent;
  @media screen and (max-width: 390px) {
    margin-top: 46.89px;
    margin-bottom: 20px;
    width: 340px;
    height: 35px;
  }
`;

const UpdatePwInput2 = styled.input`
  width: 380px;
  height: 36px;

  font-size: 16px;
  color: #000000;
  margin-bottom: 26px;
  margin-top: 38px;
  padding: 10px;
  border: 1px solid rgba(158, 171, 255, 0.61);
  box-shadow: 2.25827px 2.25827px 5.64568px rgba(0, 0, 0, 0.18);
  border-radius: 9px;
  outline: none;
  background: transparent;
  @media screen and (max-width: 390px) {
    width: 340px;
    height: 35px;
    margin-top: 46.89px;
    margin-bottom: 31.68px;
  }
`;

const UpdatePwInput3 = styled.input`
  width: 380px;
  height: 36px;

  font-size: 16px;
  color: #000000;
  margin-bottom: 26px;
  margin-top: 38px;
  padding: 10px;
  border: 1px solid rgba(158, 171, 255, 0.61);
  box-shadow: 2.25827px 2.25827px 5.64568px rgba(0, 0, 0, 0.18);
  border-radius: 9px;
  outline: none;
  background: transparent;
  @media screen and (max-width: 390px) {
    width: 340px;
    height: 35px;
    margin-top: 20px;
    margin-bottom: 31.68px;
  }
`;

const UpdatePwLabel1 = styled.label`
  position: absolute;
  top: 45px;
  left: 0;

  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #5a5a5a;
  pointer-events: none;
  transition: 0.5s;
  @media screen and (max-width: 390px) {
    top: 30px;
  }
`;

const UpdatePwLabel2 = styled.label`
  position: absolute;
  top: 20px;
  left: 0;

  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #5a5a5a;
  pointer-events: none;
  transition: 0.5s;
  @media screen and (max-width: 390px) {
    top: 30px;
  }
`;

const UpdatePwLabel3 = styled.label`
  position: absolute;
  top: 20px;
  left: 0;

  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #5a5a5a;
  pointer-events: none;
  transition: 0.5s;
  @media screen and (max-width: 390px) {
    top: 5px;
  }
`;
const UpdatePwBtn1 = styled.button`
  cursor: pointer;

  width: 380px;
  height: 38px;

  background: #6478ff;

  box-shadow: 2.25827px 2.25827px 5.64568px rgba(0, 0, 0, 0.18);
  border-radius: 9px;
  border: none;
  font-weight: 500;
  font-size: 15px;
  line-height: 14px;

  color: #ffffff;
  text-align: center;
  @media screen and (max-width: 390px) {
    width: 340px;
    height: 39px;
  }
`;

const UpdatePwBtn2 = styled.button<{ state: boolean }>`
  margin-top: 26px;
  cursor: pointer;

  width: 380px;
  height: 38px;

  background: #6478ff;

  box-shadow: 2.25827px 2.25827px 5.64568px rgba(0, 0, 0, 0.18);
  border-radius: 9px;
  border: none;
  font-weight: 500;
  font-size: 15px;
  line-height: 14px;

  color: #ffffff;
  text-align: center;
  background: ${(props) => (props.state ? '#6478ff;' : '#C8D1E0')};
  @media screen and (max-width: 390px) {
    width: 340px;
    height: 39px;
    margin-top: 0px;
  }
`;
