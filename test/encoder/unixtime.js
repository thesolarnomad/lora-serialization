import test from 'ava';
import { encoder } from '../../src';
import base from '../base';

test('should yell at you if the unixtime is omitted', t => {
  t.throws(() => encoder.unixtime());
  t.pass();
});

test('should yell at you if the unixtime is incorrect', t => {
  t.throws(() => encoder.unixtime(-1), /positive/);
  t.pass();
});

test('should be possible to encode a unixtime', t => {
  t.deepEqual(encoder.unixtime(base.unixtime), base.unixtimeBytes);
  t.pass();
});
