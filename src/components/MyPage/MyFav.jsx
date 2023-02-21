import styled from 'styled-components';
import MyLikeList from './MyLikeList';

const MyFav = () => {
  return (
    <Container>
      <LikedHeader>나의 찜 목록</LikedHeader>

      <MyLikeList />
    </Container>
  );
};

export default MyFav;

const LikedHeader = styled.div`
  font-size: 25.79px;
  line-height: 24.1px;
  margin: 58.2px 0 59.98px 0;
  font-weight: 900;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #4d4d4d;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
