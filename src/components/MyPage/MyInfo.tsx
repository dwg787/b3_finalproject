import { useEffect, useState } from 'react';
import UpdatePassword from './UpdatePassword';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../../apis/firebase';
import { deleteUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function MyInfo(): JSX.Element {
  const navigate = useNavigate();

  // 닉네임 수정
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentInput, setCurrentInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  // 현재 유저
  const [currentUser, setCurrentUser] = useState<string>('');
  // 닉네임 유효성 검사
  const [inputValidation, setInputValidation] = useState<boolean>(false);
  // 저장 버튼 활성화
  const [buttonValidation, setButtonValidation] = useState<boolean>(true);
  // 버튼 색 활성화
  const [buttonColor, setButtonColor] = useState<boolean>(false);

  // 닉네임 입력
  const updateNickname = (item: string) => {
    setUserName(item);
  };

  // 수정 저장

  const useSaveEdit = async () => {
    // 닉네임 수정
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, {
        displayName: currentInput,
      });
      localStorage.setItem('id', currentInput);
      updateNickname(currentInput);
      alert('수정되었습니다.');
      navigate('/my', { replace: true });
    } catch (error) {}
  };

  // input 수정
  const checkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCurrentInput(input);
    // 닉네임 입력
    if (input.length < 2 || input.length > 6) {
      setErrorMessage('2글자 이상, 6글자이하로 적어주세요.');
      setInputValidation(false);
    } else {
      setErrorMessage('');
      setInputValidation(true);
    }
  };
  // 회원탈퇴
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('정말 탈퇴하시겠습니까?');
    if (confirmDelete) {
      console.log('회원탈퇴 완료');
      if (auth.currentUser) {
        await deleteUser(auth.currentUser)
          .then(() => alert('성공적으로 탈퇴하였습니다!'))
          .catch((error) => console.log(error));
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        navigate('/', { replace: true });
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(auth.currentUser!.uid);
        setUserName(auth.currentUser!.displayName ?? '');
        setEmail(auth.currentUser!.email ?? '');

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
      setButtonColor(true);
      return;
    }
    setButtonValidation(true);
    setButtonColor(false);
  }, [inputValidation]);

  return (
    <MyInfoContainer>
      <Privacy>
        <h2>개인정보 수정</h2>
      </Privacy>
      <PrivacyDiv>
        <PrivacyBox>
          <PrivacyInput1 placeholder={email} readOnly />
          <PrivacyLabel1>이메일</PrivacyLabel1>
        </PrivacyBox>
        <PrivacyBox>
          <PrivacyInput2
            onChange={checkInput}
            value={currentInput}
            placeholder={userName}
          />
          <PrivacyLabel2>닉네임</PrivacyLabel2>
          <Error>{errorMessage}</Error>
        </PrivacyBox>
        <PrivacyBox>
          <SignUpBtn
            state={buttonColor}
            disabled={buttonValidation}
            onClick={useSaveEdit}
          >
            닉네임 변경
          </SignUpBtn>
        </PrivacyBox>
        <UpdatePassword />
        <SignUpDeleteBtn onClick={handleDeleteAccount}>
          회원탈퇴
        </SignUpDeleteBtn>
      </PrivacyDiv>
    </MyInfoContainer>
  );
}

const Error = styled.div`
  position: absolute;
  top: 75px;
  left: 10px;
  color: #f87038;
  font-weight: 500;
  font-size: 11px;
  line-height: 9.75px;
`;

const MyInfoContainer = styled.div`
  height: 1000px;

  margin: auto;

  padding: 40px;

  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(158, 171, 255, 0.61);
  background: rgb(255, 255, 255);
  border-radius: 10px;
`;

const Privacy = styled.div`
  margin: 0 0 30px;
  padding: 0;
  font-weight: 700;
  font-size: 21.07px;
  line-height: 19.7px;
  color: rgba(77, 77, 77, 1);
  text-align: center;
`;

const PrivacyDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PrivacyBox = styled.div`
  position: relative;
`;

const PrivacyInput1 = styled.input`
  width: 419.9px;
  height: 44.85px;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;
  margin-bottom: 30px;
  margin-top: 40px;
  padding: 20px;
  border: 1.5px solid rgba(158, 171, 255, 0.61);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
  border-radius: 17px;
  outline: none;
  background: transparent;
  ::placeholder {
    color: #595858;
    font-weight: 500;
    font-size: 14.1304px;
    line-height: 13.65px;
  }
`;

const PrivacyInput2 = styled.input`
  width: 419.9px;
  height: 44.85px;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 20px;
  border: 1.5px solid rgba(158, 171, 255, 0.61);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
  border-radius: 17px;
  outline: none;
  background: transparent;
  ::placeholder {
    color: #595858;
    font-weight: 500;
    font-size: 14.1304px;
    line-height: 13.65px;
  }
`;

const PrivacyLabel1 = styled.label`
  position: absolute;
  top: 10px;
  left: 0;
  padding: 10px 0;
  font-weight: 500;
  font-size: 13.678px;
  line-height: 13.65px;
  color: #5a5a5a;
  pointer-events: none;
  transition: 0.5s;
`;

const PrivacyLabel2 = styled.label`
  position: absolute;
  top: -10px;
  left: 0;
  padding: 10px 0;
  font-weight: 500;
  font-size: 13.678px;
  line-height: 13.65px;
  color: #5a5a5a;
  pointer-events: none;
  transition: 0.5s;
`;

const SignUpBtn = styled.button<{ state: boolean }>`
  margin-top: 20px;
  cursor: pointer;

  width: 419.9px;
  height: 44.85px;

  background: #6478ff;
  border: 1px solid #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
  border-radius: 17px;
  border: none;
  font-weight: 500;
  font-size: 17.3651px;
  line-height: 16.25px;

  color: #ffffff;
  text-align: center;
  background: ${(props) => (props.state ? '#6478ff;' : '#C8D1E0')};
`;

const SignUpDeleteBtn = styled.button`
  margin-top: 20px;
  cursor: pointer;

  width: 419.9px;
  height: 44.85px;

  background: #f35f5f;
  border: 1px solid #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
  border-radius: 17px;
  border: none;
  font-weight: 500;
  font-size: 17.3651px;
  line-height: 16.25px;
  color: #ffffff;
  text-align: center;
`;