const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  // useFileSystemPublicRoutes: false,
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
  exportPathMap: function (defaultPathMap) {
    return {
      '/': { page: '/' },
      '/p/:slug': ({ slug }) => ({ page: '/post', query: { slug } }),
    };
  },
});
