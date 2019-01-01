import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.header`
  background: #333;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity 0.2s ease;
  z-index: 10;
  display: grid;
  grid-gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProgressBar = styled.div`
  background: #E0E0E0;
  width: ${({ progress }) => `${progress * 100}%`};
  height: 4px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const NavLink = styled.a`
  color: inherit;
  text-decoration: inherit;
  display: flex;

  @media (max-width: 768px) {
    justify-content: center;
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Brand = styled.h2`
  color: #FFF;
  cursor: pointer;
  font-family: Raleway, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1em;
  display: flex;
  position: relative;

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    bottom: -3px;
    border-bottom: 0.5px solid #FFF;
    width: 0;
    left: 0;
    transition: width 0.2s ease;
    position: absolute;
  }

  &:hover {
    &:after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-weight: 500;
    font-size: 1em;
    text-align: center;
  }

  @media (min-width: 768px) {
    font-weight: 300;
    font-size: 1.375em;
    grid-column-start: 1;
  }
`;

const Heading = styled.h1`
  color: #FFF;
  font-family: Raleway, sans-serif;
  font-weight: 300;
  font-size: 1.5em;
  text-align: center;
  line-height: 1em;

  @media (min-width: 768px) {
    grid-column-start: 2;
  }
`;

class PostHeader extends React.Component {
  render() {
    const {
      show,
      heading,
      scrollProgress,
    } = this.props;
    return (
      <Wrapper show={show}>
        <ProgressBar progress={scrollProgress} />
        <Link href="/"><NavLink><Brand>Fount</Brand></NavLink></Link>
        <Heading>{heading}</Heading>
      </Wrapper>
    );
  }
}

export default PostHeader;
