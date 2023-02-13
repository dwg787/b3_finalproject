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
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
`;
