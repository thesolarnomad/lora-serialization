import test from 'ava';
import chai from 'chai';
import { encoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the bitmap is incorrect', t => {
  expect(() => encoder.bitmap(1)).to.throw(TypeError);
  expect(() => encoder.bitmap('a')).to.throw(TypeError);
  t.pass();
});

test('should be possible to encode a bitmap', t => {
  encoder
    .bitmap.apply(encoder, base.bitmapArgs)
    .should.be.deep.equal(base.bitmapBytes);
  t.pass();
});

test('should be possible to encode a short bitmap', t => {
  encoder
    .bitmap(true)
    .should.be.deep.equal(new Buffer([0x80]));
  t.pass();
});
