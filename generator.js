// This script is a generator of requests to the server asking simple math questsions
// via a query param, similar to entering a math question into Google's search box
var http = require('http');
var argv = require('minimist')(process.argv.slice(2));
var lib = require('./lib');

var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 3000;

var OPERATORS = lib.OPERATORS;

// Capped the upper limit for the random number to 100, but this number could be any valid float
var LOWER_LIMIT = process.env.LOWER_LIMIT || 0;
var UPPER_LIMIT = process.env.UPPER_LIMIT || 100;

// For human readability, the user can restrict the math queries to integers only
var INTS_ONLY = process.env.INTS_ONLY || false;

// How many queries should we run against the server? Default to just 1
var queries = 1;
if (argv.queries) {
  queries = argv.queries;
} else if (parseInt(argv._[0]) !== NaN) {
  queries = parseInt(argv._[0]);
}

// How often should the requests to the server be made? Default to 1/second (1000 ms)
var delay = 1000;
if (argv.delay) {
  delay = argv.delay;
} else if (parseInt(argv._[1]) !== NaN) {
  delay = parseInt(argv._[1]);
}

// Create a loop of requests to be sent to the server for calculation
for (var i=0; i<queries; i++) {
  var firstDigit, secondDigit, operator;

  // Rounded the digits for readability, since Math.random() returns a large number of decimals
  firstDigit = INTS_ONLY ?
                lib.getRandomInt(LOWER_LIMIT, UPPER_LIMIT) :
                lib.getRandomArbitrary(LOWER_LIMIT, UPPER_LIMIT).toFixed(2);
  secondDigit = INTS_ONLY ?
                  lib.getRandomInt(LOWER_LIMIT, UPPER_LIMIT) :
                  lib.getRandomArbitrary(LOWER_LIMIT, UPPER_LIMIT).toFixed(2);
  operator = OPERATORS[lib.getRandomInt(0,3)];

  query = '?q=' + encodeURIComponent(firstDigit + operator + secondDigit + '=');
  console.log('query', query);

  var req = http.request({
    method: 'GET',
    host: HOST,
    port: PORT,
    path: '/'+query
  }, function logResponse(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.end();
}

