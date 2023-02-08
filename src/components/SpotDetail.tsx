import React, { Children } from 'react';
import { FetchedStayDataType } from '../apis/publicAPI';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SpotDetail = (props: FetchedStayDataType) => {
  //   const navigate = useNavigate();
  // console.log('개별 컴포넌트 props', props);
  //   const handleGetDetailStayInfo = () => {
  //     navigate(`/${props.id}`);
  //   };

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
