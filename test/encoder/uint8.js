import test from 'ava';
import { encoder } from '../../src';
import base from '../base';

test('should yell at you if the uint is omitted', t => {
  t.throws(() => encoder.uint8());
  t.pass();
});

test('should yell at you if the uint is incorrect', t => {
  t.throws(() => encoder.uint8(-1), /range/);
  t.throws(() => encoder.uint8(256), /range/);
  t.pass();
});

test('should be possible to encode an int', t => {
  t.deepEqual(encoder.uint8(base.uint8), base.uint8Bytes);
  t.pass();
});
