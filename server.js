const express = require('express');
const next = require('next');
const path = require('path');
const favicon = require('serve-favicon');

const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

app.prepare()
  .then(() => {
    const server = express();
    server.use(handler);

    // server.use(favicon(path.join(__dirname, 'static', 'brand', 'favicon.png')));

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
