const path = require('path');
const chai = require('chai');
const decoder = require(path.join(__dirname, '..', 'src', 'decoder.js'));
const base = require('./base.js');

const expect = chai.expect;
chai.should();

describe('Decoder', () => {
  describe('unixtime', () => {
    it('should yell at you if the buffer is omitted', () => {
      expect(() => decoder.unixtime()).to.throw(/undefined/);
    });
    it('should yell at you if the buffer size is incorrect', () => {
      expect(() => decoder.unixtime(new Buffer([1, 2]))).to.throw(/must have/);
    });
    it('should be possible to decode a unixtime', () => {
      decoder
        .unixtime(base.unixtimeBytes)
        .should.be.equal(base.unixtime);
    });
  });

  describe('latLng', () => {
    it('should yell at you if the buffer is omitted', () => {
      expect(() => decoder.latLng()).to.throw(/undefined/);
    });
    it('should yell at you if the buffer size is incorrect', () => {
      expect(() => decoder.latLng(new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9]))).to.throw(/must have/);
    });
    it('should be possible to decode a coordinate', () => {
      decoder
        .latLng(base.latLngBytes)
        .should.be.deep.equal(base.latLng);
    });
  });

  describe('uint16', () => {
    it('should yell at you if the buffer is omitted', () => {
      expect(() => decoder.uint16()).to.throw(/undefined/);
    });
    it('should yell at you if the buffer size is incorrect', () => {
      expect(() => decoder.uint16(new Buffer([1]))).to.throw(/must have/);
    });
    it('should be possible to decode an int', () => {
      decoder
        .uint16(base.uint16Bytes)
        .should.be.equal(base.uint16);
    });
  });

  describe('uint8', () => {
    it('should yell at you if the buffer is omitted', () => {
      expect(() => decoder.uint8()).to.throw(/undefined/);
    });
    it('should yell at you if the buffer size is incorrect', () => {
      expect(() => decoder.uint8(new Buffer([1, 2]))).to.throw(/must have/);
    });
    it('should be possible to decode an int', () => {
      decoder
        .uint8(base.uint8Bytes)
        .should.be.equal(base.uint8);
    });
  });

  describe('temp', () => {
    it('should yell at you if the buffer is omitted', () => {
      expect(() => decoder.temperature()).to.throw(/undefined/);
    });
    it('should yell at you if the buffer size is incorrect', () => {
      expect(() => decoder.temperature(new Buffer([1]))).to.throw(/must have/);
    });
    it('should be possible to decode a temperature', () => {
      decoder
        .temperature(base.tempBytes)
        .should.be.equal(base.temp);
    });

    it('should be possible to decode a negative temperature', () => {
      decoder
        .temperature(base.negativeTempBytes)
        .should.be.equal(base.negativeTemp);
    });
  });

  describe('humidity', () => {
    it('should yell at you if the buffer is omitted', () => {
      expect(() => decoder.humidity()).to.throw(/undefined/);
    });
    it('should yell at you if the buffer size is incorrect', () => {
      expect(() => decoder.humidity(new Buffer([1]))).to.throw(/must have/);
    });
    it('should be possible to decode a humidity', () => {
      decoder
        .humidity(base.humidityBytes)
        .should.be.equal(base.humidity);
    });
  });

  describe('bitmap', () => {
    it('should yell at you if the buffer is omitted', () => {
      expect(() => decoder.bitmap()).to.throw(/undefined/);
    });
    it('should yell at you if the buffer size is incorrect', () => {
      expect(() => decoder.bitmap(new Buffer([1, 2]))).to.throw(/must have/);
    });
    it('should be possible to decode a bitmap', () => {
      decoder
        .bitmap(base.bitmapBytes)
        .should.be.deep.equal(base.bitmap);
    });
  });

  describe('decode', () => {
    it('should be able to compose decoder functions', () => {
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
    });

    it('should yell at you if mask is longer than input', () => {
      expect(() => decoder.decode(new Buffer(7), [decoder.latLng])).to.throw(/Mask/i);
    });

    it('should be able to take names', () => {
      decoder
        .decode(base.unixtimeBytes, [decoder.unixtime], ['time'])
        .should.be.deep.equal({
          time: base.unixtime
        });
    });
  });
});
