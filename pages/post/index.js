import React from 'react';
import styled from 'styled-components';
import Markdown from 'react-markdown';
import moment from 'moment';
import Disqus from 'disqus-react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import removeMd from 'remove-markdown';

import client from '../../constants/contentful-client';

import PostHeader from '../../components/PostHeader';

const Wrapper = styled.div`
  background: #FAFAFA;
  display: grid;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const Faded = styled.div`
  background: #FAFAFA;
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: ${({ on }) => on ? 1 : 0};
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
  position: fixed;
  margin-top: 4rem;
  align-items: flex-start;
  justify-content: flex-start;
  top: 100px;
  right: calc((100vw - 46rem) / 2 - 15rem);
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity 0.3s ease;
  z-index: 1;
  background: #F5F5F5;
  border-radius: 2px;
  overflow: hidden;
`;

const RatingsHeader = styled.header`
  background: #F5F5F5;
  width: 100%;
  padding: 0.25rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RatingTitle = styled.h4`
  color: rgba(0,0,0,0.8);
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
  transform: ${({ active }) => active ? 'rotate(180deg)' : 'none'};
  transition: transform 0.2s ease;

  &:hover, &:focus {
    background: rgba(0,0,0,0.025);
  }
`;

const RatingsContent = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({ open }) => open ? 'auto' : 0};
  transition: height 0.2s ease;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const RatingText = styled.p`
  color: rgba(0,0,0,0.8);
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
  background: ${({ filled }) => filled ? '#579EF5' : '#E0E0E0'};
`;

const Socials = styled.div`
  display: grid;
  grid-gap: 1rem;
  position: fixed;
  margin-top: 4rem;
  align-items: flex-start;
  justify-content: flex-start;
  top: 100px;
  left: calc((100vw - 46rem) / 2 - 5rem);
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity 0.3s ease;
  z-index: 1;
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
  font-size: 1.5em;
`;

const Title = styled.h1`
  color: #FFF;
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
    background: rgba(135,0,0,0.8);
    position: absolute;
    z-index: -1;
    padding: 0.5rem 2rem;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`;

const MetaText = styled.div`
  color: rgba(0,0,0,0.6);
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
  background: #E0E0E0;
  margin: 0 1rem;
`;

const Content = styled.div`
  h1, h2, h3, h4, h5, h6 {
    color: rgba(0,0,0,0.8);
    font-size: 1.875em;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
    line-height: 1.3em;
  }

  p, li {
    color: rgba(0,0,0,0.6);
    font-size: 1em;
    line-height: 1.8em;
    margin-bottom: 1.125rem;
    cursor: text;
  }

  a {
    color: #5C73ED;
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
      border-bottom: 1px dotted #8D9DF7;
      left: 0;
      right: 0;
    }

    &:hover, &:focus {
      background: #F2F2FF;
    }
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
    color: #FFF;
    line-height: 2em;
  }

  img {
    width: 100%;
    margin: 1.5rem 0;
    cursor: default;
  }

  table {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #F5F5F5;

    tr {
      display: grid;

      th, td {
        font-size: 0.875em;
        padding: 1rem;
        text-align: left;
      }

      th {
        font-weight: 600;
      }

      th:nth-child(even) {
        background: #EEE;
      }

      td:nth-child(even) {
        background: #EEE;
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
      color: rgba(0,0,0,0.6);
      font-size: 2em;
      letter-spacing: 0.6em;
      font-family: -apple-system, system-ui, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji', 'Segoe UI Symbol';
      margin-right: -12px;
    }
  }
`;

const CTA = styled.div`
  padding: 2rem;
  background: #EEE;
  margin: 4rem -2rem;
  border-radius: 2px;
  border-top: 3px solid #F95F5F;
  display: flex;
  flex-direction: column;
`;

const CTATitle = styled.h3`
  color: rgba(0,0,0,0.8);
  font-family: Raleway, sans-serif;
  font-size: 1.2em;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const CTAText = styled.p`
  color: rgba(0,0,0,0.6);
  font-size: 0.875em;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CTAButton = styled.a`
  border: 1px solid #BD0000;
  border-radius: 1.5rem;
  cursor: pointer;
  height: 3rem;
  background: transparent;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  font-size: 0.75em;
  color: #BD0000;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  padding: 1rem 0;
  text-align: center;
  text-decoration: none;

  &:hover, &:focus {
    background: #BD0000;
    color: #FFF;
  }
`;

const Newsletter = styled.div`
  background: #292F38;
  padding: 1.5rem;
  border-radius: 4px;
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  z-index: 3;
  box-shadow: 0 2px 10px 2px rgba(0,0,0,0.1);
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity 0.2s ease;
`;

const CloseButton = styled.button`
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  display: flex;
  padding: 0.5rem;
  outline: 0;
  transition: all 0.2s ease;
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;

  &:hover {
    background: rgba(255,255,255,0.05);
    transform: rotate(90deg);
  }
`;

const IconWhite = styled.i`
  font-size: 1.25em;
  color: #FFF;
`;

const NewsletterHeading = styled.h3`
  color: #FFF;
  font-weight: 600;
  font-family: -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1.25em;
  line-height: 1.3em;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const NewsletterText = styled.p`
  color: #FFF;
  font-family: Muli, -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  margin-bottom: 1rem;
  font-size: 0.875em;
  font-weight: 300;
`;

const NewsletterForm = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0.5rem;
  height: 2rem;
`;

const NewsletterFormInput = styled.input`
  background: #FFF;
  border: 0;
  border-radius: 4px;
  font-family: Muli, -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  outline: 0;
  padding: 0 0.75rem;

  ::placeholder {
    color: rgba(0,0,0,0.5);
  }
`;

const NewsletterFormButton = styled.button`
  background: #FFF;
  color: rgba(0,0,0,0.8);
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  outline: 0;
  font-family: -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-weight: 500;
  padding: 0 2rem;
`;

class Post extends React.Component {
  state = {
    window: {},
    error: '',
    dataLoading: true,
    imageLoading: true,
    post: {},
    scrollY: 0,
    // closedNewsletter: false,
    ratingOpen: false,
  };

  componentWillMount() {
    this.setState({ error: '', dataLoading: true });

    client.getEntries()
      .then((data) => {
        console.log(data);

        const posts = data.items.map(({ fields, sys }) => ({
          ...fields,
          id: sys.id,
          createdAt: sys.createdAt,
          contentType: sys.contentType.sys.id,
        }))
          .filter(({ contentType }) => contentType === 'post')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const post = posts.find(({ slug }) => slug === this.props.router.query.slug);

        console.log(post);

        this.setState({ error: '', dataLoading: false, post });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
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
    const { router } = this.props;
    const { post } = this.state;

    const disqusShortname = 'fountpens';
    const disqusConfig = {
      url: this.state.window.location && this.state.window.location.href || 'https://fountpens.com',
      identifier: post.id,
      title: post.name,
    };

    return (
      <Wrapper>
        <Head>
          <title>{post.name || router.query.slug.replace(/\b\w/g, l => l.toUpperCase()).replace(/-/g, ' ')} — FOUNT</title>
          <meta name="description" content={`${removeMd(post.content).substring(0, 152)}...`} />
        </Head>
        <Faded on={this.state.dataLoading || this.state.imageLoading} />
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
            <PostHeader
              show={this.state.scrollY > 400}
              heading={post.name}
              scrollProgress={(this.state.scrollY + this.state.window.innerHeight) / this.state.window.document.body.clientHeight}
            />
            <ImageWrapper>
              <Image
                src={post.image.fields.file.url}
                alt={post.image.fields.title}
                onLoad={() => this.setState({ imageLoading: false })}
              />
              <Title>{post.name}</Title>
            </ImageWrapper>
            <Container>
              <Ratings show={this.state.scrollY > 280}>
                <RatingsHeader>
                  <RatingTitle>Rating</RatingTitle>
                  <ExpansionButton
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
              </Ratings>
              {/* <Socials show={this.state.scrollY > 280}>
                <SocialButton title="Tweet to your followers">
                  <Icon className="socicon-twitter" />
                </SocialButton>
                <SocialButton title="Post to Facebook">
                  <Icon className="socicon-facebook" />
                </SocialButton>
              </Socials> */}
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
                  <CTAText>Using this link to purchase a pen supports us and motivates us to do better :)</CTAText>
                  <CTAButton href={post.affiliateLink} target="_blank">Buy a {post.penName}</CTAButton>
                </CTA>
              ) : ''}
              <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </Container>
          </React.Fragment>
        ) : ''}
      </Wrapper>
    );
  }
}

export default withRouter(Post);
