import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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
  display: grid;
  grid-auto-flow: column;
  grid-gap: 3rem;

  @media (min-width: 768px) {
    padding: 1rem 9rem;
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    padding: 1rem 3rem;
    justify-content: center;
  }
`;

const NavItemWrapper = styled.div`
  color: rgba(0,0,0,0.8);
  cursor: pointer;
  font-size: 0.875em;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1;
`;

const NavItem = ({ children, ...props }) => (
  <Link {...props}>
    <NavItemWrapper>
      {children}
    </NavItemWrapper>
  </Link>
);

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
      <NavItem href="/p/about">
        Start here
      </NavItem>
      <NavItem href="/p/editorial-guidelines">
        Become a reviewer
      </NavItem>
      <Button href="https://goo.gl/forms/o4UpWWkTHdLWLlOh2" target="_blank">
        Submit your review
      </Button>
    </Container>
  </Wrapper>
);

export default Header;
