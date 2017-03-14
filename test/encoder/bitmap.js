import test from 'ava';
import { encoder } from '../../src';
import base from '../base';

test('should yell at you if the bitmap is incorrect', t => {
  t.throws(() => encoder.bitmap(1), TypeError);
  t.throws(() => encoder.bitmap('a'), TypeError);
  t.pass();
});

test('should be possible to encode a bitmap', t => {
  t.deepEqual(encoder.bitmap.apply(encoder, base.bitmapArgs), base.bitmapBytes);
  t.pass();
});

test('should be possible to encode a short bitmap', t => {
  t.deepEqual(encoder.bitmap(true), new Buffer([0x80]));
  t.pass();
});
