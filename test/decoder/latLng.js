import test from 'ava';
import chai from 'chai';
import { decoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the buffer is omitted', t => {
  expect(() => decoder.latLng()).to.throw(/undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.latLng(new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9]))).to.throw(/must have/);
  t.pass();
});

test('should be possible to decode a coordinate', t => {
  decoder
    .latLng(base.latLngBytes)
    .should.be.deep.equal(base.latLng);
  t.pass();
});
