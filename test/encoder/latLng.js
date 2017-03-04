import test from 'ava';
import chai from 'chai';
import { encoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the coordinates are omitted', t => {
  expect(() => encoder.latLng()).to.throw(/latitude/i);
  expect(() => encoder.latLng(0)).to.throw(/longitude/i);
  t.pass();
});

test('should yell at you if the coordinates are incorrect', t => {
  expect(() => encoder.latLng(-90.000001, 0)).to.throw(/latitude/i);
  expect(() => encoder.latLng(90.000001, 0)).to.throw(/latitude/i);
  expect(() => encoder.latLng(0, -180.000001)).to.throw(/longitude/i);
  expect(() => encoder.latLng(0, 180.000001)).to.throw(/longitude/i);
  t.pass();
});

test('should be possible to decode a coordinate', t => {
  encoder
    .latLng.apply(encoder, base.latLng)
    .should.be.deep.equal(base.latLngBytes);
  t.pass();
});
