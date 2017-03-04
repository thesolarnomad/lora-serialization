const path = require('path');
const chai = require('chai');
const encoder = require(path.join(__dirname, '..', 'src', 'encoder.js'));
const base = require('./base.js');
const LoraMessage = require(path.join(__dirname, '..', 'src', 'LoraMessage.js'));

chai.should();

describe('LoraMessage', () => {

  it('should be possible to construct a simple message', () => {
    const m = new LoraMessage(encoder);
    m.addUnixtime(base.unixtime);
    m.getLength().should.equal(4);
    m.getBytes().should.deep.equal(base.unixtimeBytes);
  });

  it('should be possible to chain message parts', () => {
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
  });
});
