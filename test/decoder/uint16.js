import test from 'ava';
import { decoder } from '../../src';
import base from '../base';

test('should yell at you if the buffer is omitted', t => {
  t.throws(() => decoder.uint16(), /undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  t.throws(() => decoder.uint16([1]), /must have/);
  t.pass();
});

test('should be possible to decode an int', t => {
  t.is(decoder.uint16(base.uint16Bytes), base.uint16);
  t.pass();
});
