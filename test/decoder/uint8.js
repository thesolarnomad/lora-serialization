import test from 'ava';
import chai from 'chai';
import { decoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the buffer is omitted', t => {
  expect(() => decoder.uint8()).to.throw(/undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.uint8(new Buffer([1, 2]))).to.throw(/must have/);
  t.pass();
});

test('should be possible to decode an int', t => {
  decoder
    .uint8(base.uint8Bytes)
    .should.be.equal(base.uint8);
  t.pass();
});
