import test from 'ava';
import { decoder } from '../../src';
import base from '../base';

test('should yell at you if the buffer is omitted', t => {
  t.throws(() => decoder.bitmap(), /undefined/);
  t.pass();
});
test('should yell at you if the buffer size is incorrect', t => {
  t.throws(() => decoder.bitmap(new Buffer([1, 2])), /must have/);
  t.pass();
});
test('should be possible to decode a bitmap', t => {
  t.deepEqual(decoder.bitmap(base.bitmapBytes), base.bitmap);
  t.pass();
});
