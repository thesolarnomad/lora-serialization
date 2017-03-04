import test from 'ava';
import chai from 'chai';
import { decoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the buffer is omitted', t => {
  expect(() => decoder.temperature()).to.throw(/undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.temperature(new Buffer([1]))).to.throw(/must have/);
  t.pass();
});

test('should be possible to decode a temperature', t => {
  decoder
    .temperature(base.tempBytes)
    .should.be.equal(base.temp);
  t.pass();
});

test('should be possible to decode a negative temperature', t => {
  decoder
    .temperature(base.negativeTempBytes)
    .should.be.equal(base.negativeTemp);
  t.pass();
});
