import test from 'ava';
import { encoder, LoraMessage } from '../src';
import base from './base';

test('should be possible to construct a simple message', t => {
  const m = new LoraMessage(encoder);
  m.addUnixtime(base.unixtime);
  t.is(m.getLength(), 4);
  t.deepEqual(m.getBytes(), base.unixtimeBytes);
  t.pass();
});

test('should be possible to chain message parts', t => {
  const loraMessage = new LoraMessage(encoder);
  t.deepEqual(
    loraMessage
      .addLatLng.apply(loraMessage, base.latLng)
      .addUnixtime(base.unixtime)
      .addUint16(base.uint16)
      .addTemperature(base.temp)
      .addUint8(base.uint8)
      .addHumidity(base.humidity)
      .addBitmap.apply(loraMessage, base.bitmapArgs)
      .getBytes()
    ,
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
