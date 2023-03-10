import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MENU_TYPE } from '../../apis/apiCodes';
import styled, { css } from 'styled-components';
import { useRecoilState } from 'recoil';
import { menuSelectionState } from '../../recoil/apiDataAtoms';

const SelectMenu = ({ children }: { children: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let queryString = location.search.split('=')[1] || 'home';
  const [selectedMenu, setSelectedMenu] = useRecoilState(menuSelectionState);
  const value = MENU_TYPE.find((e) => e.type === children)?.sort;
  const isSelectedMenu = value === queryString ? true : false;

  const handleMainPageUI = () => {
    if (value) {
      setSelectedMenu(value);
      switch (value) {
        case 'home':
          navigate('/');
          break;
        case 'spot':
          navigate('/list?sort=spot');
          break;
        case 'stay':
          navigate('/list?sort=stay');
          break;
        case 'restaurant':
          navigate('/list?sort=restaurant');
          break;
        default:
      }
    }
  };

  return (
    <MenuEachItem isSelectedMenu={isSelectedMenu} onClick={handleMainPageUI}>
      {children}
    </MenuEachItem>
  );
};

export default React.memo(SelectMenu);

const MenuEachItem = styled.button<{ isSelectedMenu: boolean }>`
  width: 200px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15.21px;
  font-weight: bold;
  margin-top: 18px;
  /* text-underline-offset: 10px; */
  cursor: pointer;
  border: none;
  background-color: white;
  ${(props) =>
    props.isSelectedMenu &&
    css`
      border-bottom: solid 3px #6478ff;
      line-height: 8px;
      transform: scaleX(1);
      transition: transform 250ms ease-in-out;
    `}
  @media screen and (max-width: 820px) {
    font-size: 12px;
  }
`;
