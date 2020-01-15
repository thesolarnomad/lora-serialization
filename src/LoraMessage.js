(function(root) {
  function LoraMessage(encoder) {
    this.dataTuples = [];
    this.encoder = encoder || root;
  }

  LoraMessage.prototype.addTuple = function(data, fnName) {
    this.dataTuples.push({
      data: data,
      fn: this.encoder[fnName]
    });
  };


  LoraMessage.prototype.addUnixtime = function(unixtime) {
    this.addTuple([unixtime], 'unixtime');
    return this;
  };

  LoraMessage.prototype.addLatLng = function(latitude, longitude) {
    this.addTuple([latitude, longitude], 'latLng');
    return this;
  };

  LoraMessage.prototype.addUint16 = function(uint16) {
    this.addTuple([uint16], 'uint16');
    return this;
  };

  LoraMessage.prototype.addTemperature = function(temperature) {
    this.addTuple([temperature], 'temperature');
    return this;
  };

  LoraMessage.prototype.addUint8 = function(uint8) {
    this.addTuple([uint8], 'uint8');
    return this;
  };

  LoraMessage.prototype.addHumidity = function(humidity) {
    this.addTuple([humidity], 'humidity');
    return this;
  };

  LoraMessage.prototype.addBitmap = function(a, b, c, d, e, f, g, h) {
    this.addTuple([a, b, c, d, e, f, g, h], 'bitmap');
    return this;
  };

  LoraMessage.prototype.getBytes = function() {
    return this.dataTuples.reduce(function(acc, tuple) {
      var current = tuple.fn.apply(null, tuple.data);
      return acc.concat(current);
    }, []);
  };

  LoraMessage.prototype.getLength = function() {
    return this.dataTuples.reduce(function(previous, tuple) {
      return previous + tuple.fn.BYTES;
    }, 0);
  };

  if (typeof module === 'object' && typeof module.exports !== 'undefined') {
    module.exports = LoraMessage;
  }
})(this);
