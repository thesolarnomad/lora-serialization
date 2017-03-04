import test from 'ava';
import chai from 'chai';
import { decoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the buffer is omitted', t => {
  expect(() => decoder.humidity()).to.throw(/undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.humidity(new Buffer([1]))).to.throw(/must have/);
  t.pass();
});

test('should be possible to decode a humidity', t => {
  decoder
    .humidity(base.humidityBytes)
    .should.be.equal(base.humidity);
  t.pass();
});
