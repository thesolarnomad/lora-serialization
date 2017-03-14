import test from 'ava';
import { decoder } from '../../src';
import base from '../base';

test('should yell at you if the buffer is omitted', t => {
  t.throws(() => decoder.unixtime(), /undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  t.throws(() => decoder.unixtime(new Buffer([1, 2])), /must have/);
  t.pass();
});

test('should be possible to decode a unixtime', t => {
  t.is(decoder.unixtime(base.unixtimeBytes), base.unixtime);
  t.pass();
});
