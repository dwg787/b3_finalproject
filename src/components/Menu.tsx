import React from 'react';
import styled from 'styled-components';

const Menu = () => {
  const menuList = ['관광지', '숙박', '맛집'];
  return (
    <MenuContainer>
      {menuList.map((e) => {
        return <MenuEachItem key={e}>{e}</MenuEachItem>;
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
  background-color: #d59999;
`;
const MenuEachItem = styled.div`
  width: 50px;
  height: 20px;
  display: flex;
  justify-content: center;
  background-color: #d7d7d7;
`;
