import test from 'ava';
import chai from 'chai';
import { encoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the uint is omitted', t => {
  expect(() => encoder.uint8()).to.throw();
  t.pass();
});

test('should yell at you if the uint is incorrect', t => {
  expect(() => encoder.uint8(-1)).to.throw(/range/);
  expect(() => encoder.uint8(256)).to.throw(/range/);
  t.pass();
});

test('should be possible to encode an int', t => {
  encoder
    .uint8(base.uint8)
    .should.be.deep.equal(base.uint8Bytes);
  t.pass();
});
