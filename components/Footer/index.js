import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

const Wrapper = styled.footer`
  background: #eee;

  @media (min-width: 768px) {
    padding: 3rem 6rem;
  }

  @media (max-width: 768px) {
    padding: 3rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Sections = styled.div`
  display: grid;

  @media (min-width: 768px) {
    grid-auto-flow: column;
    grid-gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-gap: 1.5rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h6`
  font-family: Raleway, sans-serif;
  color: rgba(0, 0, 0, 0.8);
  font-size: 1em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2rem;
`;

const Subheading = styled.p`
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.8em;
`;

const Links = styled.ul`
  display: flex;
  flex-direction: column;
`;

const LinkItem = styled.li`
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;

  &:not(first-child) {
    margin-bottom: 0.75rem;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const Link = ({ children, ...props }) => (
  <NextLink {...props}>
    <LinkItem>{children}</LinkItem>
  </NextLink>
);

const UnstyledLink = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

const LinkHref = ({ children, ...props }) => (
  <UnstyledLink {...props}>
    <LinkItem>{children}</LinkItem>
  </UnstyledLink>
);

const Footer = () => (
  <Wrapper>
    <Container>
      <Sections>
        <Section>
          <Heading>FOUNT</Heading>
          <Subheading>
            Fountain pens are an expensive addiction.
            <br />
            Get the right purchasing advise from expert reviewers.
          </Subheading>
        </Section>
        <Section>
          <Heading>Addicts</Heading>
          <Links>
            <Link href="/p/about">About</Link>
            <Link href="/p/our-difference">The FOUNT Difference</Link>
          </Links>
        </Section>
        <Section>
          <Heading>Reviewers</Heading>
          <Links>
            <LinkHref href="https://goo.gl/forms/o4UpWWkTHdLWLlOh2" target="_blank">
              Submit a review
            </LinkHref>
            <Link href="/p/editorial-guidelines">Editorial guidelines</Link>
            <Link href="/p/revenue-sharing">Revenue sharing</Link>
          </Links>
        </Section>
        <Section>
          <Heading>Socials</Heading>
          <Links>
            <LinkHref href="https://www.instagram.com/fountpens">Instagram</LinkHref>
            <LinkHref href="https://www.pinterest.com.au/0er9kbsq9bmwbsvhtawz6clyczq9rz">
              Pinterest
            </LinkHref>
          </Links>
        </Section>
      </Sections>
    </Container>
  </Wrapper>
);

export default Footer;
