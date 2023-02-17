import styled from 'styled-components';
import heart from '../../assets/heart.avif';
import redheart from '../../assets/redheart.avif';

const HeartButton = ({ onClick, like }) => {
  return <Heart src={like ? redheart : heart} onClick={onClick} />;
};

export default HeartButton;

const Heart = styled.img`
  width: 20px;
  /* margin: 10px; */
  margin-top: 13px;
  &:hover {
    transform: scale(1.1);
  }
`;
