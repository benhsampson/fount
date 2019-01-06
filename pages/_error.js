import { withRouter } from 'next/router';

import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  align-items: flex-start;
`;

const Heading = styled.h1`
  color: rgba(0,0,0,0.8);
  font-size: 4em;
  margin-bottom: 1.5rem;
  font-weight: 300;
  font-family: Raleway, sans-serif;
`;

const Subheading = styled.h3`
  color: rgba(0,0,0,0.6);
  font-size: 1.125em;
  font-weight: 5000;
  margin-bottom: 3rem;
`;

const Banner = styled.div`
  background: #FAFAFA;
  padding: 4rem 0;
  display: flex;
  justify-content: flex-start;
`;

const Button = styled.button`
  border: 1px solid rgba(0,0,0,0.4);
  border-radius: 0;
  background: 0;
  color: rgba(0,0,0,0.6);
  padding: 1rem 3rem;
  font-size: 1.25em;
  cursor: pointer;
`;

const Error = ({ router }) => (
  <Wrapper>
    <Container>
      <Heading>404 Error</Heading>
      {/* TODO: Fix the links here */}
      <Subheading>If something is broken, we'd love to fix it. You can send us an email or let us know on Twitter.</Subheading>
      </Container>
      <Banner>
        <Container>
          <Button onClick={() => router.back()}>
            Go back
          </Button>
        </Container>
      </Banner>
  </Wrapper>
);

export default withRouter(Error);
