// This library will parse the query, calculate the response and log the responses in a custom format
var functions = {};

functions.OPERATORS = ['+','-','*','/'];

functions.parseQuery = function(qp){
  var regex = /^(\d{1,}\.*\d*)([\+\-\*\/]{1})(\d{1,}\.*\d*)\=$/;
  return qp.match(regex).split(1);
};

functions.calculate = function(first,second,operator){
  first = parseFloat(first);
  second = parseFloat(second);

  if (operator == '/' && second == 0) {
    throw new Error("Cannot divide by zero!")
  }

  switch (operator) {
    case '+':
      return first + second;
      break;
    case '-':
      return first - second;
      break;
    case '*':
      return first * second;
      break;
    case '/':
      return first / second;
      break;
    default:
      throw new Error("Invalid operator");
  }
};

functions.logger = function(msg){
  console.log(new Date().toISOString(), msg);
}

// From MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
// Returns a random number between min (inclusive) and max (exclusive)
functions.getRandomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
};

// Returns a random integer between min (included) and max (excluded)
functions.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = functions;
