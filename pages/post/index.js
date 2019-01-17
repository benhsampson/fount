import React from 'react';
import styled from 'styled-components';
import Markdown from 'react-markdown';
import moment from 'moment';
import Disqus from 'disqus-react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import removeMd from 'remove-markdown';
import sbd from 'sbd';
import { TwitterShareButton, FacebookShareButton } from 'react-share';

import client from '../../constants/contentful-client';

import Error from '../_error';

import Header from '../../components/Header';
import PostHeader from '../../components/PostHeader';

const Wrapper = styled.div`
  background: #fafafa;
  display: grid;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const Faded = styled.div`
  background: #fafafa;
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: ${({ on }) => (on ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none;
  z-index: 99;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  max-height: 400px;
`;

const Image = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  position: relative;
`;

const Container = styled.div`
  max-width: 46rem;
  padding: 7rem 1.5rem 6rem;
  margin: 0 auto;
  width: 100%;
  position: relative;
`;

const Ratings = styled.div`
  display: grid;
  align-items: flex-start;
  justify-content: flex-start;
  top: 100px;
  transition: opacity 0.3s ease;
  z-index: 1;
  border-radius: 2px;

  @media (min-width: 768px) {
    position: fixed;
    margin-top: 4rem;
    opacity: ${({ show }) => (show ? 1 : 0)};
    max-width: 13rem;
    right: calc((100vw - 46rem) / 2 - 17rem);
  }
`;

const RatingsHeader = styled.header`
  @media (max-width: 768px) {
    display: none;
  }

  @media (min-width: 768px) {
    background: #f5f5f5;
    width: 100%;
    padding: 0.25rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const RatingTitle = styled.h4`
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.75em;
  text-transform: uppercase;
  font-family: Raleway, sans-serif;
  letter-spacing: 1px;
  text-align: center;
`;

const ExpansionButton = styled.button`
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  display: flex;
  padding: 0.5rem;
  outline: 0;
  transition: background 0.2s ease;
  margin-right: -0.5rem;
  transform: ${({ active }) => (active ? 'rotate(180deg)' : 'none')};
  transition: transform 0.2s ease;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.025);
  }
`;

const RatingsContent = styled.div`
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  transition: height 0.2s ease;

  @media (min-width: 768px) {
    height: ${({ open }) => (open ? 'auto' : 0)};
    opacity: ${({ open }) => (open ? 1 : 0)};
  }
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const RatingText = styled.p`
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.75em;
  text-transform: uppercase;
  font-family: Raleway, sans-serif;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  text-align: center;
`;

const Bars = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(30px, 1fr));
  grid-gap: 4px;
`;

const Bar = styled.div`
  height: 3px;
  background: ${({ filled }) => (filled ? '#579EF5' : '#E0E0E0')};
`;

const Socials = styled.div`
  display: grid;
  position: fixed;
  margin-top: 4rem;
  align-items: flex-start;
  justify-content: flex-start;
  transition: opacity 0.3s ease;
  z-index: 1;

  @media (max-width: 768px) {
    background: #fff;
    padding: 0.25rem;
    bottom: 8px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    left: 0;
    border-radius: 0 2px 2px 0;
    grid-gap: 0.5rem;
  }

  @media (min-width: 768px) {
    background: #fafafa;
    top: 100px;
    left: calc((100vw - 46rem) / 2 - 7rem);
    opacity: ${({ show }) => (show ? 1 : 0)};
    grid-gap: 1rem;
    border-radius: 1.25rem;
  }
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
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Icon = styled.span`
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.5em;
`;

const Title = styled.h1`
  color: #fff;
  font-family: Raleway, sans-serif;
  font-weight: 200;
  text-align: center;
  font-size: 2em;
  margin-bottom: 0;
  line-height: 1.3em;
  z-index: 3;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    background: rgba(135, 0, 0, 0.8);
    position: absolute;
    z-index: -1;
    padding: 0.5rem 2rem;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`;

const MetaText = styled.div`
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.75em;
  margin-bottom: 1.5rem;
  display: flex;
`;

const Category = styled.span`
  font-weight: 900;
`;

const Seperator = styled.span`
  height: auto;
  width: 1px;
  background: #e0e0e0;
  margin: 0 1rem;
`;

const Content = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: rgba(0, 0, 0, 0.8);
    font-size: 1.875em;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
    line-height: 1.3em;
  }

  i {
    font-style: italic;
  }

  p {
    margin-bottom: 1.125rem;
  }

  li {
    margin-bottom: 0.75rem;
  }

  p,
  li {
    color: rgba(0, 0, 0, 0.6);
    font-size: 1em;
    line-height: 1.8em;
    cursor: text;
  }

  ul {
    list-style-type: disc;
    margin-bottom: 1.125rem;
  }

  ol {
    list-style-type: decimal;
    margin-bottom: 1.125rem;
  }

  a {
    color: #5c73ed;
    text-decoration: none;
    transition: background 0.2s ease;
    font-weight: 500;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      width: 100%;
      height: 1px;
      border-bottom: 1px dotted #8d9df7;
      left: 0;
      right: 0;
    }

    &:hover,
    &:focus {
      background: #f2f2ff;
    }
  }

  b,
  strong {
    font-weight: 600;
  }

  blockquote {
    font-size: 1.2em;
    line-height: 1.5em;
    padding: 1.125rem 2.5rem;
    font-style: italic;
    font-family: serif;
  }

  pre {
    background: #222;
    border-radius: 2px;
    padding: 1rem 1.5rem;
    margin-bottom: 1.125rem;
  }

  code {
    font-family: monospace;
    color: #fff;
    line-height: 2em;
  }

  img {
    width: 100%;
    margin: 1.5rem 0;
    cursor: default;
  }

  table {
    background: #f5f5f5;
    margin: 0 -9rem;

    tr {
      th,
      td {
        font-size: 0.875em;
        padding: 1rem;
        text-align: left;
        max-height: 3.3125rem;
        overflow: auto;
      }

      th {
        font-weight: 600;
      }

      th:nth-child(even) {
        background: #eee;
      }

      td:nth-child(even) {
        background: #eee;
      }
    }
  }

  hr {
    border: 0;
    margin: 0;
    height: 4rem;
    margin-bottom: 1.25rem;
    text-align: center;

    &:after {
      text-align: center;
      content: '...';
      color: rgba(0, 0, 0, 0.6);
      font-size: 2em;
      letter-spacing: 0.6em;
      font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji', 'Segoe UI Symbol';
      margin-right: -12px;
    }
  }
`;

const CTA = styled.div`
  padding: 2rem;
  background: #eee;
  margin: 4rem -2rem;
  border-radius: 2px;
  border-top: 3px solid #f95f5f;
  display: flex;
  flex-direction: column;
`;

const CTATitle = styled.h3`
  color: rgba(0, 0, 0, 0.8);
  font-family: Raleway, sans-serif;
  font-size: 1.2em;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const CTAText = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875em;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CTAButton = styled.a`
  border: 1px solid #bd0000;
  border-radius: 1.5rem;
  cursor: pointer;
  height: 3rem;
  background: transparent;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  font-size: 0.75em;
  color: #bd0000;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  padding: 1rem 0;
  text-align: center;
  text-decoration: none;

  &:hover,
  &:focus {
    background: #bd0000;
    color: #fff;
  }
`;

const NewsletterBox = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const NewsletterPitch = styled.p`
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.125em;
    text-align: center;
  }

  @media (min-width: 768px) {
    font-size: 0.875em;
  }
`;

const NewsletterButton = styled.button`
  color: #444;
  padding: 0.75rem 1.25rem;
  border: 1px solid #666;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  z-index: -1;

  @media (max-width: 768px) {
    font-size: 1.125em;
  }

  @media (min-width: 768px) {
    font-size: 0.875em;
  }
`;

const UnstyledA = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

const CTASidebar = styled.div`
  /* TODO: don't display on mobile */

  @media (max-width: 768px) {
    display: none;
  }

  @media (min-width: 768px) {
    padding: 1rem;
    background: #eee;
    border-radius: 2px;
    border-top: 3px solid #f95f5f;
    display: flex;
    flex-direction: column;
    margin: 2rem -1rem -1rem;
  }
`;

class Post extends React.Component {
  static async getInitialProps(context) {
    const response = await client.getEntries();

    const posts = response.items
      .map(({ fields, sys }) => {
        const sentences = sbd.sentences(removeMd(fields.content));
        return {
          ...fields,
          id: sys.id,
          createdAt: sys.createdAt,
          contentType: sys.contentType.sys.id,
          shortened: `${sentences[0]}${sentences[1]}`.replace(/\r?\n|\r/g, '').replace(/  /g, ' ')
        };
      })
      .filter(({ contentType }) => contentType === 'post' || contentType === 'editorial')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const post = posts.find(({ slug }) => slug === context.query.slug);

    return { error: '', dataLoading: false, post, existingPost: !!post };
  }

  state = {
    window: {},
    imageLoading: true,
    scrollY: 0,
    ratingOpen: true
  };

  componentDidMount() {
    console.log(this.props.router);

    if (typeof window !== 'undefined') {
      this.setState({ window });

      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (typeof this.state.window !== 'undefined') {
      this.state.window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = () => {
    this.setState({ scrollY: this.state.window.scrollY });
  };

  render() {
    const { router, dataLoading, post, existingPost } = this.props;

    const disqusShortname = 'fountpens';
    const disqusConfig = existingPost
      ? {
          url:
            (this.state.window.location && this.state.window.location.href) ||
            'https://fountpens.com',
          identifier: post.id,
          title: post.name
        }
      : {};

    {
      /* TODO: The content type is never "review" */
    }
    const isReview = existingPost ? post.contentType === 'review' : false;

    const title =
      post.name || router.query.slug.replace(/\b\w/g, l => l.toUpperCase()).replace(/-/g, ' ');

    const socialImage = post.image
      ? `http://res.cloudinary.com/demo/image/fetch/w_1024,h_512,c_crop/https://${
          post.image.fields.file.url
        }`
      : 'https://cdn.pixabay.com/photo/2017/03/02/15/12/letters-2111531_960_720.jpg';

    return existingPost ? (
      <Wrapper>
        <Head>
          <title>{title} — FOUNT</title>
          <meta name="description" content={post.shortened} />

          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={post.shortened} />
          <meta name="twitter:image" content={socialImage} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={post.shortened} />
          <meta property="og:url" content="https://fountpens.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={socialImage} />
        </Head>
        <Faded on={dataLoading} />
        {/* <Newsletter show={this.state.scrollY > 800 && !this.state.closedNewsletter}>
          <CloseButton onClick={() => this.setState({ closedNewsletter: true })}>
            <IconWhite className="material-icons">close</IconWhite>
          </CloseButton>
          <NewsletterHeading>Join Our Newsletter</NewsletterHeading>
          <NewsletterText>Get the latest reviews and pen lists delivered right to your inbox.</NewsletterText>
          <NewsletterForm>
            <NewsletterFormInput placeholder="Email address..." />
            <NewsletterFormButton>Subscribe</NewsletterFormButton>
          </NewsletterForm>
        </Newsletter> */}
        {post && post.id ? (
          <React.Fragment>
            {/* NEWSLETTER */}
            <script
              async
              data-uid="0a20fd51cd"
              src="https://f.convertkit.com/0a20fd51cd/cf9f0df5f3.js"
            />
            <PostHeader
              show={post.image ? this.state.scrollY > 400 : true}
              heading={post.name}
              scrollProgress={
                (this.state.scrollY + this.state.window.innerHeight) / this.state.window &&
                this.state.window.document.body.clientHeight
              }
            />
            {post && post.image ? (
              <ImageWrapper>
                <Image
                  src={post.image.fields.file.url}
                  alt={post.image.fields.title}
                  onLoad={() => this.setState({ imageLoading: false })}
                />
                <Title>{post.name}</Title>
              </ImageWrapper>
            ) : (
              ''
            )}
            <Container>
              <MetaText>
                <Category>{post.category.fields.name}</Category>
                <Seperator />
                {moment(post.createdAt).format('MMM Do YY')}
                <Seperator />
                <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
                  Comments
                </Disqus.CommentCount>
              </MetaText>
              <Content>
                <Markdown source={post.content} />
              </Content>
              {post && post.penName && post.affiliateLink ? (
                <CTA>
                  <CTATitle>Like what you see?</CTATitle>
                  <CTAText>
                    Using this link to purchase a pen supports the reviewer and FOUNT :)
                  </CTAText>
                  <CTAButton href={post.affiliateLink} target="_blank">
                    Buy a {post.penName}
                  </CTAButton>
                </CTA>
              ) : (
                ''
              )}
              {post && post.rating ? (
                <Ratings show={this.state.scrollY > 280}>
                  <RatingsHeader>
                    <RatingTitle>Rating</RatingTitle>
                    <ExpansionButton
                      title="See our quality and value ratings"
                      active={this.state.ratingOpen}
                      onClick={() => this.setState({ ratingOpen: !this.state.ratingOpen })}
                    >
                      <Icon className="material-icons">expand_more</Icon>
                    </ExpansionButton>
                  </RatingsHeader>
                  <RatingsContent open={this.state.ratingOpen}>
                    <Rating>
                      <RatingText>Value</RatingText>
                      <Bars>
                        {[...Array(post.rating.fields.value)].map((x, number) => (
                          <Bar filled key={number} />
                        ))}
                        {[...Array(5 - post.rating.fields.value)].map((x, number) => (
                          <Bar key={number} />
                        ))}
                      </Bars>
                    </Rating>
                    <Rating>
                      <RatingText>Quality</RatingText>
                      <Bars>
                        {[...Array(post.rating.fields.quality)].map((x, number) => (
                          <Bar filled key={number} />
                        ))}
                        {[...Array(5 - post.rating.fields.quality)].map((x, number) => (
                          <Bar key={number} />
                        ))}
                      </Bars>
                    </Rating>
                  </RatingsContent>
                  <CTASidebar>
                    <CTAText>Want this? Using this link to buy supports the reviewer.</CTAText>
                    <CTAButton href={post.affiliateLink} target="_blank">
                      Buy a {post.penName}
                    </CTAButton>
                  </CTASidebar>
                  <NewsletterBox>
                    <NewsletterPitch>
                      Want to the most helpful reviews in your inbox every week?
                    </NewsletterPitch>
                    <UnstyledA
                      data-formkit-toggle="0a20fd51cd"
                      href="https://pages.convertkit.com/0a20fd51cd/cf9f0df5f3"
                    >
                      <NewsletterButton>Sign up</NewsletterButton>
                    </UnstyledA>
                  </NewsletterBox>
                </Ratings>
              ) : (
                ''
              )}
              <Socials show={this.state.scrollY > 280}>
                <TwitterShareButton
                  title={post.name}
                  url={
                    (this.state.window.location && this.state.window.location.href) ||
                    'https://fountpens.com'
                  }
                >
                  <SocialButton title="Tweet to your followers">
                    <Icon className="socicon-twitter" />
                  </SocialButton>
                </TwitterShareButton>
                <FacebookShareButton
                  quote={post.name}
                  url={
                    (this.state.window.location && this.state.window.location.href) ||
                    'https://fountpens.com'
                  }
                >
                  <SocialButton title="Post to your friends">
                    <Icon className="socicon-facebook" />
                  </SocialButton>
                </FacebookShareButton>
              </Socials>
              <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </Container>
          </React.Fragment>
        ) : (
          ''
        )}
      </Wrapper>
    ) : (
      <Error />
    );
  }
}

export default withRouter(Post);
