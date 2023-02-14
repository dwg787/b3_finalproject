import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../apis/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import EditModal from "./EditModal";
import styled from "styled-components";

const MyInfo = () => {
  const [email, setEmail] = useState("");

  // True: 닉네임 수정, False: Email 수정
  const [contentInfo, setContentInfo] = useState("");
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  // 현재 유저
  const [currentUser, setCurrentUser] = useState("");
  // 닉네임 수정
  const [userName, setUserName] = useState("");

  // 닉네임 수정 모달 창 열림
  const openUserNameModal = () => {
    setModalOpen(true);
    setContentInfo(true);
    document.body.style.overflow = "hidden";
  };

  // 이메일 수정 모달 창 열림
  const openEmailModal = () => {
    setModalOpen(true);
    setContentInfo(false);
    document.body.style.overflow = "hidden";
  };

  // 닉네임 입력
  const updateNickname = (item) => {
    console.log("item", item);
    setUserName(item);
  };

  // 이메일 주소 입력
  const updateEmail = (item) => {
    console.log("item", item);
    setEmail(item);
  };

  // 유저 정보 가져오기
  const getUserInfo = async () => {
    const docRef = doc(db, "users", currentUser);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setEmail(docSnap.data().email);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(auth.currentUser.uid);
        setUserName(sessionStorage.getItem("id", auth.currentUser.displayName));
        setEmail(sessionStorage.getItem("email", auth.currentUser.email));

        getUserInfo();
        console.log("로그인 되어있음");
      } else if (!user) {
        console.log("로그인 안됨");
      }
    });
    if (!currentUser) return;
  }, []);
  return (
    <MyPageContainer>
      {/* 닉네임, 이메일 링크 수정 */}
      <MyInfoContainer>
        <NickNameContainer>
          <MyPageTagTitle>닉네임</MyPageTagTitle>
          <InputCheckContainer>
            <MyInfoInput>{userName}</MyInfoInput>
            <MyInfoEditButton onClick={openUserNameModal}>수정</MyInfoEditButton>
            {modalOpen && <EditModal setModalOpen={setModalOpen} setContentInfo={contentInfo} setUserName={userName} setEmail={email} updateNickname={updateNickname} updateEmail={updateEmail} currentUser={currentUser} />}
          </InputCheckContainer>
        </NickNameContainer>

        <div>
          <MyPageTagTitle>이메일</MyPageTagTitle>
          <InputCheckContainer>
            <MyInfoInput>{email}</MyInfoInput>
            <MyInfoEditButton onClick={openEmailModal}>수정</MyInfoEditButton>
            {modalOpen && <EditModal setModalOpen={setModalOpen} setContentInfo={contentInfo} setUserName={userName} setEmail={email} updateNickname={updateNickname} updateEmail={updateEmail} currentUser={currentUser} />}
          </InputCheckContainer>
        </div>
      </MyInfoContainer>
    </MyPageContainer>
  );
};

export default MyInfo;

const MyPageContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

const MyInfoContainer = styled.div`
  padding-top: 65px;
  flex: 30%;
  margin: 0 auto;
  padding-left: 40px;
  box-sizing: border-box;
`;

const NickNameContainer = styled.div`
  margin-bottom: 40px;
`;

const MyPageTagTitle = styled.div`
  font-weight: 600;
`;

const InputCheckContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 63px;
`;

const MyInfoInput = styled.div`
  border: none;
  border-bottom: 1px solid black;
  min-width: 200px;
  width: 70%;
  margin: 20px 10px 20px 0;
  outline: none;
  flex: 80%;
`;

export const MyInfoEditButton = styled.button`
  border: 1px solid gray;
  border-radius: 7px;
  color: gray;
  background-color: #fff;
  font-weight: 600;
  padding: 5px 10px;
  margin-right: 20px;
  height: 35px;
  width: 50px;
  cursor: pointer;
  flex: 20%;

  &:hover {
    background: #e88acf;
    color: #fff;
  }
`;
