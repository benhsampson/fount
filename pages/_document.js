import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();

    return {
      ...page,
      styleTags,
    };
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#405DCF" />
          <meta name="theme-color" content="#151515" />

          <title>FOUNT — Reviews of Luxury Writing Instruments</title>
          <meta name="description" content="Fountain pens are an expensive addiction. FOUNT is your #1 destination for expert reviews on the latest fountain pens." />

          <link rel="stylesheet" href="https://d1azc1qln24ryf.cloudfront.net/114779/Socicon/style-cf.css?9ukd8d" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* DRIFT */}
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
            "use strict";

            !function() {
              var t = window.driftt = window.drift = window.driftt || [];
              if (!t.init) {
                if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
                t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
                t.factory = function(e) {
                  return function() {
                    var n = Array.prototype.slice.call(arguments);
                    return n.unshift(e), t.push(n), t;
                  };
                }, t.methods.forEach(function(e) {
                  t[e] = t.factory(e);
                }), t.load = function(t) {
                  var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
                  o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
                  var i = document.getElementsByTagName("script")[0];
                  i.parentNode.insertBefore(o, i);
                };
              }
            }();

            drift.SNIPPET_VERSION = '0.3.1';
            drift.load('6kz9xma6ds4d');
          `}} />
          {/* END DRIFT */}
        </body>
      </html>
    );
  }
}

export default MyDocument;
