import { FetchedStayDataType } from '../apis/publicAPI';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import noimg from '../assets/noimg.png';
import { useNavigate } from 'react-router-dom';

const StayDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();

  return (
    <SpotEachItemWrapper>
      <SpotEachItemImg
        src={props.img || noimg}
        alt='사진'
        onClick={() => navigate(`/stay/${props.id}`)}
      />
      {/* <Link style={{ textDecoration: 'none' }} to={`/stay/${props.id}`}>
        {props.children}
      </Link> */}
    </SpotEachItemWrapper>
  );
};

export default StayDetail;

const SpotEachItemWrapper = styled.div`
  width: 17%;
  height: 200px;
  margin: 10px 10px 10px 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const SpotEachItemImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
`;
