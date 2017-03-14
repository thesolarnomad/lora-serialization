import test from 'ava';
import { decoder } from '../../src';
import base from '../base';

test('should yell at you if the buffer is omitted', t => {
  t.throws(() => decoder.latLng(), /undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  t.throws(() => decoder.latLng(new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9])), /must have/);
  t.pass();
});

test('should be possible to decode a coordinate', t => {
  t.deepEqual(decoder.latLng(base.latLngBytes), base.latLng);
  t.pass();
});
