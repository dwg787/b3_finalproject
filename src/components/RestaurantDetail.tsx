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
      {/* <SpotTitle>{props.children}</SpotTitle> */}
      <SpotTitle
        style={{ textDecoration: 'none' }}
        to={`/restaurant/${props.id}`}
      >
        {props.children}
      </SpotTitle>
    </SpotEachItemWrapper>
  );
};

export default RestaurantDetail;

const SpotEachItemWrapper = styled.div`
  position: relative;
  width: 17%;
  height: 200px;
  margin: 10px 10px 10px 10px;
  overflow: hidden;
  border-radius: 5px;
`;

const SpotEachItemImg = styled.img`
  /* position: absolute; */
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
    opacity: 0.2;
  }
`;

const SpotTitle = styled(Link)`
  position: absolute;
  margin: auto;
  /*   
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; */
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  &::before {
    position: absolute;
    margin: 0 auto;
    background-color: #000000;
  }
`;
