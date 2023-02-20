import React from 'react';
import { useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { auth, db } from '../../apis/firebase';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import styled from 'styled-components';
import { updateDoc } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
export default function EditModal({
  setModalOpen,
  setContentInfo,
  setUserName,
  setEmail,
  updateEmail,
  updateNickname,
  currentUser,
}) {
  const navigate = useNavigate();
  const [currentInput, setCurrentInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // 닉네임 또는 이메일 링크 유효성 검사
  const [inputValidation, setInputValidation] = useState(false);
  // 저장 버튼 활성화
  const [buttonValidation, setButtonValidation] = useState(true);
  // mutation 사용 - 닉네임 수정
  const docRef = doc(db, 'users', currentUser);
  const mutation = useFirestoreDocumentMutation(docRef);
  console.log(auth.currentUser.displayName);
  // 수정 취소
  const cancelEdit = () => {
    alert('취소되었습니다.');
    setModalOpen(false);
  };
  // 수정 저장
  // setContentInfo가 true: 닉네임 수정, false: 이메일 수정
  const useSaveEdit = async (e) => {
    e.preventDefault();
    if (setContentInfo) {
      // 닉네임 수정
      updateProfile(auth.currentUser, {
        displayName: currentInput,
      }).catch((error) => {
        console.log(error.message);
      });
      updateDoc(docRef, { name: currentInput });
      //   sessionStorage.removeItem("id");
      sessionStorage.setItem('id', currentInput);
      updateNickname(currentInput);
      navigate('/my');
      alert('수정되었습니다.');
    } else {
      // 이메일 수정
      //   const emailUpdate = doc(db, "users", id);
      //   updateDoc(emailUpdate, { email: currentInput });
      mutation.mutate({ email: currentInput, userId: currentUser });
      sessionStorage.setItem('email', currentInput);
      updateEmail(currentInput);
    }
    setModalOpen(false);
  };
  // input 수정
  const checkInput = (e) => {
    const input = e.target.value;
    setCurrentInput(input);
    if (setContentInfo) {
      // 닉네임 입력
      if (input.length < 2 || input.length > 10) {
        setErrorMessage('2글자 이상, 10글자이하로 적어주세요.');
        setInputValidation(false);
      } else {
        setErrorMessage('');
        setInputValidation(true);
      }
    } else {
      // 이메일 입력
      let regex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const trueOrFalse = regex.test(input);
      if (trueOrFalse === true || input.length === 0) {
        setErrorMessage('');
        setInputValidation(true);
        // alert("수정되었습니다.");
      } else {
        setErrorMessage('이메일 형식이 아닙니다.');
        setInputValidation(false);
      }
    }
  };
  useEffect(() => {
    if (inputValidation) {
      setButtonValidation(false);
      return;
    }
    setButtonValidation(true);
  }, [inputValidation]);
  return (
    <ModalBackground>
      <ModalContainer>
        <ModalTopItems>
          {setContentInfo ? <h3>닉네임 변경</h3> : <h3>이메일 변경</h3>}
        </ModalTopItems>
        <MyInfoInput
          onChange={checkInput}
          value={currentInput}
          placeholder={setContentInfo ? setUserName : setEmail}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <ButtonContainer>
          <CancelButton onClick={cancelEdit}>취소</CancelButton>
          <SaveButton disabled={buttonValidation} onClick={useSaveEdit}>
            저장
          </SaveButton>
          {mutation.isError && <p>{mutation.error.message}</p>}
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
}
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(64, 63, 58, 0.7);
`;
const ModalContainer = styled.div`
  /* 모달창 크기 */
  width: 500px;
  height: 300px;
  /* 최상단 위치 */
  z-index: 999;
  /* 모달 배치 */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 모달창 디자인 */
  background-color: #fff;
  border-radius: 7px;
  padding: 15px 35px 10px 35px;
  box-sizing: border-box;
`;
const ModalTopItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const MyInfoInput = styled.input`
  border: none;
  border-bottom: 1px solid #c6c6c6;
  min-width: 200px;
  width: 100%;
  margin: 80px 10px 50px 0;
  outline: none;
  flex: 80%;
`;
const ErrorMessage = styled.div`
  color: red;
  margin-top: -35px;
  font-size: 12px;
`;
const ButtonContainer = styled.div`
  padding-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: right;
`;
const CancelButton = styled.button`
  background-color: rgba(233, 236, 242, 0.8);
  border: none;
  box-sizing: border-box;
  padding: 8px 15px;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
  :hover {
    background-color: rgba(243, 111, 219, 0.4);
  }
`;
const SaveButton = styled(CancelButton)`
  background-color: rgba(117, 115, 116, 0.8);
  color: #fff;
  :hover {
    background-color: rgba(171, 44, 108, 0.8);
  }
  :disabled {
    background-color: #dadada;
    color: #fff;
  }
`;
