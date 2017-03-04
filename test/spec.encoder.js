const path = require('path');
const chai = require('chai');
const encoder = require(path.join(__dirname, '..', 'src', 'encoder.js'));
const base = require('./base.js');

const expect = chai.expect;
chai.should();

describe('Encoder', () => {
  describe('unixtime', () => {
    it('should yell at you if the unixtime is omitted', () => {
      expect(() => encoder.unixtime()).to.throw();
    });
    it('should yell at you if the unixtime is incorrect', () => {
      expect(() => encoder.unixtime(-1)).to.throw(/positive/);
    });
    it('should be possible to encode a unixtime', () => {
      encoder
        .unixtime(base.unixtime)
        .should.be.deep.equal(base.unixtimeBytes);
    });
  });

  describe('latLng', () => {
    it('should yell at you if the coordinates are omitted', () => {
      expect(() => encoder.latLng()).to.throw(/latitude/i);
      expect(() => encoder.latLng(0)).to.throw(/longitude/i);
    });
    it('should yell at you if the coordinates are incorrect', () => {
      expect(() => encoder.latLng(-90.000001, 0)).to.throw(/latitude/i);
      expect(() => encoder.latLng(90.000001, 0)).to.throw(/latitude/i);
      expect(() => encoder.latLng(0, -180.000001)).to.throw(/longitude/i);
      expect(() => encoder.latLng(0, 180.000001)).to.throw(/longitude/i);
    });
    it('should be possible to decode a coordinate', () => {
      encoder
        .latLng.apply(encoder, base.latLng)
        .should.be.deep.equal(base.latLngBytes);
    });
  });

  describe('uint8', () => {
    it('should yell at you if the uint is omitted', () => {
      expect(() => encoder.uint8()).to.throw();
    });
    it('should yell at you if the uint is incorrect', () => {
      expect(() => encoder.uint8(-1)).to.throw(/range/);
      expect(() => encoder.uint8(256)).to.throw(/range/);
    });
    it('should be possible to encode an int', () => {
      encoder
        .uint8(base.uint8)
        .should.be.deep.equal(base.uint8Bytes);
    });
  });

  describe('uint16', () => {
    it('should yell at you if the uint is omitted', () => {
      expect(() => encoder.uint16()).to.throw();
    });
    it('should yell at you if the uint size is incorrect', () => {
      expect(() => encoder.uint16(-1)).to.throw(/range/);
      expect(() => encoder.uint16(65536)).to.throw(/range/);
    });
    it('should be possible to encode an int', () => {
      encoder
        .uint16(base.uint16)
        .should.be.deep.equal(base.uint16Bytes);
    });
  });

  describe('temperature', () => {
    it('should yell at you if the temperature is omitted', () => {
      expect(() => encoder.temperature()).to.throw();
    });
    it('should yell at you if the temperature is incorrect', () => {
      expect(() => encoder.temperature(-327.69)).to.throw(/range/);
      expect(() => encoder.temperature(327.68)).to.throw(/range/);
    });
    it('should be possible to encode a temperature', () => {
      encoder
        .temperature(base.temp)
        .should.be.deep.equal(base.tempBytes);
    });

    it('should be possible to encode a negative temperature', () => {
      encoder
        .temperature(base.negativeTemp)
        .should.be.deep.equal(base.negativeTempBytes);
    });
  });

  describe('humidity', () => {
    it('should yell at you if the humidity is omitted', () => {
      expect(() => encoder.humidity()).to.throw();
    });
    it('should yell at you if the humidity is incorrect', () => {
      expect(() => encoder.humidity(-0.01)).to.throw(/range/);
      expect(() => encoder.humidity(100.01)).to.throw(/range/);
    });
    it('should be possible to encode a humidity', () => {
      encoder
        .humidity(base.humidity)
        .should.be.deep.equal(base.humidityBytes);
    });
  });

  describe('encode', () => {
    it('should yell at you if input is incorrect', () => {
      expect(() => encoder.encode()).to.throw(/values/i);
      expect(() => encoder.encode([])).to.throw(/mask/i);
    });

    it('should yell at you if input is longer than mask', () => {
      expect(() => encoder.encode([1,2,3], [encoder.latLng])).to.throw(/Mask/i);
    });

    it('should be able to compose encoder functions', () => {
      encoder
        .encode(
        [
          base.latLng,
          base.unixtime,
          base.uint16,
          base.temp,
          base.uint8,
          base.humidity
        ],
        [
          encoder.latLng,
          encoder.unixtime,
          encoder.uint16,
          encoder.temperature,
          encoder.uint8,
          encoder.humidity
        ]).should.be.deep.equal(
          Buffer.concat([
            base.latLngBytes,
            base.unixtimeBytes,
            base.uint16Bytes,
            base.tempBytes,
            base.uint8Bytes,
            base.humidityBytes
          ])
      );
    });
  });
});
