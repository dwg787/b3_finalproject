import { useMediaQuery } from 'react-responsive';
import MobileMyLikeList from './MobileMyLikeList';
import MyLikeList from './MyLikeList';
import { Container } from './styles';

const MyFav = () => {
  const isMobile: boolean = useMediaQuery({
    query: '(max-width:820px)',
  });

  console.log('반응형?', isMobile);
  return (
    <Container>{isMobile ? <MobileMyLikeList /> : <MyLikeList />}</Container>
  );
};

export default MyFav;
