import React from 'react';
import { useEffect, useState } from 'react';
import UpdatePassword from './UpdatePassword';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../../apis/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function MyInfo() {
  const navigate = useNavigate();
  // 닉네임 수정
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // 현재 유저
  const [currentUser, setCurrentUser] = useState('');
  // 닉네임  유효성 검사
  const [inputValidation, setInputValidation] = useState(false);
  // 저장 버튼 활성화
  const [buttonValidation, setButtonValidation] = useState(true);

  // 닉네임 입력
  const updateNickname = (item) => {
    setUserName(item);
  };

  // 수정 저장

  const useSaveEdit = async () => {
    // 닉네임 수정
    updateProfile(auth.currentUser, {
      displayName: currentInput,
    }).catch((error) => {
      console.log(error.message);
    });

    localStorage.setItem('id', currentInput);

    updateNickname(currentInput);
    navigate('/my');
    alert('수정되었습니다.');
  };

  // input 수정
  const checkInput = (e) => {
    const input = e.target.value;
    setCurrentInput(input);
    // 닉네임 입력
    if (input.length < 2 || input.length > 10) {
      setErrorMessage('2글자 이상, 10글자이하로 적어주세요.');
      setInputValidation(false);
    } else {
      setErrorMessage('');
      setInputValidation(true);
    }
  };

  // 유저 정보 가져오기
  // const getUserInfo = async () => {
  //   const docRef = doc(db, 'users', currentUser);
  //   await getDoc(docRef);
  // };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(auth.currentUser.uid);
        setUserName(auth.currentUser.displayName);
        setEmail(auth.currentUser.email);
        // getUserInfo();

        console.log('로그인 되어있음');
      } else if (!user) {
        console.log('로그인 안됨');
      }
    });
    if (!currentUser) return;
  }, []);

  useEffect(() => {
    if (inputValidation) {
      setButtonValidation(false);
      return;
    }
    setButtonValidation(true);
  }, [inputValidation]);

  return (
    <>
      <div>이메일</div>
      <input placeholder={email} readOnly></input>
      <div>
        <div>닉네임</div>
        <input
          onChange={checkInput}
          value={currentInput}
          placeholder={userName}
        />
        <Error>{errorMessage}</Error>
        <button disabled={buttonValidation} onClick={useSaveEdit}>
          닉네임 변경
        </button>
      </div>
      <UpdatePassword />
    </>
  );
}

const Error = styled.div`
  color: #f87038;
  font-weight: 500;
  font-size: 11.7px;
  line-height: 9.75px;
`;
