import { MENU_TYPE } from '../../apis/apiCodes';
import styled, { css } from 'styled-components';
import { useRecoilState } from 'recoil';
import { menuSelectionState } from '../../recoil/apiDataAtoms';

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
