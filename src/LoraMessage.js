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

  LoraMessage.prototype.getBytes = function() {
    var buffer = new Buffer(this.getLength());
    var offset = 0;
    this.dataTuples.forEach(function(tuple) {
      var current = tuple.fn.apply(null, tuple.data);
      current.copy(buffer, offset);
      offset += tuple.fn.BYTES;
    });
    return buffer;
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
