import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import moment from 'moment';

import client from '../../constants/contentful-client';

import Header from '../../components/Header';

const Wrapper = styled.div`
  background: #FAFAFA;
  display: grid;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;

  @media (min-width: 768px) {
    grid-template-columns: minmax(auto, 400px) 1fr;
    padding: 6rem 3rem;
  }

  @media (max-width: 768px) {
    padding-top: 6rem;
  }
`;

const Faded = styled.div`
  background: #FAFAFA;
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: ${({ on }) => on ? 1 : 0};
  transition: opacity 0.2s ease;
  pointer-events: none;
  z-index: 9;
`;

const Section = styled.section`
  padding: 3rem;
`;

const Title = styled.h1`
  color: rgba(0,0,0,0.9);
  font-size: 4em;
  font-family: Raleway, sans-serif;
  font-weight: 100;
  margin-bottom: 2rem;
  line-height: 1em;
`;

const Text = styled.p`
  color: rgba(0,0,0,0.6);
  font-size: 1.2em;
  line-height: 1.6em;
  margin-bottom: 2rem;
`;

const Socials = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  justify-content: flex-start;
  margin-left: -0.5rem;
`;

const SocialButton = styled.button`
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  display: flex;
  padding: 0.5rem;
  outline: 0;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0,0,0,0.05);
  }
`;

const Icon = styled.span`
  color: rgba(0,0,0,0.7);
  font-size: 1.25em;
`;

const Posts = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 1.5rem);
  overflow: hidden;
  margin: -0.75rem 0 -0.75rem -0.75rem;
`;

const Post = styled.div`
  background: #F5F5F5;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0.75rem;
  position: relative;
  overflow: hidden;

  &:hover {
    .overlay {
      opacity: 1;
    }
  }
`;

const PostImage = styled.img`
  width: auto;
  max-width: 100%;
  vertical-align: top;
  flex-grow: 1;
  flex-shrink: 1;
  object-fit: cover;
  object-position: center;
  height: auto;
  max-height: 17.5rem;
`;

const PostOverlay = styled.div`
  transition: opacity 0.3s ease;
  background: rgba(0,0,0,0.5);
  position: absolute;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    bottom: 0;
  }

  @media (min-width: 768px) {
    height: 100%;
    opacity: 0;
  }
`;

const PostTitle = styled.h3`
  color: #FFF;
  font-family: Raleway, sans-serif;
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 0.75rem;
`;

const PostCategory = styled.h5`
  font-size: 0.875em;
  color: #FFF;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const B = styled.b`
  font-weight: 700;
`;

const PostLink = styled.a`
  text-decoration: inherit;
  color: inherit;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
`;

class Index extends React.Component {
  state = {
    error: '',
    dataLoading: true,
    anImageLoading: true,
    posts: [],
  };

  componentWillMount() {
    this.setState({ error: '', dataLoading: true });

    client.getEntries()
      .then((data) => {
        const posts = data.items.map(({ fields, sys }) => ({
          ...fields,
          id: sys.id,
          createdAt: sys.createdAt,
          contentType: sys.contentType.sys.id,
        }))
          .filter(({ contentType }) => contentType === 'post')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        this.setState({ error: '', dataLoading: false, posts });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <Wrapper>
        <Faded on={this.state.dataLoading} />
        <Header />
        <Section>
          <Title>FOUNT</Title>
          {/* <SubTitle></SubTitle> */}
          <Text>For the novice or the seasoned collector, get helpful reviews of professional writing instruments.<br /><br />Find the best advice on high-end luxury fountain pens.</Text>
          {/* <Socials>
            <SocialButton>
              <Icon className="socicon-instagram" />
            </SocialButton>
            <SocialButton>
              <Icon className="socicon-twitter" />
            </SocialButton>
            <SocialButton>
              <Icon className="socicon-pinterest" />
            </SocialButton>
          </Socials> */}
        </Section>
        <Section>
          <Posts>
            {!this.state.dataLoading && this.state.posts.map((post) => {
              const { id, name, slug, thumbnail, category } = post;

              console.log(post);

              const shortenedCategory = {
                '7bOxiRpxPGoIGWgYKEusa6': 'Review',
                '3rrr1DfOlqwk6YcSasesSo': 'List',
              }[category.sys.id];

              return (
                <Post key={id}>
                  <Link href={`/p/${slug}`}>
                    <PostLink>
                      <PostOverlay className="overlay">
                        <PostTitle>{name}</PostTitle>
                        <PostCategory>
                          <B>{shortenedCategory}</B>
                          {' '}·{' '}
                          {moment(post.createdAt).format('MMM Do YY')}
                        </PostCategory>
                      </PostOverlay>
                      <PostImage
                        src={thumbnail.fields.file.url}
                        alt={thumbnail.fields.title}
                      />
                    </PostLink>
                  </Link>
                </Post>
              );
            })}
          </Posts>
        </Section>
      </Wrapper>
    );
  }
}

export default Index;
