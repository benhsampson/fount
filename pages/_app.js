import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import App, { Container } from 'next/app';

import Footer from '../components/Footer';

const GlobalStyle = createGlobalStyle`
  a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}

  @import url('https://fonts.googleapis.com/css?family=Muli:300,500,700');
  @import url('https://fonts.googleapis.com/css?family=Raleway:100,500');

  * {
    box-sizing: border-box;
    font-family: Muli, -apple-system, system-ui, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  html {
    font-size: 16px;
  }

  body {
    color: rgba(0,0,0,0.9);
    font-family: Muli, -apple-system, system-ui, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
    font-display: swap;
    font-style: normal;
    line-height: 1.5;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  #root, body, html {
    min-height: 100%;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  ::selection {
    background: #00113B;
    color: #FFF;
  }
`;

const Main = styled.div`
  background: #fafafa;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 3.75rem;
  }
`;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
        <GlobalStyle />
      </Container>
    );
  }
}

export default MyApp;
