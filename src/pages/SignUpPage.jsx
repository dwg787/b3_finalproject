import React from "react";
import { auth, db } from "../apis/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const id_ref = React.useRef("");
  const name_ref = React.useRef("");
  const pw_ref = React.useRef("");
  const signup = async () => {
    if (id_ref.current.value === "") {
      return false;
    }
    const user = await createUserWithEmailAndPassword(auth, id_ref.current.value, pw_ref.current.value);
    sessionStorage.setItem("email", user.user.email);
    console.log(user);
    const user_doc = await addDoc(collection(db, "users"), {
      user_id: user.user.email,
      name: name_ref.current?.value,
    });
    navigate("/");
    console.log(user_doc.id);
  };
  return (
    <div>
      이메일: <input ref={id_ref} /> <br />
      이름 : <input ref={name_ref} /> <br />
      비밀번호 : <input ref={pw_ref} type="password" /> <br />
      <button onClick={signup}>회원가입</button>
    </div>
  );
};
export default SignUpPage;
