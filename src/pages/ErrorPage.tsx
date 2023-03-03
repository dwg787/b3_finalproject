import styled from 'styled-components';
import ErrorComponent from '../components/Error/ErrorComponent';

const ErrorPage = () => {
  return (
    <ErrorView>
      <ErrorComponent />
    </ErrorView>
  );
};

export default ErrorPage;

const ErrorView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
