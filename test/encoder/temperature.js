import test from 'ava';
import chai from 'chai';
import { encoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the temperature is omitted', t => {
  expect(() => encoder.temperature()).to.throw();
  t.pass();
});

test('should yell at you if the temperature is incorrect', t => {
  expect(() => encoder.temperature(-327.69)).to.throw(/range/);
  expect(() => encoder.temperature(327.68)).to.throw(/range/);
  t.pass();
});

test('should be possible to encode a temperature', t => {
  encoder
    .temperature(base.temp)
    .should.be.deep.equal(base.tempBytes);
  t.pass();
});

test('should be possible to encode a negative temperature', t => {
  encoder
    .temperature(base.negativeTemp)
    .should.be.deep.equal(base.negativeTempBytes);
  t.pass();
});
