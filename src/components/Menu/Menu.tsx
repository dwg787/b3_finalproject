import styled from 'styled-components';
import { MENU_TYPE } from '../../apis/apiCodes';
import SelectMenu from './SelectMenu';

const Menu = () => {
  return (
    <MenuContainer>
      {MENU_TYPE.map((e) => {
        return <SelectMenu key={e.id}>{e.type}</SelectMenu>;
      })}
    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.div`
  max-width: 1036.01px;
  width: 100%;
  height: 52.26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  gap: 180px;
  @media screen and (max-width: 820px) {
    justify-content: space-between;
    gap: 10px;
  }
`;
