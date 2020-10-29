import test from 'ava';
import { decoder } from '../../src';
import base from '../base';

test('should yell at you if the buffer is omitted', t => {
  t.throws(() => decoder.rawfloat(), /undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  t.throws(() => decoder.rawfloat([1]), /must have/);
  t.pass();
});

test('should be possible to decode a float', t => {
  t.is(decoder.rawfloat(base.rawFloatBytes), base.rawFloat);
  t.pass();
});
