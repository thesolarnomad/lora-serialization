import test from 'ava';

const path = require('path');
const chai = require('chai');
const decoder = require(path.join(__dirname, '..', 'src', 'decoder.js'));
const base = require('./base.js');

const expect = chai.expect;
chai.should();

test('Decoder: unixtime: should yell at you if the buffer is omitted', t => {
  expect(() => decoder.unixtime()).to.throw(/undefined/);
  t.pass();
});

test('Decoder: unixtime: should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.unixtime(new Buffer([1, 2]))).to.throw(/must have/);
  t.pass();
});

test('Decoder: unixtime: should be possible to decode a unixtime', t => {
  decoder
    .unixtime(base.unixtimeBytes)
    .should.be.equal(base.unixtime);
  t.pass();
});

test('Decoder: latLng: should yell at you if the buffer is omitted', t => {
  expect(() => decoder.latLng()).to.throw(/undefined/);
  t.pass();
});

test('Decoder: latLng: should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.latLng(new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9]))).to.throw(/must have/);
  t.pass();
});

test('Decoder: latLng: should be possible to decode a coordinate', t => {
  decoder
    .latLng(base.latLngBytes)
    .should.be.deep.equal(base.latLng);
  t.pass();
});

test('Decoder: uint16: should yell at you if the buffer is omitted', t => {
  expect(() => decoder.uint16()).to.throw(/undefined/);
  t.pass();
});

test('Decoder: uint16: should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.uint16(new Buffer([1]))).to.throw(/must have/);
  t.pass();
});

test('Decoder: uint16: should be possible to decode an int', t => {
  decoder
    .uint16(base.uint16Bytes)
    .should.be.equal(base.uint16);
  t.pass();
});

test('Decoder: uint8: should yell at you if the buffer is omitted', t => {
  expect(() => decoder.uint8()).to.throw(/undefined/);
  t.pass();
});
test('Decoder: uint8: should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.uint8(new Buffer([1, 2]))).to.throw(/must have/);
  t.pass();
});
test('Decoder: uint8: should be possible to decode an int', t => {
  decoder
    .uint8(base.uint8Bytes)
    .should.be.equal(base.uint8);
  t.pass();
});

test('Decoder: temperature: should yell at you if the buffer is omitted', t => {
  expect(() => decoder.temperature()).to.throw(/undefined/);
  t.pass();
});

test('Decoder: temperature: should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.temperature(new Buffer([1]))).to.throw(/must have/);
  t.pass();
});

test('Decoder: temperature: should be possible to decode a temperature', t => {
  decoder
    .temperature(base.tempBytes)
    .should.be.equal(base.temp);
  t.pass();
});

test('Decoder: temperature: should be possible to decode a negative temperature', t => {
  decoder
    .temperature(base.negativeTempBytes)
    .should.be.equal(base.negativeTemp);
  t.pass();
});

test('Decoder: humidity: should yell at you if the buffer is omitted', t => {
  expect(() => decoder.humidity()).to.throw(/undefined/);
  t.pass();
});

test('Decoder: humidity: should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.humidity(new Buffer([1]))).to.throw(/must have/);
  t.pass();
});

test('Decoder: humidity: should be possible to decode a humidity', t => {
  decoder
    .humidity(base.humidityBytes)
    .should.be.equal(base.humidity);
  t.pass();
});

test('Decoder: bitmap: should yell at you if the buffer is omitted', t => {
  expect(() => decoder.bitmap()).to.throw(/undefined/);
  t.pass();
});
test('Decoder: bitmap: should yell at you if the buffer size is incorrect', t => {
  expect(() => decoder.bitmap(new Buffer([1, 2]))).to.throw(/must have/);
  t.pass();
});
test('Decoder: bitmap: should be possible to decode a bitmap', t => {
  decoder
    .bitmap(base.bitmapBytes)
    .should.be.deep.equal(base.bitmap);
  t.pass();
});

test('Decoder: decode: should be able to compose decoder functions', t => {
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

test('Decoder: decode: should yell at you if mask is longer than input', t => {
  expect(() => decoder.decode(new Buffer(7), [decoder.latLng])).to.throw(/Mask/i);
  t.pass();
});

test('Decoder: decode: should be able to take names', t => {
  decoder
    .decode(base.unixtimeBytes, [decoder.unixtime], ['time'])
    .should.be.deep.equal({
      time: base.unixtime
    });
  t.pass();
});
