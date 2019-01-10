import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.header`
  background: #fafafa;
  width: 100%;
  z-index: 2;

  @media (min-width: 768px) {
    position: fixed;
    top: 0;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: grid;

  @media (min-width: 768px) {
    padding: 1rem 9rem;
    grid-auto-flow: column;
    justify-content: flex-end;
    grid-gap: 3rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 3rem;
    justify-content: center;
    grid-gap: 1.5rem;
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
