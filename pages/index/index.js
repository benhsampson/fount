import React from 'react';
import styled, { css } from 'styled-components';
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

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SortBy = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
  justify-content: flex-start;
`;

const buttonStyles = (selected) => `
  background: ${selected ? "#F5F5F5" : "transparent"};
  border-radius: 0;
  border: 0;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  font-weight: 600;
  height: 2rem;
  border-radius: 1rem;
  min-width: 6rem;
  outline: none;
  width: 100%;

  &:hover, &:focus {
    background: #F5F5F5;
  }
`;

const SortByOption = styled.button`
  ${({ selected }) => buttonStyles(selected)};
`;

const ArticleCategories = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
  justify-content: flex-end;
`;

const ArticleCategoryOption = styled.button`
  ${({ selected }) => buttonStyles(selected)};
`;

const Title = styled.h1`
  color: rgba(0,0,0,0.9);
  font-size: 4em;
  font-family: Raleway, sans-serif;
  font-weight: 100;
  margin-bottom: 2rem;
  line-height: 1em;
`;

const Text = styled.h2`
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
  margin-left: -0.75rem;
`;

const UnstyledLink = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

const SocialButton = styled.button`
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  display: flex;
  padding: 0.75rem;
  outline: 0;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0,0,0,0.05);
  }
`;

const Icon = styled.span`
  color: rgba(0,0,0,0.6);
  font-size: 1.5em;
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
  static async getInitialProps() {
    const response = await client.getEntries();

    console.log(response);

    const posts = response.items.map(({ fields, sys }) => ({
      ...fields,
      id: sys.id,
      createdAt: sys.createdAt,
      contentType: sys.contentType.sys.id,
    }))
      .filter(({ contentType }) => contentType === 'post')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const sortByOptions = [
      {
        id: '1',
        label: 'Recent',
        selected: true,
      },
      {
        id: '2',
        label: 'Popular',
        selected: false,
      },
      {
        id: '3',
        label: '$ Any price',
        selected: false,
      },
    ];

    const articleCategoryOptions = [
      {
        id: '3',
        label: 'Reviews',
        selected: true,
      },
      {
        id: '4',
        label: 'Guides',
        selected: false,
      },
    ];
    
    return {
      error: '',
      dataLoading: false,
      posts,
      sortByOptions,
      articleCategoryOptions,
    }; 
  }

  render() {
    const {
      dataLoading,
      error,
      posts,
      sortByOptions,
      articleCategoryOptions,
    } = this.props;
    return <Wrapper>
        <Faded on={dataLoading} />
        <Header />
        <Section>
          <Title>FOUNT</Title>
          <Text>
            For the novice or the seasoned collector, get helpful reviews of professional writing instruments.
            <br />
            <br />
            Find the best advice on high-end luxury fountain pens.
          </Text>
          <Socials>
            {/* TODO: this */}
            <UnstyledLink href="https://www.instagram.com/fountpens">
              <SocialButton color="red">
                <Icon className="socicon-instagram icon" />
              </SocialButton>
            </UnstyledLink>
            {/* TODO: this */}
            <UnstyledLink href="https://www.pinterest.com.au/0er9kbsq9bmwbsvhtawz6clyczq9rz">
              <SocialButton color="orange">
                <Icon className="socicon-pinterest icon" />
              </SocialButton>
            </UnstyledLink>
          </Socials>
        </Section>
        <Section>
          {/* <Actions>
            <SortBy>
              {sortByOptions.map(({ id, label, selected }) => (
                <SortByOption key={id} selected={selected}>
                  {label}
                </SortByOption>
              ))}
            </SortBy>
            <ArticleCategories>
              {articleCategoryOptions.map(({ id, label, selected }) => (
                <ArticleCategoryOption key={id} selected={selected}>
                  {label}
                </ArticleCategoryOption>
              ))}
            </ArticleCategories>
          </Actions> */}
          <Posts>
            {!dataLoading && posts && posts.length > 0 && posts.map(
                post => {
                  const { id, name, slug, thumbnail, category } = post;

                  console.log(post);

                  const shortenedCategory = {
                    "7bOxiRpxPGoIGWgYKEusa6": "Review",
                    "3rrr1DfOlqwk6YcSasesSo": "List"
                  }[category.sys.id];

                  return (
                    <Post key={id}>
                      <Link href={`/p/${slug}`}>
                        <PostLink>
                          <PostOverlay className="overlay">
                            <PostTitle>{name}</PostTitle>
                            <PostCategory>
                              <B>{shortenedCategory}</B> ·{" "}
                              {moment(post.createdAt).format("MMM Do YY")}
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
                }
              )}
          </Posts>
        </Section>
      </Wrapper>;
  }
}

export default Index;
