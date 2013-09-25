'use strict';

var express = require('express');

var app = express();


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

var auth =  express.basicAuth(function(user, pass){
  return 'admin' === user && '12345678' === pass;
});

app.get('/', auth, function (req, res)
{
  if (!res.getHeader('Cache-Control')){ 
    res.setHeader('Cache-Control', 'public, max-age=' + (0));
    res.render(__dirname + '/dist/index.html');
  }
});

app.use(express.static(__dirname + '/dist', {maxAge: 0}));

app.listen(process.env.PORT || 5000);