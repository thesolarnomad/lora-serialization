import test from 'ava';

const path = require('path');
const chai = require('chai');
const encoder = require(path.join(__dirname, '..', 'src', 'encoder.js'));
const base = require('./base.js');

const expect = chai.expect;
chai.should();

test('Encoder: unixtime: should yell at you if the unixtime is omitted', t => {
  expect(() => encoder.unixtime()).to.throw();
  t.pass();
});

test('Encoder: unixtime: should yell at you if the unixtime is incorrect', t => {
  expect(() => encoder.unixtime(-1)).to.throw(/positive/);
  t.pass();
});

test('Encoder: unixtime: should be possible to encode a unixtime', t => {
  encoder
    .unixtime(base.unixtime)
    .should.be.deep.equal(base.unixtimeBytes);
  t.pass();
});

test('Encoder: latLng: should yell at you if the coordinates are omitted', t => {
  expect(() => encoder.latLng()).to.throw(/latitude/i);
  expect(() => encoder.latLng(0)).to.throw(/longitude/i);
  t.pass();
});

test('Encoder: latLng: should yell at you if the coordinates are incorrect', t => {
  expect(() => encoder.latLng(-90.000001, 0)).to.throw(/latitude/i);
  expect(() => encoder.latLng(90.000001, 0)).to.throw(/latitude/i);
  expect(() => encoder.latLng(0, -180.000001)).to.throw(/longitude/i);
  expect(() => encoder.latLng(0, 180.000001)).to.throw(/longitude/i);
  t.pass();
});

test('Encoder: latLng: should be possible to decode a coordinate', t => {
  encoder
    .latLng.apply(encoder, base.latLng)
    .should.be.deep.equal(base.latLngBytes);
    t.pass();
});

test('Encoder: uint8: should yell at you if the uint is omitted', t => {
  expect(() => encoder.uint8()).to.throw();
  t.pass();
});

test('Encoder: uint8: should yell at you if the uint is incorrect', t => {
  expect(() => encoder.uint8(-1)).to.throw(/range/);
  expect(() => encoder.uint8(256)).to.throw(/range/);
  t.pass();
});

test('Encoder: uint8: should be possible to encode an int', t => {
  encoder
    .uint8(base.uint8)
    .should.be.deep.equal(base.uint8Bytes);
  t.pass();
});

test('Encoder: uint16: should yell at you if the uint is omitted', t => {
  expect(() => encoder.uint16()).to.throw();
  t.pass();
});

test('Encoder: uint16: should yell at you if the uint size is incorrect', t => {
  expect(() => encoder.uint16(-1)).to.throw(/range/);
  expect(() => encoder.uint16(65536)).to.throw(/range/);
  t.pass();
});

test('Encoder: uint16: should be possible to encode an int', t => {
  encoder
    .uint16(base.uint16)
    .should.be.deep.equal(base.uint16Bytes);
  t.pass();
});

test('Encoder: temperature: should yell at you if the temperature is omitted', t => {
  expect(() => encoder.temperature()).to.throw();
  t.pass();
});

test('Encoder: temperature: should yell at you if the temperature is incorrect', t => {
  expect(() => encoder.temperature(-327.69)).to.throw(/range/);
  expect(() => encoder.temperature(327.68)).to.throw(/range/);
  t.pass();
});

test('Encoder: temperature: should be possible to encode a temperature', t => {
  encoder
    .temperature(base.temp)
    .should.be.deep.equal(base.tempBytes);
  t.pass();
});

test('Encoder: temperature: should be possible to encode a negative temperature', t => {
  encoder
    .temperature(base.negativeTemp)
    .should.be.deep.equal(base.negativeTempBytes);
  t.pass();
});

test('Encoder: humidity: should yell at you if the humidity is omitted', t => {
  expect(() => encoder.humidity()).to.throw();
  t.pass();
});
test('Encoder: humidity: should yell at you if the humidity is incorrect', t => {
  expect(() => encoder.humidity(-0.01)).to.throw(/range/);
  expect(() => encoder.humidity(100.01)).to.throw(/range/);
  t.pass();
});
test('Encoder: humidity: should be possible to encode a humidity', t => {
  encoder
    .humidity(base.humidity)
    .should.be.deep.equal(base.humidityBytes);
  t.pass();
});

test('Encoder: bitmap: should yell at you if the bitmap is incorrect', t => {
  expect(() => encoder.bitmap(1)).to.throw(TypeError);
  expect(() => encoder.bitmap('a')).to.throw(TypeError);
  t.pass();
});

test('Encoder: bitmap: should be possible to encode a bitmap', t => {
  encoder
    .bitmap.apply(encoder, base.bitmapArgs)
    .should.be.deep.equal(base.bitmapBytes);
  t.pass();
});

test('Encoder: bitmap: should be possible to encode a short bitmap', t => {
  encoder
    .bitmap(true)
    .should.be.deep.equal(new Buffer([0x80]));
  t.pass();
});

test('Encoder: encode: should yell at you if input is incorrect', t => {
  expect(() => encoder.encode()).to.throw(/values/i);
  expect(() => encoder.encode([])).to.throw(/mask/i);
  t.pass();
});

test('Encoder: encode: should yell at you if input is longer than mask', t => {
  expect(() => encoder.encode([1,2,3], [encoder.latLng])).to.throw(/Mask/i);
  t.pass();
});

test('Encoder: encode: should be able to compose encoder functions', t => {
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
