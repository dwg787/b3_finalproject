import { ScaleLoader } from 'react-spinners';
import styled from 'styled-components';

const Loader = () => {
  return (
    <Container>
      <ScaleLoader color="#6478ff" />
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
`;
