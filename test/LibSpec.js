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
    lib.parseQuery('1+2=')[0].should.equal('1');
  });

  it('should return + for the array[1] for 1+2=', function(){
    lib.parseQuery('1+2=')[1].should.equal('+');
  });

  it('should return 2 for the array[2] for 1+2=', function(){
    lib.parseQuery('1+2=')[2].should.equal('2');
  });

  it('should return a number if the first number is a float', function(){
    lib.parseQuery('1.2+5=')[0].should.equal('1.2');
  });

  it('should return a number if the second number is a float', function(){
    lib.parseQuery('5+1.2=')[2].should.equal('1.2');
  });

  it('should return NULL if the first value is not an number', function(){
    should.not.exist(lib.parseQuery('+2='));
  });

  it('should return NULL if the operator is not valid', function(){
    should.not.exist(lib.parseQuery('1)2='));
  });

  it('should return NULL if the query is "alpha operator number equals"', function(){
    should.not.exist(lib.parseQuery('a+2='));
  });

  it('should return NULL if the query is "number operator alpha equals"', function(){
    should.not.exist(lib.parseQuery('1+b='));
  });

  it('should return NULL if the query is "symbol operator number equals"', function(){
    should.not.exist(lib.parseQuery('_+2='));
  });

});

describe('Calculations', function(){
  describe('Bad Operator', function(){
    it('should throw an error if an invalid operator is sent', function(){
      expect(function() { lib.calculate('5','1',')'); }).to.throw('Invalid operator');
    });
  });

  describe('Addition', function(){
    it('should add the integers together', function(){
      lib.calculate('1','2','+').should.equal(3);
    });

    it('should add an integer and float together', function(){
      lib.calculate('1','2.5','+').should.equal(3.5);
    });

    it('should add the floats together', function(){
      lib.calculate('1.5','2.5','+').should.equal(4);
    });
  });

  describe('Subtraction', function(){
    it('should subtract the integers', function(){
      lib.calculate('1','2','-').should.equal(-1);
    });

    it('should subtract an integer and float', function(){
      lib.calculate('1','2.5','-').should.equal(-1.5);
    });

    it('should subtract the floats', function(){
      lib.calculate('2.5','1.5','-').should.equal(1);
    });
  });

  describe('Multiplication', function(){
    it('should multiply the integers', function(){
      lib.calculate('1','2','*').should.equal(2);
    });

    it('should multiply an integer and float', function(){
      lib.calculate('2','2.5','*').should.equal(5);
    });

    it('should multiply the floats', function(){
      lib.calculate('2.5','1.5','*').should.equal(3.75);
    });
  });


  describe('Division', function(){
    it('should divide the integers', function(){
      lib.calculate('1','2','/').should.equal(0.5);
    });

    it('should divide an integer and float', function(){
      lib.calculate('3.75','2.5','/').should.equal(1.5);
    });

    it('should divide the floats', function(){
      lib.calculate('6.75','1.5','/').should.equal(4.5);
    });

    it('should error if divide-by-zero', function(){
      expect(function() { lib.calculate('5','0','/'); }).to.throw('Cannot divide by zero!');
    });

  });
});