import React, { Children } from 'react';
import { FetchedStayDataType } from '../apis/publicAPI';
import { Link } from 'react-router-dom';

const StayDetail = (props: FetchedStayDataType) => {
  //   const navigate = useNavigate();
  //   console.log('개별 컴포넌트 props', props);
  //   const handleGetDetailStayInfo = () => {
  //     navigate(`/${props.id}`);
  //   };

  return <Link to={`/${props.id}`}>{props.children}</Link>;
};

export default StayDetail;