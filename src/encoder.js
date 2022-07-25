var intToBytes = function(i, byteSize) {
  var buf = [];
  for (var x = 0; x < byteSize; x++) {
    buf[x] = i >> (x * 8) & 0xFF;
  }
  return buf;
};

var unixtime = function(i) {
  if (isNaN(i) || i < 0) {
    throw new Error('Unix time must be positive');
  }
  return intToBytes(i, unixtime.BYTES);
};
unixtime.BYTES = 4;

var uint8 = function(i) {
  if (isNaN(i) || i < 0 || i > 255) {
    throw new Error('uint8 must be in range 0..255');
  }
  return intToBytes(i, uint8.BYTES);
};
uint8.BYTES = 1;

var uint16 = function(i) {
  if (isNaN(i) || i < 0 || i > 65535) {
    throw new Error('uint16 must be in range 0..65535');
  }
  return intToBytes(i, uint16.BYTES);
};
uint16.BYTES = 2;

var uint32 = function(i) {
  if (isNaN(i) || i < 0 || i > 4294967295) {
    throw new Error('uint32 must be in range 0..4294967295');
  }
  return intToBytes(i, uint32.BYTES);
};
uint32.BYTES = 4;

var latLng = function(latitude, longitude) {
  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    throw new Error('Latitude must be between -90° and 90°');
  }
  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    throw new Error('Longitude must be between -180° and 180°');
  }

  return [].concat(
    intToBytes(~~(latitude * 1e6), latLng.BYTES / 2),
    intToBytes(~~(longitude * 1e6), latLng.BYTES / 2)
  );
};
latLng.BYTES = 8;

var temperature = function(i) {
  if (isNaN(i) || i < -327.68 || i > 327.67) {
    throw new Error('Temperature must be in range -327.68..327.67');
  }
  var t = ~~(Math.abs(i) * 1e2);
  var b = ('0000000000000000' + Number(t >>> 0).toString(2)).slice(-16);
  if (i < 0) {
    var arr = b.split('').map(function(x) { return !Number(x); });
    for (var o = arr.length - 1; o > 0; o--) {
      arr[o] = !arr[o];
      if (arr[o]) {
        break;
      }
    }
    b = arr.map(Number).join('');
  }
  return [
    parseInt(b.slice(-16, -8), 2),
    parseInt(b.slice(-8), 2)
  ];
};
temperature.BYTES = 2;

var humidity = function(i) {
  if (isNaN(i) || i < 0 || i > 100) {
    throw new Error('Humidity must be in range 0..100');
  }

  return intToBytes(i * 1e2, humidity.BYTES);
};
humidity.BYTES = 2;

var bitmap = function(a, b, c, d, e, f, g, h) { // eslint-disable-line no-unused-vars
  var base = [];
  for(var i = 0; i < 8; i++) {
    var bit = arguments[i];
    if (typeof bit === 'undefined') {
      base[i] = false;
    } else if (typeof bit !== 'boolean') {
      throw new TypeError('Arguments must be of type boolean');
    } else {
      base[i] = bit;
    }
  }
  var bm = parseInt(base.map(Number).join(''), 2);
  return intToBytes(bm, bitmap.BYTES);
};
bitmap.BYTES = 1;

var encode = function(values, mask) {
  if (!Array.isArray(values)) {
    throw new TypeError('Values must be an array');
  }
  if (!Array.isArray(mask)) {
    throw new TypeError('Mask must be an array');
  }
  if (values.length > mask.length) {
    throw new Error('Mask length is ' + mask.length + ' whereas input is ' + values.length);
  }

  return values
    .reduce(function(acc, args, i) {
      return acc.concat(mask[i].apply(null, Array.isArray(args) ? args : [args]));
    }, []);
};

if (typeof module === 'object' && typeof module.exports !== 'undefined') {
  module.exports = {
    unixtime: unixtime,
    uint8: uint8,
    uint16: uint16,
    uint32: uint32,
    temperature: temperature,
    humidity: humidity,
    latLng: latLng,
    bitmap: bitmap,
    encode: encode
  };
}
