const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');
const path = require('path');


const port = process.env.PORT || 3000;


server.set('view engine', 'njk');
nunjucks.configure(path.join(__dirname,'app','views'), {
  express: server,
  autoescape: false,
  noCache: true,
});

server.use(express.urlencoded({extended:true}));
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(routes);


server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});