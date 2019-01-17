import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.header`
  width: 100%;
  z-index: 2;
`;

const Container = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: grid;

  @media (min-width: 768px) {
    grid-auto-flow: column;
    justify-content: flex-start;
    grid-gap: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 3rem;
    justify-content: center;
    grid-gap: 1.5rem;
  }
`;

const navItemStyles = css`
  cursor: pointer;
`;

const NavItemWrapper = styled.div`
  ${navItemStyles};

  line-height: 1em;
  color: ${({ active }) => (active ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.5)')};
  font-size: 0.875em;
  text-transform: lowercase;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const NavItemTitleWrapper = styled.h4`
  ${navItemStyles};

  color: rgba(0, 0, 0, 0.9);
  font-size: 2.5em;
  font-family: Raleway, sans-serif;
  font-weight: 100;
  margin-right: 1rem;
`;

const NavItemTitle = ({ children, ...props }) => (
  <Link {...props}>
    <NavItemTitleWrapper>{children}</NavItemTitleWrapper>
  </Link>
);

const NavItem = ({ children, active, ...props }) => (
  <Link {...props}>
    <NavItemWrapper active={active}>{children}</NavItemWrapper>
  </Link>
);

const Socials = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-self: center;
  }

  @media (min-width: 768px) {
    justify-self: flex-end;
  }
`;

const UnstyledLink = styled.a`
  color: inherit;
  text-decoration: inherit;
  display: flex;
  align-items: center;
`;

const SocialButton = styled.button`
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  display: flex;
  padding: 0;
  outline: 0;
  transition: background 0.2s ease;

  &:hover {
    .icon {
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;

const Icon = styled.span`
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.125em;
`;

const Header = ({ router }) => (
  <Wrapper>
    <Container>
      <NavItemTitle href="/">FOUNT</NavItemTitle>
      <NavItem href="/" active={router.asPath === '/'}>
        posts
      </NavItem>
      <NavItem href="/p/about" active={router.asPath === '/p/about'}>
        about
      </NavItem>
      <NavItem href="/p/editorial-guidelines" active={router.asPath === '/p/editorial-guidelines'}>
        write for us
      </NavItem>
      <Socials>
        <UnstyledLink href="https://www.instagram.com/fountpens">
          <SocialButton color="red">
            <Icon className="socicon-instagram icon" />
          </SocialButton>
        </UnstyledLink>
        <UnstyledLink href="https://www.pinterest.com.au/0er9kbsq9bmwbsvhtawz6clyczq9rz">
          <SocialButton color="orange">
            <Icon className="socicon-pinterest icon" />
          </SocialButton>
        </UnstyledLink>
      </Socials>
    </Container>
  </Wrapper>
);

export default Header;
