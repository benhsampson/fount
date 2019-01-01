import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  background: #FAFAFA;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
`;

const Container = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: flex;

  @media (min-width: 768px) {
    padding: 1rem 9rem;
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    padding: 1rem 3rem;
    justify-content: center;
  }
`;

const Button = styled.a`
  text-decoration: none;
  background: transparent;
  border: 1px solid rgba(0,0,0,0.4);
  border-radius: 0;
  padding: 1rem 1.75rem;
  color: rgba(0,0,0,0.8);
  text-transform: uppercase;
  font-style: Raleway, sans-serif;
  font-size: 0.875em;
  letter-spacing: 1px;
  font-weight: 400;
  outline: none;
`;

const Header = () => (
  <Wrapper>
    <Container>
      <Button href="https://goo.gl/forms/o4UpWWkTHdLWLlOh2" target="_blank">
        Submit your review
      </Button>
    </Container>
  </Wrapper>
);

export default Header;
