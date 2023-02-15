import React from 'react';
import styled from 'styled-components';

const MiddleDiv = styled.div`
  div {
    height: 500px;
  }
`;

const MiddleScroll = () => {
  return (
    <MiddleDiv>
      <div id="1">
        <h2>day 1</h2>
        <p>content</p>
      </div>
      <div id="2">
        <h2>day 2</h2>
        <p>content</p>
      </div>
      <div id="3">
        <h2>day 3</h2>
        <p>content</p>
      </div>
      <div id="4">
        <h2>day 4</h2>
        <p>content</p>
      </div>
    </MiddleDiv>
  );
};

export default MiddleScroll;
