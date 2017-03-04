import test from 'ava';
import chai from 'chai';
import { decoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the buffer is omitted', t => {
  expect(() => decoder.unixtime()).to.throw(/undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.unixtime(new Buffer([1, 2]))).to.throw(/must have/);
  t.pass();
});

test('should be possible to decode a unixtime', t => {
  decoder
    .unixtime(base.unixtimeBytes)
    .should.be.equal(base.unixtime);
  t.pass();
});
