import test from 'ava';
import { decoder } from '../../src';
import base from '../base';

test('should be able to compose decoder functions', t => {
  t.deepEqual(
    decoder.decode(
      [].concat(
        base.latLngBytes,
        base.unixtimeBytes,
        base.uint16Bytes,
        base.tempBytes,
        base.uint8Bytes,
        base.humidityBytes,
        base.rawFloatBytes,
        base.bitmapBytes
      ), [
        decoder.latLng,
        decoder.unixtime,
        decoder.uint16,
        decoder.temperature,
        decoder.uint8,
        decoder.humidity,
        decoder.rawfloat,
        decoder.bitmap,
      ]
    ),
    {
      0: base.latLng,
      1: base.unixtime,
      2: base.uint16,
      3: base.temp,
      4: base.uint8,
      5: base.humidity,
      6: base.rawFloat,
      7: base.bitmap,
    }
  );
  t.pass();
});

test('should yell at you if mask is longer than input', t => {
  t.throws(() => decoder.decode([1, 2, 3, 4, 5, 6, 7], [decoder.latLng]), /Mask/i);
  t.pass();
});

test('should be able to take names', t => {
  t.deepEqual(
    decoder.decode(base.unixtimeBytes, [decoder.unixtime], ['time']),
    {
      time: base.unixtime
    }
  );
  t.pass();
});
