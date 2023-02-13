import { FetchedStayDataType } from '../apis/publicAPI';
import styled from 'styled-components';
import noimg from '../assets/noimg.png';
import { useNavigate } from 'react-router-dom';

const StayDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();

  return (
    <StayEachItemWrapper>
      <StayImgWrapper>
        <StayEachItemImg
          src={props.img || noimg}
          alt='사진'
          decoding='async'
          onClick={() => navigate(`/stay/${props.id}`)}
        />
      </StayImgWrapper>
      <StayTitle>{props.children}</StayTitle>
    </StayEachItemWrapper>
  );
};

export default StayDetail;

const StayEachItemWrapper = styled.div`
  width: 17%;
  height: 200px;
  margin: 10px 10px 10px 10px;
`;

const StayImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;

const StayEachItemImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
`;

const StayTitle = styled.div``;
