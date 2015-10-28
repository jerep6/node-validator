var assert = require('assert');
require('should');

var validator = require('../lib/validator');

function expectFailure(message, childName, childValue) {
  message.should.not.be.empty;
}

function expectSuccess() {
  throw new Error('fail');
}

describe('validator.isNumber', function () {
  it('should pass an integer',
      function (done) {
        validator.isNumber().validate(100, expectSuccess);
        validator.isNumber().validate(0, expectSuccess);
        validator.isNumber().validate(-100, expectSuccess);
        done();
      });

  it('should pass non-integer numbers',
      function (done) {
        validator.isNumber().validate(123.4, expectSuccess);
        validator.isNumber().validate(123.0, expectSuccess);
        validator.isNumber().validate(0.0, expectSuccess);
        validator.isNumber().validate(-123.4, expectSuccess);
        done();
      });

  it('should fail non-numbers',
      function (done) {
        validator.isNumber().validate('', expectFailure);
        validator.isNumber().validate('123', expectFailure);
        validator.isNumber().validate('asd', expectFailure);
        validator.isNumber().validate(null, expectFailure);
        validator.isNumber().validate(true, expectFailure);
        validator.isNumber().validate(function () {}, expectFailure);
        done();
      });

  it('should enforce "min" constraint',
      function (done) {
        validator.isNumber({min: 0}).validate(0, expectSuccess);
        validator.isNumber({min: 0}).validate(1, expectSuccess);
        done();
      });

  it('should enforce "max" constraint',
      function (done) {
        validator.isNumber({max: 10}).validate(10, expectSuccess);
        validator.isNumber({max: 10}).validate(11, expectFailure);
        validator.isNumber({max: 10}).validate(9, expectSuccess);
        validator.isNumber({max: 0}).validate(-2, expectSuccess);
        validator.isNumber({max: 0}).validate(2, expectFailure);
        done();
      });

  it('should enforce "min" constraint for negative numbers', function (done) {
    validator.isNumber({min: 0}).validate(-1, function () {
      done();
    });
  });

});