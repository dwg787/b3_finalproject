import React from 'react';
import styled from 'styled-components';
import map from '../../assets/map.avif';

const MapImoji = () => {
  return <Map src={map} />;
};

export default MapImoji;

const Map = styled.img`
  width: 20px;
  margin: 10px;
  &:hover {
    transform: scale(1.1);
  }
`;
