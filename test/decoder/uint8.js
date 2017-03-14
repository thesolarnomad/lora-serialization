import test from 'ava';
import { decoder } from '../../src';
import base from '../base';

test('should yell at you if the buffer is omitted', t => {
  t.throws(() => decoder.uint8(), /undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  t.throws(() => decoder.uint8(new Buffer([1, 2])), /must have/);
  t.pass();
});

test('should be possible to decode an int', t => {
  t.is(decoder.uint8(base.uint8Bytes), base.uint8);
  t.pass();
});
