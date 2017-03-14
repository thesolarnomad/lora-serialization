import test from 'ava';
import { encoder } from '../../src';
import base from '../base';

test('should yell at you if the uint is omitted', t => {
  t.throws(() => encoder.uint16());
  t.pass();
});

test('should yell at you if the uint size is incorrect', t => {
  t.throws(() => encoder.uint16(-1), /range/);
  t.throws(() => encoder.uint16(65536), /range/);
  t.pass();
});

test('should be possible to encode an int', t => {
  t.deepEqual(encoder.uint16(base.uint16), base.uint16Bytes);
  t.pass();
});
