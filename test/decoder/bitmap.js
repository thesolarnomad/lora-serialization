import test from 'ava';
import chai from 'chai';
import { decoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the buffer is omitted', t => {
  expect(() => decoder.bitmap()).to.throw(/undefined/);
  t.pass();
});
test('should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.bitmap(new Buffer([1, 2]))).to.throw(/must have/);
  t.pass();
});
test('should be possible to decode a bitmap', t => {
  decoder
    .bitmap(base.bitmapBytes)
    .should.be.deep.equal(base.bitmap);
  t.pass();
});
