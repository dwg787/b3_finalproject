import { FetchedStayDataType } from '../apis/publicAPI';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import noimg from '../assets/noimg.png';
import { useNavigate } from 'react-router-dom';

const RestaurantDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();
  return (
    <SpotEachItemWrapper>
      <SpotEachItemImg
        src={props.img || noimg}
        alt='사진'
        onClick={() => navigate(`/restaurant/${props.id}`)}
      />
      <div>{props.children}</div>
      {/* <Link style={{ textDecoration: 'none' }} to={`/restaurant/${props.id}`}>
        {props.children}
      </Link> */}
    </SpotEachItemWrapper>
  );
};

export default RestaurantDetail;

const SpotEachItemWrapper = styled.div`
  width: 17%;
  height: 200px;
  margin: 10px 10px 10px 10px;
  overflow: hidden;
  border-radius: 5px;
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

// const SpotTitle = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   &::before {
//     position: absolute;
//     z-index: 10;
//     margin: 0 auto;
//     background-color: #000000;
//   }
// `;
