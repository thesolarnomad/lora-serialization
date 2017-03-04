import test from 'ava';
import chai from 'chai';
import { encoder } from '../../src';
import base from '../base';

const expect = chai.expect;
chai.should();

test('should yell at you if input is incorrect', t => {
  expect(() => encoder.encode()).to.throw(/values/i);
  expect(() => encoder.encode([])).to.throw(/mask/i);
  t.pass();
});

test('should yell at you if input is longer than mask', t => {
  expect(() => encoder.encode([1,2,3], [encoder.latLng])).to.throw(/Mask/i);
  t.pass();
});

test('should be able to compose encoder functions', t => {
  encoder
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
    ]).should.be.deep.equal(
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
