import test from 'ava';
import chai from 'chai';
import { encoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the uint is omitted', t => {
  expect(() => encoder.uint16()).to.throw();
  t.pass();
});

test('should yell at you if the uint size is incorrect', t => {
  expect(() => encoder.uint16(-1)).to.throw(/range/);
  expect(() => encoder.uint16(65536)).to.throw(/range/);
  t.pass();
});

test('should be possible to encode an int', t => {
  encoder
    .uint16(base.uint16)
    .should.be.deep.equal(base.uint16Bytes);
  t.pass();
});
