const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const routes = require('./routes');

server.use(express.static('public'));

//Template engine
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});
server.use(routes);
server.listen(3000);
