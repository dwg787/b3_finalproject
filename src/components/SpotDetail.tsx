import React, { Children, useCallback, useEffect } from 'react';
import { FetchedStayDataType } from '../apis/publicAPI';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SpotDetail = (props: FetchedStayDataType) => {
  return (
    <SpotEachItemWrapper>
      <SpotEachItemImgWrapper src={props.img} alt='사진' />
      <Link style={{ textDecoration: 'none' }} to={`/${props.id}`}>
        {props.children}
      </Link>
    </SpotEachItemWrapper>
  );
};

export default SpotDetail;

const SpotEachItemWrapper = styled.div`
  width: 18%;
  height: 200px;
  margin: 10px 10px 10px 10px;
`;

const SpotEachItemImgWrapper = styled.img`
  width: 100%;
  height: 85%;
  border-radius: 10px;
`;
