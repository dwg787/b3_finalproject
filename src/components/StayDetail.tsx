import React from 'react';
import { FetchedStayDataType } from '../apis/publicAPI';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import noimg from '../assets/noimg.png';

const StayDetail = (props: FetchedStayDataType) => {
  return (
    <SpotEachItemWrapper>
      <SpotEachItemImgWrapper src={props.img || noimg} alt='사진' />
      <Link style={{ textDecoration: 'none' }} to={`/spot/${props.id}`}>
        {props.children}
      </Link>
    </SpotEachItemWrapper>
  );
};

export default StayDetail;

const SpotEachItemWrapper = styled.div`
  width: 17%;
  height: 200px;
  margin: 10px 10px 10px 10px;
`;

const SpotEachItemImgWrapper = styled.img`
  width: 100%;
  height: 85%;
  border-radius: 10px;
`;
