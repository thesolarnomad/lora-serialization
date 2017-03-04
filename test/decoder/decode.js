import test from 'ava';
import chai from 'chai';
import { decoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should be able to compose decoder functions', t => {
  decoder
    .decode(
      Buffer.concat([
        base.latLngBytes,
        base.unixtimeBytes,
        base.uint16Bytes,
        base.tempBytes,
        base.uint8Bytes,
        base.humidityBytes,
        base.bitmapBytes,
      ]), [
        decoder.latLng,
        decoder.unixtime,
        decoder.uint16,
        decoder.temperature,
        decoder.uint8,
        decoder.humidity,
        decoder.bitmap,
      ]
    )
    .should.be.deep.equal({
      0: base.latLng,
      1: base.unixtime,
      2: base.uint16,
      3: base.temp,
      4: base.uint8,
      5: base.humidity,
      6: base.bitmap,
    });
  t.pass();
});

test('should yell at you if mask is longer than input', t => {
  expect(() => decoder.decode(new Buffer(7), [decoder.latLng])).to.throw(/Mask/i);
  t.pass();
});

test('should be able to take names', t => {
  decoder
    .decode(base.unixtimeBytes, [decoder.unixtime], ['time'])
    .should.be.deep.equal({
      time: base.unixtime
    });
  t.pass();
});
