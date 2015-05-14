var chai = require('chai')
  , assert = chai.assert
  , expect = chai.expect
  , should = chai.should();
var lib = require('../lib/index');

describe('Operators', function(){
  describe('Add valid', function(){
    it('should contain +', function(){
      lib.OPERATORS.indexOf('+').should.not.equal(-1);
    });
  });
  describe('Minus valid', function(){
    it('should contain -', function() {
      lib.OPERATORS.indexOf('-').should.not.equal(-1);
    });
  });
  describe('Multiply valid', function(){
    it('should contain *', function() {
      lib.OPERATORS.indexOf('*').should.not.equal(-1);
    });
  });
  describe('Divide valid', function(){
    it('should contain /', function() {
      lib.OPERATORS.indexOf('/').should.not.equal(-1);
    });
  });
});

describe('Parsing Query', function(){

  it('should return an array', function(){
    lib.parseQuery('1+2=').should.be.a('Array');
  });

  it('should return an array with length 3', function(){
    lib.parseQuery('1+2=').should.have.length(3);
  });

  it('should return 1 for the array[0] for 1+2=', function(){
    lib.parseQuery('1+2=')[0] === 1;
  });

  it('should return + for the array[1] for 1+2=', function(){
    lib.parseQuery('1+2=')[1] === '+';
  });

  it('should return 2 for the array[2] for 1+2=', function(){
    lib.parseQuery('1+2=')[2] === 2;
  });

  it('should return a number if the first number is a float', function(){
    lib.parseQuery('1.2+5=')[0] === 1.2;
  });

  it('should return a number if the second number is a float', function(){
    lib.parseQuery('5+1.2=')[0] === 1.2;
  });

  it('should return NULL if the first value is not an number', function(){
    lib.parseQuery('+2=') === null;
  });

  it('should return NULL if the operator is not valid', function(){
    lib.parseQuery('1)2=') === null;
  });

  it('should return NULL if the query is "alpha operator number equals"', function(){
    lib.parseQuery('a+2=') === null;
  });

  it('should return NULL if the query is "number operator alpha equals"', function(){
    lib.parseQuery('1+b=') === null;
  });

  it('should return NULL if the query is "symbol operator number equals"', function(){
    lib.parseQuery('_+2=') === null;
  });

});

describe('Calculations', function(){
  describe('Addition', function(){
    it('should add the integers together', function(){
      lib.calculate(1,2,'+') === 3;
    });

    it('should add an integer and float together', function(){
      lib.calculate(1,2.5,'+') === 3.5;
    });

    it('should add the floats together', function(){
      lib.calculate(1.5,2.5,'+') === 4;
    });
  });

  describe('Subtraction', function(){
    it('should subtract the integers', function(){
      lib.calculate(1,2,'-') === -1;
    });

    it('should subtract an integer and float', function(){
      lib.calculate(1,2.5,'+');
    });

    it('should subtract the floats', function(){
      lib.calculate(1.5,2.5,'+') === -1;
    });
  });

});