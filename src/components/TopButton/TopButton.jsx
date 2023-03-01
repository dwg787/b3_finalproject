import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import topbutton from '../../assets/topbutton.avif';

export default function TopButton() {
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);
  function handleScroll() {
    if (ScrollY > 900) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }
  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {ScrollActive ? (
        <TopBtn onClick={scrollToTop}>
          <img src={topbutton} alt="" />
        </TopBtn>
      ) : null}
    </>
  );
}

const TopBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 30px;
  border: none;
  border-radius: 10px;
  position: fixed;
  background-color: #333333;
  color: white;
  left: 94.5%;
  top: 84%;
  z-index: 999;
  cursor: pointer;
`;
