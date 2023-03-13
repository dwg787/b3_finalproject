import Loader from '../components/Loader/Loader';
import mainlogo from '../assets/mainlogo.avif';
import styled from 'styled-components';

const LoadingPage = () => {
  return (
    <>
      <Nav>
        <Mainlogo src={mainlogo} alt="트리픽" />
        <LoginButtonBox>
          <LoginBox>
            <InputBox></InputBox>
          </LoginBox>
        </LoginButtonBox>
      </Nav>
      <Loader />
    </>
  );
};

export default LoadingPage;

const Mainlogo = styled.img`
  width: 76.08px;
  height: 22.37px;
  margin-top: 5px;
  margin-left: 42.09px;
  @media screen and (max-width: 820px) {
    margin-left: 25px;
    width: 70.82;
    height: 20.82;
  }
`;

const Nav = styled.div`
  max-width: 1036px;
  width: 100%;
  height: 51px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6478ff;
  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

const LoginButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 46.88px;
  /* margin-top: 52px; */
  @media screen and (max-width: 820px) {
    margin-right: 25px;
  }
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const InputBox = styled.div`
  display: flex;
  gap: 150px;
  justify-content: space-around;
  align-items: center;
  /* width: 400px; */
  height: 30px;
  border-radius: 10px;
  text-indent: 10px;
  font-weight: 500;

  cursor: pointer;
`;
