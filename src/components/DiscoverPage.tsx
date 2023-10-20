import aaron from '../assets/aaron.jpeg';
import styled from 'styled-components';

const DiscoverPage = () => {
  return (
    <>
      <Title>Coming Soon</Title>
      <Container>
        <Aaron src={aaron} alt='' />
      </Container>
    </>
  );
};

const Title = styled.h1`
  text-align: center;
  color: var(--color-accent);
`;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 80%;
`;

const Aaron = styled.img`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  display: inline-block;
  background-color: #3498db;
  animation: spin 60s linear infinite;
`;

export default DiscoverPage;
