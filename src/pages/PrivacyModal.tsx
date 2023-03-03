import React from 'react';
import styled from 'styled-components';

export default function PrivacyModal({ setPrivacyModalOpen }: any) {
  //   const closeModal = () => {
  //     setModalOpen(false);
  //   };
  return (
    <ModalBackground onClick={() => setPrivacyModalOpen(false)}>
      <ModalContainer>
        <PrivacyWrap>
          <PrivacyText>개인정보 수집동의</PrivacyText>
          <BoldDiv>1. 수집하는 개인정보 항목</BoldDiv>
          <BoldTextChild>
            문화체육관광부 대표 트리픽의 이용자 참여와 이용통계 분석 등의
            서비스를 위해 회원 가입시 아래의
          </BoldTextChild>
          <BoldTextChild>개인정보를 수집하고 있습니다.</BoldTextChild>
          <BoldTextChild>
            가. 필수정보: 아이디, 이름, 비밀번호, 이메일, 핸드폰번호
          </BoldTextChild>
          <BoldTextChild>
            나. 서비스 이용 과정에서 아래와 같은 정보들이 자동으로 생성되어
            수집될 수 있습니다.
          </BoldTextChild>
          <BoldTextChild>
            (접속로그, 접속IP정보, 쿠키, 방문 일시, 서비스 이용기록, 불량 이용
            기록)
          </BoldTextChild>
          <BoldDiv>
            2. 대표 트리픽에서 이용자 회원가입 시 직접 개인정보를 입력 및
            수정하여 개인정보를
          </BoldDiv>
          <BoldDiv>수집합니다.</BoldDiv>
          <BoldDiv>3. 수집 개인정보의 이용목적</BoldDiv>
          <BoldTextChild>
            회원가입, 회원활동 실적 관리, 회원탈퇴 의사 확인 등 회원관리
          </BoldTextChild>
          <BoldTextChild>
            제공되는 서비스 이용에 관한 인구통계학적 분석, 서비스 방문 및
            이용기록 분석, 관심사에 기반한 맞춤
          </BoldTextChild>
          <BoldTextChild>형 서비스 등 제공</BoldTextChild>
          <BoldTextChild>
            신규 서비스 개발 및 활성화, 홍보 및 이벤트, 전자우편 서비스 등 정보
            전달
          </BoldTextChild>
          <BoldTextChild>
            향후 법정 대리인 본인확인, 분쟁 조정을 위한 기록보존, 불만처리 등
            민원처리, 고지사항 전달 등
          </BoldTextChild>
          <BoldDiv>4. 개인정보의 보유 및 이용기간</BoldDiv>
          <BoldTextChild>
            이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이
            달성되면 지체 없이 파기합니다.
          </BoldTextChild>

          <BoldTextChild>
            따라서 문화체육관광부 대표트리픽은 최종 로그인 후 2년이 경과하였거나
            정보주체의
          </BoldTextChild>

          <BoldTextChild>
            회원 탈퇴 신청 시 회원의 개인정보를 지체 없이 파기합니다.
          </BoldTextChild>
          <BoldTextChild>
            동의 거부 권리 사실 및 불이익 내용 이용자는 동의를 거부할 권리가
            있습니다.
          </BoldTextChild>
          <BoldTextChild>
            동의를 거부할 경우에는 서비스 이용에 제한됨을 알려드립니다.
          </BoldTextChild>
        </PrivacyWrap>
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
  background: rgba(79, 78, 72, 0.7);
  z-index: 1;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 700px;
  height: 400px;
  z-index: 999;

  background-color: white;
  border: #6478ff 2px solid;
  border-radius: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  overflow-wrap: break-word;
  box-shadow: 0 15px 25px rgba(158, 171, 255, 0.61);
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #6478ff; /* 스크롤바의 색상 */

    border-radius: 10px;
  }
  @media screen and (max-width: 390px) {
    width: 300px;
    height: 400px;
  }
`;

const PrivacyWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
`;

const PrivacyText = styled.div`
  color: #6478ff;
  font-size: 32px;
  font-weight: 700;

  background-color: #f9f9f9;
  padding: 24px 30px 28px;
  box-sizing: border-box;
  @media screen and (max-width: 390px) {
    font-size: 22px;
  }
`;

const BoldDiv = styled.div`
  font-size: 16px;
  margin-left: 10px;
  line-height: 20px;
  font-weight: 600;
  color: #333;
  margin-top: 10px;
`;

const BoldTextChild = styled.div`
  font-size: 14px;
  margin-left: 10px;
  font-weight: 400;
  margin-top: 6px;
  color: #757575;
`;
