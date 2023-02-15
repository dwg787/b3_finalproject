import { MENU_TYPE } from '../../apis/apiCodes';
import styled, { css } from 'styled-components';
import { useRecoilState } from 'recoil';
import { menuSelectionState } from '../../recoil/apiDataAtoms';
import { useEffect } from 'react';

const SelectMenu = ({ children }: { children: string }) => {
  const [selectedMenu, setSelectedMenu] = useRecoilState(menuSelectionState);
  const value = MENU_TYPE.find((e) => e.type === children)?.type;
  let curType = sessionStorage.getItem('mainpage_menu_type');
  const isSelectedMenu = value === curType ? true : false;

  const handleMainPageUI = () => {
    if (value) {
      setSelectedMenu(value);
      sessionStorage.setItem('mainpage_menu_type', value);
    }
  };

  return (
    <MenuEachItem isSelectedMenu={isSelectedMenu} onClick={handleMainPageUI}>
      {children}
    </MenuEachItem>
  );
};

export default SelectMenu;

const MenuEachItem = styled.button<{ isSelectedMenu: boolean }>`
  width: 50px;
  height: 20px;
  display: flex;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background-color: white;
  ${(props) =>
    props.isSelectedMenu &&
    css`
      border-bottom: solid 3px #ea2129;
      line-height: -10px;
      transform: scaleX(1);
      transition: transform 250ms ease-in-out;
    `}
`;
