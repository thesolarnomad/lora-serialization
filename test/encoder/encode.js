import test from 'ava';
import { encoder } from '../../src';
import base from '../base';

test('should yell at you if input is incorrect', t => {
  t.throws(() => encoder.encode(), /values/i);
  t.throws(() => encoder.encode([]), /mask/i);
  t.pass();
});

test('should yell at you if input is longer than mask', t => {
  t.throws(() => encoder.encode([1,2,3], [encoder.latLng]), /Mask/i);
  t.pass();
});

test('should be able to compose encoder functions', t => {
  t.deepEqual(encoder
    .encode(
    [
      base.latLng,
      base.unixtime,
      base.uint16,
      base.temp,
      base.uint8,
      base.humidity,
      base.bitmapArgs,
    ],
    [
      encoder.latLng,
      encoder.unixtime,
      encoder.uint16,
      encoder.temperature,
      encoder.uint8,
      encoder.humidity,
      encoder.bitmap,
    ]),
      Buffer.concat([
        base.latLngBytes,
        base.unixtimeBytes,
        base.uint16Bytes,
        base.tempBytes,
        base.uint8Bytes,
        base.humidityBytes,
        base.bitmapBytes,
      ])
  );
  t.pass();
});
