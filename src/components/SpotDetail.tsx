import { FetchedStayDataType } from '../apis/publicAPI';
import styled from 'styled-components';
import noimg from '../assets/noimg.png';
import { useNavigate } from 'react-router-dom';

const SpotDetail = (props: FetchedStayDataType) => {
  const navigate = useNavigate();

  return (
    <SpotEachItemWrapper>
      <SpotImgWrapper>
        <SpotEachItemImg
          src={props.img || noimg}
          alt='사진'
          onClick={() => navigate(`/spot/${props.id}`)}
        />
      </SpotImgWrapper>
      <SpotTitle>{props.children}</SpotTitle>
    </SpotEachItemWrapper>
  );
};

export default SpotDetail;

const SpotEachItemWrapper = styled.div`
  width: 17%;
  height: 200px;
  margin: 10px 10px 10px 10px;
`;

const SpotImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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

const SpotTitle = styled.div``;
