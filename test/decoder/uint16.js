import test from 'ava';
import chai from 'chai';
import { decoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the buffer is omitted', t => {
  expect(() => decoder.uint16()).to.throw(/undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.uint16(new Buffer([1]))).to.throw(/must have/);
  t.pass();
});

test('should be possible to decode an int', t => {
  decoder
    .uint16(base.uint16Bytes)
    .should.be.equal(base.uint16);
  t.pass();
});
