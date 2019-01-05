import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

const Wrapper = styled.footer`
    background: #EEE;
    
    @media (min-width: 768px) {
        padding: 6rem;
    }
    
    @media (max-width: 768px) {
        padding: 3rem;
    }
`;

const Container = styled.div`
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
`;

const Sections = styled.div`
    display: grid;
    
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 3rem;
    }
    
    @media (max-width: 768px) {
        grid-gap: 1.5rem;
    }
`;

const Section = styled.div`
      display: flex;
      flex-direction: colum;n
`;

const Heading = styled.h6`
    font-size: 1.25em;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const Links = styled.ul`
      display: flex;
      flex-direction: column;
`;

const LinkItem = styled.li`
    &:not(first-child) {
        margin-bottom: .75rem;
    }
`;

const Link = ({ children, ...props }) => (
    <NextLink {...props}>
        <LinkItem>{children}</LinkItem>
    </NextLink>
);

const Footer = () => (
    <Wrapper>
        <Container>
            <Sections>
                <Section>
                    <Heading>Addicts</Heading>
                    <Links>
                        <Link>About</Link>
                        <Link>The FOUNT Difference</Link>
                        <Link>Fountain Pens 101</Link>
                        <Link>Terms</Link>
                    </Links>
                    <Heading>Reviewers</Heading>
                    <Links>
                        <Link>Submit a review</Link>
                        <Link>Editorial guidelines</Link>
                    </Links>
                </Section>
            </Sections>
        </Container>
    </Wrapper>
);

export default Footer;
