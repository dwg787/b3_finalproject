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

  //약관동의 로직
  const [checkList, setCheckList] = useState([]);
  const [buttonColor, setButtonColor] = useState(false);
  const [checkBoxActive, setCheckBoxActive] = useState(false);
  const isCheckBoxClicked = () => {
    setCheckBoxActive(!checkBoxActive);
  };

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
            setPwConfirm('');
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
  //약관동의 만드는법
  const checkAll = (e) => {
    e.target.checked
      ? setCheckList(['terms', 'collect', 'another'])
      : setCheckList([]);
  };

  const check = (e) => {
    e.target.checked
      ? setCheckList([...checkList, e.target.name])
      : setCheckList(checkList.filter((choice) => choice !== e.target.name));
  };

  // const handleButtomValid = () => {
  //   if (!isCheckBoxClicked()) {
  //     alert('약관에 동의해 주세요!');
  //   }
  // };

  useEffect(() => {
    if (
      checkList.includes('terms') &&
      checkList.includes('collect') &&
      checkList.includes('another')
    ) {
      setButtonColor(true);
    } else {
      setButtonColor(false);
    }
  }, [checkList]);

  return (
    <SIgnWrap>
      <Reservation>회원가입</Reservation>
      <ReservationBottom></ReservationBottom>
      <TestDiv>
        <SignUpContainer>
          <Login>
            <h2>회원 정보 입력</h2>
          </Login>

          <SignForm onSubmit={signup}>
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
                <span
                  className={`message ${isPwConfirm ? 'success' : 'error'}`}
                >
                  {pwConfirmErrMsg}
                </span>
              </Error>
            </LoginBox>
            <LoginBox>
              <LoginInput type="text" />
              <LoginLabel>주소</LoginLabel>
            </LoginBox>
            <LoginLabelBottom></LoginLabelBottom>
            {/* <LoginBox>
              <LoginInput required="" type="text" />
              <LoginLabel>휴대폰</LoginLabel>
            </LoginBox> */}
            <PersonInfo>개인정보 처리방침</PersonInfo>
            <CheckBoxBolder>
              <CheckBoxWrap>
                <CheckBoxInput
                  onClick={isCheckBoxClicked}
                  type="checkbox"
                  name="all"
                  onChange={checkAll}
                  checked={checkList.length === 3 ? true : false}
                ></CheckBoxInput>
                <CheckBoxTextBold>
                  본인은 아래의 모든 개인정보 처리방침에 모두 동의합니다.
                </CheckBoxTextBold>
              </CheckBoxWrap>
              <CheckBoxWrap>
                <CheckBoxInput
                  onClick={isCheckBoxClicked}
                  type="checkbox"
                  name="terms"
                  onChange={check}
                  checked={checkList.includes('terms') ? true : false}
                ></CheckBoxInput>
                <CheckBoxText>
                  본인은 본 서비스 약관에 동의하며 18세 이상임을 확인합니다.
                  (필수)
                </CheckBoxText>
              </CheckBoxWrap>
              <CheckBoxWrap>
                <CheckBoxInput
                  onClick={isCheckBoxClicked}
                  type="checkbox"
                  name="collect"
                  onChange={check}
                  checked={checkList.includes('collect') ? true : false}
                ></CheckBoxInput>
                <CheckBoxText>
                  본인은 개인정보 처리방침에 따라 본인의 개인 정보를 사용하는
                  것에 동의합니다. (필수)
                </CheckBoxText>
              </CheckBoxWrap>
              <CheckBoxWrap>
                <CheckBoxInput
                  onClick={isCheckBoxClicked}
                  type="checkbox"
                  name="another"
                  onChange={check}
                  checked={checkList.includes('another') ? true : false}
                ></CheckBoxInput>
                <CheckBoxText>
                  본인은 개인정보 처리방침에 따라 대한민국 또는 해외에 있는 제
                  3자에 본인의 개인정보
                </CheckBoxText>
                <CheckBoxText>를 제공하는 것에 동의합니다. (필수)</CheckBoxText>
              </CheckBoxWrap>
            </CheckBoxBolder>
            {/* <div>
              <input
                onClick={isCheckBoxClicked}
                type="checkbox"
                name="entrust"
                onChange={check}
                checked={checkList.includes('entrust') ? true : false}
              ></input>
              <div>개인정보 처리 위착 동의 (필수)</div>
              <div>내용보기</div>
            </div>
            <div>
              <input
                onClick={isCheckBoxClicked}
                type="checkbox"
                name="marketing"
                onChange={check}
                checked={checkList.includes('marketing') ? true : false}
              ></input>
              <div>개인정보 수집 및 이용 동의 (선택)</div>
              <div>내용보기</div>
            </div> */}

            <SignUpBtn state={buttonColor} data-text="회원가입">
              회원가입
            </SignUpBtn>
          </SignForm>
        </SignUpContainer>
      </TestDiv>
    </SIgnWrap>
  );
};
export default SignUpPage;

const Error = styled.div`
  position: absolute;
  top: 120px;
  font-size: 12px;
  padding: 5px;

  .message {
    &.error {
      color: #f87038;
      font-weight: 500;
      font-size: 18px;
      line-height: 15px;
    }
  }
`;

const Reservation = styled.div`
  font-size: 33.39px;
  font-weight: bold;
  color: #6478ff;
  margin: 20px 0 20px 0;
`;

const ReservationBottom = styled.div`
  border-bottom: #6478ff 3px solid;
  width: 98%;
  margin-top: 20px;
`;

const TestDiv = styled.div`
  width: 100%;
  height: 1700px;
`;

const SIgnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  width: 80%;
  height: 1500px;

  padding: 40px;

  transform: translate(-50%, -50%);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(158, 171, 255, 0.61);
  background: rgb(255, 255, 255);
  border-radius: 10px;
`;

const Login = styled.div`
  margin: 0 0 30px;
  padding: 0;
  font-weight: 700;
  font-size: 32.43px;
  line-height: 30.32px;
  color: rgba(77, 77, 77, 1);
  text-align: center;
`;

const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  position: relative;
`;

const LoginInput = styled.input`
  width: 592px;
  height: 64px;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;
  margin-bottom: 30px;
  margin-top: 50px;
  padding: 20px;
  border: 1.5px solid rgba(158, 171, 255, 0.61);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
  border-radius: 17px;
  outline: none;
  background: transparent;

  :focus ~ label,
  :valid ~ label {
    top: 10px;
    left: 0;

    color: #5a5a5a;
    font-weight: 500;
    font-size: 21.0432px;
    line-height: 21px;
  }
`;

const LoginLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-weight: 500;
  font-size: 21.0432px;
  line-height: 21px;
  color: rgba(90, 90, 90, 1);
  pointer-events: none;
  transition: 0.5s;
`;

const LoginLabelBottom = styled.div`
  border-bottom: #6478ff 3px solid;
  width: 98%;
  margin-top: 80px;
`;

const SignUpBtn = styled.button`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* margin-right: 30px;
  margin-top: 40px; */
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
    background: ${(props) => (props.state ? '#f44016' : '#C8D1E0')};
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

const PersonInfo = styled.div`
  font-weight: 700;
  font-size: 32.4329px;
  line-height: 30px;
  margin-top: 80px;
`;

const CheckBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 120px;
`;

const CheckBoxBolder = styled.div`
  box-sizing: border-box;
  background: #f9f9fa;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 18px;
  padding: 60px;
  width: 70%;
`;

const CheckBoxInput = styled.input`
  position: absolute;
  left: 400px;
  width: 37px;
  height: 37px;
  box-sizing: border-box;

  border: 1.5px solid #d6dcff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  accent-color: #6478ff;
`;

const CheckBoxTextBold = styled.div`
  font-weight: 700;
  font-size: 22.3735px;
  line-height: 21px;
  color: #4d4d4d;
  margin-top: 20px;
`;

const CheckBoxText = styled.div`
  font-weight: 500;
  font-size: 22.3735px;
  line-height: 21px;
  color: #4d4d4d;
  margin-top: 20px;
`;
