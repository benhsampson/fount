import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import moment from 'moment';
import Slider from 'rc-slider';
import { withRouter } from 'next/router';

import client from '../../constants/contentful-client';

import Header from '../../components/Header';

import 'rc-slider/assets/index.css';

const Wrapper = styled.div`
  background: #fafafa;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;

const Faded = styled.div`
  background: #fafafa;
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: ${({ on }) => (on ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none;
  z-index: 9;
`;

const Section = styled.section`
  padding-top: 3.75rem;
`;

const Actions = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SortBy = styled.div`
  display: flex;

  .rc-slider {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (min-width: 768px) {
    align-items: center;
  }
`;

const SortByOptions = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const PriceRangeWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

const PriceRangeLabel = styled.p`
  font-size: 0.625em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.6);
`;

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const buttonStyles = selected => `
  flex: 0;
  background: ${selected ? '#F5F5F5' : 'transparent'};
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

  &:not(:last-child) {
    margin-right: 0.75rem;
  }
`;

const SortByOption = styled.button`
  ${({ selected }) => buttonStyles(selected)};
`;

const ArticleCategories = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const ArticleCategoryOption = styled.button`
  ${({ selected }) => buttonStyles(selected)};
`;

const Title = styled.h1`
  color: rgba(0, 0, 0, 0.9);
  font-size: 4em;
  font-family: Raleway, sans-serif;
  font-weight: 100;
  margin-bottom: 2rem;
  line-height: 1em;
`;

const Text = styled.h2`
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.2em;
  line-height: 1.6em;
  margin-bottom: 2rem;
`;

const Posts = styled.div`
  display: grid;
  grid-gap: 0.625rem;
  grid-auto-rows: 10px;
  max-width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  }
`;

const Post = styled.div`
  background: #f5f5f5;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    .overlay {
      opacity: 1;
    }
  }

  .cover {
    height: 100%;
    object-fit: cover;
  }
`;

const PostImage = styled.img`
  width: 100%;
`;

const PostOverlay = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    background: rgba(0, 0, 0, 0.6);
    padding: 1rem 0.5rem;
    bottom: 0;
  }

  @media (min-width: 768px) {
    background: rgba(0, 0, 0, 0.4);
    height: 100%;
    opacity: 0;
  }
`;

const PostTitle = styled.h3`
  color: #fff;
  font-family: Raleway, sans-serif;
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 0.75rem;
`;

const PostCategory = styled.h5`
  font-size: 0.875em;
  color: #fff;
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
`;

class Index extends React.Component {
  static async getInitialProps() {
    const response = await client.getEntries();

    const posts = response.items
      .map(({ fields, sys }) => ({
        ...fields,
        id: sys.id,
        createdAt: sys.createdAt,
        contentType: sys.contentType.sys.id
      }))
      .filter(({ contentType }) => contentType === 'post');

    const sortByOptions = [
      {
        id: '1',
        label: 'Recent'
      },
      {
        id: '2',
        label: 'Popular'
      }
    ];

    const articleCategoryOptions = [
      {
        id: '1',
        label: 'Reviews',
        contentType: 'post'
      },
      {
        id: '2',
        label: 'Guides',
        contentType: 'guide'
      }
    ];

    return {
      error: '',
      dataLoading: false,
      posts,
      sortByOptions,
      articleCategoryOptions
    };
  }

  state = {
    sortByOptionId: '1',
    articleCategoryOptionId: '1',
    price: {
      min: 10,
      max: 500
    }
  };

  componentDidMount() {
    const { posts } = this.props;

    if (posts.length > 0) {
      console.log('FINALLY RECEIVED PROPS');

      window.onload = this.resizeAllGridItems();

      window.addEventListener('resize', this.resizeAllGridItems);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeAllGridItems);
  }

  resizeAllGridItems = () => {
    const allItems = document.getElementsByClassName('item');
    for (let x = 0; x < allItems.length; x++) {
      this.resizeGridItem(allItems[x]);
    }
  };

  resizeGridItem = item => {
    const grid = document.getElementsByClassName('grid')[0];
    const rowWidth = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));

    console.log(rowWidth, rowGap);

    const rowSpan = Math.ceil(
      (item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowWidth + rowGap)
    );

    item.style.gridRowEnd = 'span ' + rowSpan;
    item.querySelector('.content').classList.add('cover');
  };

  render() {
    const {
      router,
      dataLoading,
      // error,
      posts
      // sortByOptions,
      // articleCategoryOptions,
    } = this.props;

    // TODO: Implement some kind of filter
    // const postsCorrectArticleType = posts.filter(({ contentType }) =>
    // contentType === articleCategoryOptions.find(({ id }) => id === this.state.articleCategoryOptionId).contentType);

    // const postsInPriceRange = posts.filter(({ price }) => price >= this.state.price.min && price <= this.state.price.max);

    // const sortedPosts = this.state.sortByOptionId === "1"
    //   ? posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    //   : posts.sort((a, b) => b.rating.fields.quality - a.rating.fields.quality);

    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
      <Wrapper>
        <Faded on={dataLoading} />
        <Header router={router} />
        <Section>
          <Posts className="grid">
            {!dataLoading &&
              sortedPosts &&
              sortedPosts.length > 0 &&
              sortedPosts.map(post => {
                const { id, name, slug, thumbnail, category } = post;

                const shortenedCategory = {
                  '7bOxiRpxPGoIGWgYKEusa6': 'Review',
                  '3rrr1DfOlqwk6YcSasesSo': 'List',
                  '46nUnkwNtJLKnHvgXxcYN': 'Article',
                  '7vTReFnUa7n0dOpZc0GAKw': 'Comparison Review'
                }[category.sys.id];

                return (
                  <Post key={id} className="item">
                    <Link href={`/p/${slug}`}>
                      <PostLink>
                        <PostOverlay className="overlay">
                          <PostTitle>{name}</PostTitle>
                          <PostCategory>
                            <B>{shortenedCategory}</B> ·{' '}
                            {moment(post.createdAt).format('MMM Do YY')}
                          </PostCategory>
                        </PostOverlay>
                        <PostImage
                          src={thumbnail.fields.file.url}
                          alt={thumbnail.fields.title}
                          className="content"
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

export default withRouter(Index);
