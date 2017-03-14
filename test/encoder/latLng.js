import test from 'ava';
import { encoder } from '../../src';
import base from '../base';

test('should yell at you if the coordinates are omitted', t => {
  t.throws(() => encoder.latLng(), /latitude/i);
  t.throws(() => encoder.latLng(0), /longitude/i);
  t.pass();
});

test('should yell at you if the coordinates are incorrect', t => {
  t.throws(() => encoder.latLng(-90.000001, 0), /latitude/i);
  t.throws(() => encoder.latLng(90.000001, 0), /latitude/i);
  t.throws(() => encoder.latLng(0, -180.000001), /longitude/i);
  t.throws(() => encoder.latLng(0, 180.000001), /longitude/i);
  t.pass();
});

test('should be possible to decode a coordinate', t => {
  t.deepEqual(encoder.latLng(...base.latLng), base.latLngBytes);
  t.pass();
});
