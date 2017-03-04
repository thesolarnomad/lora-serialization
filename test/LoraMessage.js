import test from 'ava';
import chai from 'chai';
import { encoder, LoraMessage } from '../src';
import base from './base';

chai.should();

test('should be possible to construct a simple message', t => {
  const m = new LoraMessage(encoder);
  m.addUnixtime(base.unixtime);
  m.getLength().should.equal(4);
  m.getBytes().should.deep.equal(base.unixtimeBytes);
  t.pass();
});

test('should be possible to chain message parts', t => {
  const loraMessage = new LoraMessage(encoder);
  loraMessage
    .addLatLng.apply(loraMessage, base.latLng)
    .addUnixtime(base.unixtime)
    .addUint16(base.uint16)
    .addTemperature(base.temp)
    .addUint8(base.uint8)
    .addHumidity(base.humidity)
    .addBitmap.apply(loraMessage, base.bitmapArgs)
    .getBytes()
    .should.be.deep.equal(
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
