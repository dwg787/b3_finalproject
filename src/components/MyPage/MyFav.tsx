import MyLikeList from './MyLikeList';
import { Container, LikedHeader } from './styles';

const MyFav = () => {
  return (
    <Container>
      <LikedHeader>나의 찜 목록</LikedHeader>
      <MyLikeList />
    </Container>
  );
};

export default MyFav;
