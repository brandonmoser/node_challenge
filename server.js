// This script is a simple HTTP server which responds to simple arthmatic questions,
// like '2+1=', '3-2=', '5*3=', and '4/2='
// It accepts any type of Float number and errors on common bad requests, like
// Divide-by-zero and invalid operators
var util = require('util');
var http = require('http');
var connect = require('connect');
var qs = require('qs');
var url = require('url');
var lib = require('./lib')

var PORT = process.env.PORT || 3000;

var app = connect();

app.use(function(req, res){
  var result = {};

  var url_parts = url.parse(decodeURIComponent(req.url));
  var params = qs.parse(url_parts.query);
  var parsed = lib.parseQuery(params.q);
  if (!parsed){
    result.error = 'Invalid request'
    res.statusCode = 400;
    lib.logger('Request: ' + JSON.stringify(result));
    res.end(JSON.stringify(result));
    return;
  }

  result.problem = params.q;

  if (result.problem.indexOf(' ') > -1) result.problem = result.problem.replace(' ', '+');
  try {
    result.answer = lib.calculate(parsed[0], parsed[2], parsed[1]);
  } catch(e){
    result.error = e.message;
    res.statusCode = 400;
    lib.logger('Request: ' + JSON.stringify(result));
    res.end(JSON.stringify(result));
    return;
  }

  lib.logger('Request: ' + JSON.stringify(result));

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
});

var server = http.createServer(app);

server.listen(PORT);
console.log('Server listening on port:', PORT);