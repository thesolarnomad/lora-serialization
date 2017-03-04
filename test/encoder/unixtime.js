import test from 'ava';
import chai from 'chai';
import { encoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if the unixtime is omitted', t => {
  expect(() => encoder.unixtime()).to.throw();
  t.pass();
});

test('should yell at you if the unixtime is incorrect', t => {
  expect(() => encoder.unixtime(-1)).to.throw(/positive/);
  t.pass();
});

test('should be possible to encode a unixtime', t => {
  encoder
    .unixtime(base.unixtime)
    .should.be.deep.equal(base.unixtimeBytes);
  t.pass();
});
