import styled from "styled-components";
import ContentWrapper from "../../components/content-wrapper";

const PageNotFound = () => {
  return (
    <Wrapper>
      <Content>
        <Title>404</Title>
        <Text>Page not found!</Text>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 700px;
  padding-top: 200px;
`;

const Content = styled(ContentWrapper)`
  text-align: center;
  color: var(--black-light);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${150 / 16}rem;
  font-weight: 600;
`;

const Text = styled.p`
  font-size: ${44 / 16}rem;
`;

export default PageNotFound;
