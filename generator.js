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
var QUERIES;
if (argv.queries) {
  QUERIES = argv.queries;
} else if (parseInt(argv._[0]) !== NaN) {
  QUERIES = parseInt(argv._[0]);
} else {
  QUERIES = 10;
}

// How often should the requests to the server be made? Default to 1 sec (1000 ms)
var DELAY;
if (argv.delay) {
  DELAY = argv.delay;
} else if (parseInt(argv._[1]) !== NaN) {
  DELAY = parseInt(argv._[1]);
} else {
  DELAY = 1000;
}

// Create an interval of requests to be sent to the server for calculation
var i = 0;
var calcLoop = setInterval(function(){
    sendRequest();
  }, DELAY);

function sendRequest() {
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

  var req = http.request({
    method: 'GET',
    host: HOST,
    port: PORT,
    path: '/'+query
  }, function logResponse(res){
    var data;
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('Response: ', res.statusCode, chunk);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.end();
  i++;

  if (i>QUERIES) {
    clearInterval(calcLoop);
    calcLoop = null;
  }
}
