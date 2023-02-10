import { useState, useEffect } from "react";
import { auth, db } from "../apis/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const SignUpPage = () => {
  const navigate = useNavigate();

  // 초기값 세팅 - 이메일, 닉네임, 비밀번호, 비밀번호 확인
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  // 회원가입 완료

  const signup = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;

    const sign = await createUserWithEmailAndPassword(auth, id, pw)
      .then(() => {
        if (auth.currentUser)
          updateProfile(auth?.currentUser, {
            displayName: nickName,
          })
            .then(() => {
              alert("회원가입이 완료되었습니다");
              console.log("sign", sign);
              setId("");
              setNickName("");
              setPw("");
              sessionStorage.setItem("id", nickName);
              navigate("/");
            })
            .catch((error) => {
              console.log(error.message);
              alert("회원가입을 다시 진행해주세요.");
              navigate("/signup");
            });
      })
      .catch((error) => {
        setError(error.message);
        alert("이미 존재하는 계정 입니다.");
        navigate("/login");
        console.log(error);
      });
  };

  // useEffect(() => {
  //   setValue(sessionStorage.getItem("email"));
  // });

  //* id (이메일)
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
  };

  //* 닉네임
  const onChangeNickName = (e) => {
    const currentNickName = e.target.value;
    setNickName(currentNickName);
  };

  //* 비밀번호
  const onChangePw = (e) => {
    const currentPw = e.target.value;
    setPw(currentPw);
  };

  return (
    <div>
      이메일: <input onChange={onChangeId} value={id} /> <br />
      이름 : <input onChange={onChangeNickName} value={nickName} /> <br />
      비밀번호 : <input onChange={onChangePw} value={pw} type="password" /> <br />
      <button onClick={signup}>회원가입</button>
    </div>
  );
};
export default SignUpPage;
