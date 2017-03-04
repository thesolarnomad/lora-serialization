import test from 'ava';
import chai from 'chai';
import { encoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the humidity is omitted', t => {
  expect(() => encoder.humidity()).to.throw();
  t.pass();
});
test('should yell at you if the humidity is incorrect', t => {
  expect(() => encoder.humidity(-0.01)).to.throw(/range/);
  expect(() => encoder.humidity(100.01)).to.throw(/range/);
  t.pass();
});
test('should be possible to encode a humidity', t => {
  encoder
    .humidity(base.humidity)
    .should.be.deep.equal(base.humidityBytes);
  t.pass();
});
