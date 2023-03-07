import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../apis/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import '../App.css';
import Footer from '../components/Footer/Footer';
import MyInfoModal from './MyInfoModal';
import PrivacyModal from './PrivacyModal';

type CheckList = ('terms' | 'collect' | 'another')[];

const SignUpPage = () => {
  const navigate = useNavigate();

  // 초기값 세팅 - 이메일, 닉네임, 비밀번호, 비밀번호 확인, 휴대폰
  const [id, setId] = useState('');
  const [nickName, setNickName] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  // 에러 메시지
  const [idErrMsg, setIdErrMsg] = useState('');
  const [nickNameErrMsg, setNickNameErrMsg] = useState('');
  const [pwErrMsg, setPwErrMsg] = useState('');
  const [pwConfirmErrMsg, setPwConfirmErrMsg] = useState('');
  const [phoneErrMsg, setPhoneErrMsh] = useState('');

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwConfirm, setIsPwConfirm] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isphoneNumber, setIsPhoneNumber] = useState(false);

  // 에러 나면 그곳에 커서 이동되도록
  const idRef = useRef(null);
  const nickNameRef = useRef(null);
  const pwRef = useRef(null);
  const pwConfirmRef = useRef(null);
  const phoneNumberRef = useRef(null);

  //약관동의 로직
  const [checkList, setCheckList] = useState<CheckList>([]);
  const [buttonColor, setButtonColor] = useState<boolean>(false);
  const [checkBoxActive, setCheckBoxActive] = useState<boolean>(false);
  const isCheckBoxClicked = () => {
    setCheckBoxActive(!checkBoxActive);
  };

  // 모달창 노출
  //회원정보 모달
  const [modalOpen, setModalOpen] = useState(false);
  //개인정보 모달
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  //회원정보 모달
  const showModal = () => {
    setModalOpen(true);
  };

  //개인정보 모달
  const privacyshowModal = () => {
    setPrivacyModalOpen(true);
  };

  // 회원가입 완료

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkBoxActive) {
      alert('약관에 동의해주세요!'); // checkbox가 선택되지 않았다면 알림창 띄우기
      return;
    }
    if (phoneNumber === '') {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }
    await createUserWithEmailAndPassword(auth, id, pw).then((data) => {
      if (auth.currentUser)
        updateProfile(auth?.currentUser, {
          displayName: nickName,
        })
          .then(() => {
            alert('회원가입이 완료되었습니다');

            setId('');
            setNickName('');
            setPw('');
            setPwConfirm('');
            setPhoneNumber('');
            localStorage.setItem('id', nickName);
            localStorage.setItem('email', data.user?.email ?? '');
            sessionStorage.setItem('uid', data.user.uid);

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

  //* id (이메일)
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentNickName = e.target.value;

    setNickName(currentNickName);

    if (currentNickName.length < 2 || currentNickName.length > 7) {
      setNickNameErrMsg(' 2글자 이상, 7글자 미만으로만 사용할 수 있습니다.');
      setIsNickName(false);
    } else {
      setNickNameErrMsg('');
      setIsNickName(true);
    }
  };

  //* 비밀번호
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const onChangePwConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // 휴대폰
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPhone = e.target.value;

    setPhoneNumber(currentPhone);
    const phoneRegex = /^[0-9\b -]{0,25}$/;
    if (!phoneRegex.test(currentPhone)) {
      setPhoneErrMsh('숫자만 입력해 주세요');
      setIsPhoneNumber(false);
    } else {
      setPhoneErrMsh('');
      setIsPhoneNumber(true);
    }
  };
  useEffect(() => {
    if (phoneNumber.length === 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNumber.length === 13) {
      setPhoneNumber(
        phoneNumber
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [phoneNumber]);

  //약관동의 만드는법
  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setCheckList(['terms', 'collect', 'another'])
      : setCheckList([]);
  };

  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setCheckList([...checkList, e.target.name as CheckList[number]])
      : setCheckList(checkList.filter((choice) => choice !== e.target.name));
  };

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
                maxLength={25}
                className="user-box"
                type="text"
                placeholder="이메일"
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
                placeholder="닉네임"
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
                placeholder="비밀번호"
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
                placeholder="비밀번호 확인"
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
              <LoginInput
                maxLength={13}
                type="text"
                ref={phoneNumberRef}
                value={phoneNumber}
                onChange={onChangePhone}
                placeholder="휴대전화"
              />
              <LoginLabel>휴대전화</LoginLabel>
              <Error>
                <span
                  className={`message ${isphoneNumber ? 'success' : 'error'}`}
                >
                  {phoneErrMsg}
                </span>
              </Error>
            </LoginBox>
            <LoginLabelBottom></LoginLabelBottom>

            <PersonInfo>개인정보 처리방침</PersonInfo>
            <CheckBoxBolder>
              <CheckBoxWrap>
                <CheckBoxInput1
                  onClick={isCheckBoxClicked}
                  type="checkbox"
                  name="all"
                  onChange={checkAll}
                  checked={checkList.length === 3 ? true : false}
                ></CheckBoxInput1>
                <CheckBoxTextBold>
                  본인은 아래의 모든 개인정보 처리방침에 모두 동의합니다.
                </CheckBoxTextBold>
              </CheckBoxWrap>
              <CheckBoxWrap>
                <CheckBoxInput2
                  onClick={isCheckBoxClicked}
                  type="checkbox"
                  name="terms"
                  onChange={check}
                  checked={checkList.includes('terms') ? true : false}
                ></CheckBoxInput2>
                <CheckBoxText>
                  본인은 본 서비스 약관에 동의하며 12세 이상임을 확인합니다.
                  <CheckBoxText2 onClick={showModal}>(필수)</CheckBoxText2>
                  {modalOpen && <MyInfoModal setModalOpen={setModalOpen} />}
                </CheckBoxText>
              </CheckBoxWrap>
              <CheckBoxWrap>
                <CheckBoxInput3
                  onClick={isCheckBoxClicked}
                  type="checkbox"
                  name="collect"
                  onChange={check}
                  checked={checkList.includes('collect') ? true : false}
                ></CheckBoxInput3>
                <CheckBoxText5>
                  본인은 개인정보 처리방침에 따라 본인의 개인 정보를 사용하는
                  것에 동의합니다.
                  <CheckBoxText3 onClick={privacyshowModal}>
                    (필수)
                  </CheckBoxText3>
                  {privacyModalOpen && (
                    <PrivacyModal setPrivacyModalOpen={setPrivacyModalOpen} />
                  )}
                </CheckBoxText5>
              </CheckBoxWrap>
              <CheckBoxWrap1>
                <CheckBoxInput4
                  onClick={isCheckBoxClicked}
                  type="checkbox"
                  name="another"
                  onChange={check}
                  checked={checkList.includes('another') ? true : false}
                ></CheckBoxInput4>
                <CheckBoxText1>
                  <p>
                    본인은 개인정보 처리방침에 따라 대한민국 또는 해외에 있는 제
                    3자에 본인의 개인정보
                  </p>
                  <CheckBoxBotoomText>
                    <MyInfoText>를 제공하는 것에 동의합니다.</MyInfoText>

                    <CheckBoxText4 onClick={privacyshowModal}>
                      (필수)
                    </CheckBoxText4>
                  </CheckBoxBotoomText>
                </CheckBoxText1>

                {privacyModalOpen && (
                  <PrivacyModal setPrivacyModalOpen={setPrivacyModalOpen} />
                )}
              </CheckBoxWrap1>
            </CheckBoxBolder>

            <LoginBox>
              <SignUpBtn state={buttonColor}>회원가입</SignUpBtn>
            </LoginBox>
          </SignForm>
        </SignUpContainer>
      </TestDiv>

      <Footer />
    </SIgnWrap>
  );
};
export default SignUpPage;

const Error = styled.div`
  position: absolute;

  top: 80px;
  padding: 5px;

  .message {
    &.error {
      color: rgba(248, 112, 56, 1);
      font-weight: 500;
      font-size: 10px;
      line-height: 8px;
    }
  }
`;

const Reservation = styled.div`
  font-size: 21.7px;
  font-weight: bold;
  color: #6478ff;
  margin-top: 16.55px;
  @media screen and (max-width: 390px) {
    font-weight: 700;
    font-size: 17px;
    line-height: 36px;
  }
`;

const TestDiv = styled.div`
  width: 100%;
  height: 1097px;
  margin-top: 20.45px;
  @media screen and (max-width: 390px) {
    height: 948px;
  }
`;

const SIgnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(124, 141, 255, 1) 69%,
    rgba(255, 255, 255, 1) 120%
  );
`;

const SignUpContainer = styled.div`
  width: 1036px;
  height: 1097px;

  margin: auto;

  padding: 40px;

  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 2.25708px 2.25708px 5.6427px rgba(0, 0, 0, 0.18);
  border-radius: 0px 0px 11px 11px;
  @media screen and (max-width: 820px) {
    width: 100%;
  }
  @media screen and (max-width: 390px) {
    width: 100%;
    height: 898px;
  }
`;

const ReservationBottom = styled.div`
  border: solid #6478ff 1.13px;
  width: 1036px;
  margin-top: 20.45px;
  @media screen and (max-width: 820px) {
    width: 100%;
  }
  @media screen and (max-width: 390px) {
    width: 100%;
  }
`;

const Login = styled.div`
  margin-top: 39px;
  padding: 0;
  font-weight: 700;
  font-size: 21.07px;
  line-height: 19.7px;
  color: rgba(77, 77, 77, 1);
  text-align: center;
  @media screen and (max-width: 390px) {
    margin-top: 21px;
    font-weight: 700;
    font-size: 16px;
    line-height: 17px;
  }
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
  width: 334px;
  height: 36px;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;

  margin-top: 46px;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #c4ccff;
  box-shadow: 2.25708px 2.25708px 5.6427px rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  outline: none;

  :focus ~ label,
  :valid ~ label {
    top: 20px;
    left: 0;

    color: #5a5a5a;
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
  }
  ::placeholder {
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
    color: #c8c8c8;
  }
`;

const LoginLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;

  padding: 10px 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: rgba(90, 90, 90, 1);
  pointer-events: none;
  transition: 0.5s;
`;

const LoginLabelBottom = styled.div`
  border-bottom: #6478ff 1px solid;
  width: 938px;
  height: 1px;
  margin-top: 65.98px;
  @media screen and (max-width: 820px) {
    width: 90%;
  }
  @media screen and (max-width: 390px) {
    width: 334px;
  }
`;

const SignUpBtn = styled.button<{ state: boolean }>`
  margin-top: 29px;
  cursor: pointer;

  width: 325.24px;
  height: 47px;

  background: #6478ff;
  border: 1px solid #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.18);
  border-radius: 14px;
  border: none;
  font-weight: 500;
  font-size: 19.3064px;
  line-height: 19px;
  color: #ffffff;
  text-align: center;
  background: ${(props) => (props.state ? '#6478ff;' : '#C8D1E0')};
  @media screen and (max-width: 390px) {
    margin-top: 22px;
    width: 334px;
    height: 39px;
    font-size: 15px;
    line-height: 13px;
  }
`;

const PersonInfo = styled.div`
  font-weight: 700;
  font-size: 22px;
  line-height: 17px;
  margin-top: 39px;
  @media screen and (max-width: 390px) {
    font-size: 16px;
    line-height: 17px;
    margin-top: 23px;
  }
`;

const CheckBoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 7px;
`;

const CheckBoxWrap1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 35.6px;
`;

const CheckBoxBolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 39px;
  box-sizing: border-box;
  background: #f9f9fa;
  box-shadow: 2.25708px 2.25708px 5.6427px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 663px;
  height: 203px;
  @media screen and (max-width: 820px) {
    width: 90%;
  }
  @media screen and (max-width: 390px) {
    width: 340px;
    height: 200px;
    margin-top: 13px;
    background: #f9f9fa;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
    border-radius: 18px;
  }
`;

const CheckBoxInput1 = styled.input`
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  margin-left: 84px;
  margin-top: 30px;
  box-shadow: 2.25708px 2.25708px 5.6427px rgba(0, 0, 0, 0.18);
  border-radius: 5px;
  accent-color: #6478ff;

  @media screen and (max-width: 820px) {
    margin-left: 40px;
  }

  @media screen and (max-width: 390px) {
    width: 17px;
    height: 17px;
    margin-left: 10px;
    margin-top: 65px;
  }
`;
const CheckBoxInput2 = styled.input`
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  margin-left: 84px;

  box-shadow: 2.25708px 2.25708px 5.6427px rgba(0, 0, 0, 0.18);
  border-radius: 5px;
  accent-color: #6478ff;
  @media screen and (max-width: 820px) {
    margin-left: 40px;
  }
  @media screen and (max-width: 390px) {
    width: 17px;
    height: 17px;
    margin-left: 10px;
    margin-top: 10px;
    box-shadow: none;
  }
`;
const CheckBoxInput3 = styled.input`
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  margin-left: 84px;

  box-shadow: 2.25708px 2.25708px 5.6427px rgba(0, 0, 0, 0.18);
  border-radius: 5px;
  accent-color: #6478ff;
  @media screen and (max-width: 820px) {
    margin-left: 40px;
  }
  @media screen and (max-width: 390px) {
    margin-left: 10px;
    margin-bottom: 26px;
    width: 20px;
    height: 20px;

    box-shadow: none;
  }
`;
const CheckBoxInput4 = styled.input`
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  margin-left: 84px;

  box-shadow: 2.25708px 2.25708px 5.6427px rgba(0, 0, 0, 0.18);
  border-radius: 5px;
  accent-color: #6478ff;
  @media screen and (max-width: 820px) {
    margin-left: 40px;
  }
  @media screen and (max-width: 390px) {
    margin-left: 10px;
    margin-bottom: 65px;
    box-shadow: none;
  }
`;

const CheckBoxTextBold = styled.div`
  font-weight: 700;
  font-size: 13px;
  line-height: 12px;
  color: rgba(77, 77, 77, 1);
  margin-top: 25px;
  margin-left: 14px;
  @media screen and (max-width: 820px) {
    font-size: 85%;
  }
  @media screen and (max-width: 390px) {
    font-size: 10px;
    line-height: 21px;
    margin-top: 60px;
    margin-left: 0px;
  }
`;

const CheckBoxText = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 13px;
  line-height: 12px;
  color: #4d4d4d;
  margin-left: 14px;
  @media screen and (max-width: 820px) {
    font-size: 75%;
  }
  @media screen and (max-width: 390px) {
    font-size: 10px;
    line-height: 11px;
    margin-left: 0px;

    margin-top: 5px;
  }
`;

const CheckBoxText5 = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 13px;
  line-height: 12px;
  color: #4d4d4d;
  margin-left: 14px;
  @media screen and (max-width: 820px) {
    font-size: 75%;
  }
  @media screen and (max-width: 390px) {
    font-size: 10px;
    line-height: 15px;
    margin-left: 0px;
    display: inline-block;
    margin-top: 5px;
  }
`;

const CheckBoxText1 = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 12px;
  color: #4d4d4d;
  margin-top: 19px;
  margin-left: 14px;
  @media screen and (max-width: 820px) {
    font-size: 75%;
  }
  @media screen and (max-width: 390px) {
    font-size: 10px;
    line-height: 21px;
    margin-left: 0px;
    margin-top: 0px;
    margin-bottom: 20px;
  }
`;

const CheckBoxText2 = styled.div`
  color: rgba(248, 112, 56, 1);
  cursor: pointer;
`;

const CheckBoxText3 = styled.div`
  color: rgba(248, 112, 56, 1);
  cursor: pointer;
  @media screen and (max-width: 390px) {
    /* position: absolute;
    top: 854px;
    right: 250px; */
  }
`;

const CheckBoxText4 = styled.div`
  color: rgba(248, 112, 56, 1);
  cursor: pointer;
  @media screen and (max-width: 390px) {
    /* position: absolute;
    top: 901px;
    right: 85px; */
  }
`;

const CheckBoxBotoomText = styled.div`
  display: flex;
  margin-top: 10px;
  @media screen and (max-width: 390px) {
    margin-top: 0px;
  }
`;

const MyInfoText = styled.p`
  @media screen and (max-width: 390px) {
    /* position: absolute;
    top: 901px;
    right: 110px; */
  }
`;
