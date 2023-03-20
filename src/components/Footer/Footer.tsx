import React from 'react';
import styled from 'styled-components';
import mainlogo from '../../assets/mainlogo.avif';

export default function Footer() {
  return (
    <StyledFooter>
      <TextBox>
        <FooterLogo src={mainlogo} alt="" />
        <TopText>
          <FooterText>
            (주)트립픽 | 소유자 : 유영재, 송원석, 김혜진, 심대호, 예재현, 소수현
            | 사업자 등록번호 : 220-87-42885 | 통신판매업신고 : 강남-14221호 |
            메일 : welcome@tripick.com
          </FooterText>
          <FooterText>
            고객센터 : 1644-1346 (오전 9시 - 익일 새벽 3시)
          </FooterText>
        </TopText>
        <BottomText>
          <FooterText>
            (주)트립픽은 통신판매 중개자로서 통신판매의 당사자가 아니며 상품의
            예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
          </FooterText>
          <FooterText>
            (주)트랩픽이 소유/운영/관리하는 웹사이트 및 앱 내의
            상품/판매자/이벤트 정보, 디자인 및 화면의 구성 UI를 포함하여 일체의
            콘텐츠에 대한 무단 복제, 배포, 방송 또는 전송, 스크래핑 등의 행위는
          </FooterText>
          <FooterText>
            저작권법 및 콘텐츠산업 진흥법 등 관련 법령에 의하여 엄격히 금지
            됩니다.
          </FooterText>
        </BottomText>
      </TextBox>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  max-width: 1006px;
  width: 100%;
  height: 300px;
  background-color: transparent;
  padding-top: 47.66px;
  padding-left: 24.14px;
  @media screen and (max-width: 820px) {
    padding-left: 24px;
    padding-right: 24px;
    font-size: 11px;
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 67px;
`;

const Footerh1 = styled.h1`
  color: white;
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 40px;
  margin-top: 80px;
`;

const FooterText = styled.p`
  color: white;
  font-size: 11.19px;
  margin-bottom: 10px;
`;

const FooterLogo = styled.img`
  width: 79.55px;
  height: 23.39px;
  margin-bottom: 22.32px;
`;

const TopText = styled.div`
  margin-bottom: 8.39px;
`;
const BottomText = styled.div``;
