import React from 'react';
import styled from 'styled-components';
import heart from '../../assets/heart.png';
import redheart from '../../assets/redheart.png';

const Heart = styled.img`
  width: 25px;
  margin: 10px;
  &:hover{
    transform: scale(1.1);
`;

const HeartButton = ({ onClick, like }) => {
  return <Heart src={like ? redheart : heart} onClick={onClick} />;
};

export default HeartButton;
