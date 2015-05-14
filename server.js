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
  var url_parts = url.parse(req.url);
  var params = qs.parse(url_parts.query);
  console.log('parts', url_parts);
  console.log('params', params);

  res.end('Hello from Connect!\n' + JSON.stringify(params));
});

var server = http.createServer(app);

server.listen(PORT);
console.log('Server listening on port:', PORT);