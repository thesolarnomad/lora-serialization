var bytesToInt = function(bytes) {
  var i = 0;
  for (var x = 0; x < bytes.length; x++) {
    i |= +(bytes[x] << (x * 8));
  }
  return i;
};

var unixtime = function(bytes) {
  if (bytes.length !== unixtime.BYTES) {
    throw new Error('Unix time must have exactly 4 bytes');
  }
  return bytesToInt(bytes);
};
unixtime.BYTES = 4;

var uint8 = function(bytes) {
  if (bytes.length !== uint8.BYTES) {
    throw new Error('int must have exactly 1 byte');
  }
  return bytesToInt(bytes);
};
uint8.BYTES = 1;

var uint16 = function(bytes) {
  if (bytes.length !== uint16.BYTES) {
    throw new Error('int must have exactly 2 bytes');
  }
  return bytesToInt(bytes);
};
uint16.BYTES = 2;

var latLng = function(bytes) {
  if (bytes.length !== latLng.BYTES) {
    throw new Error('Lat/Long must have exactly 8 bytes');
  }

  var lat = bytesToInt(bytes.slice(0, latLng.BYTES / 2));
  var lng = bytesToInt(bytes.slice(latLng.BYTES / 2, latLng.BYTES));

  return [lat / 1e6, lng / 1e6];
};
latLng.BYTES = 8;

var temperature = function(bytes) {
  if (bytes.length !== temperature.BYTES) {
    throw new Error('Temperature must have exactly 2 bytes');
  }
  var isNegative = bytes[0] & 0x80;
  var b = ('00000000' + Number(bytes[0]).toString(2)).slice(-8)
        + ('00000000' + Number(bytes[1]).toString(2)).slice(-8);
  if (isNegative) {
    var arr = b.split('').map(function(x) { return !Number(x); });
    for (var i = arr.length - 1; i > 0; i--) {
      arr[i] = !arr[i];
      if (arr[i]) {
        break;
      }
    }
    b = arr.map(Number).join('');
  }
  var t = parseInt(b, 2);
  if (isNegative) {
    t = -t;
  }
  return t / 1e2;
};
temperature.BYTES = 2;

var humidity = function(bytes) {
  if (bytes.length !== humidity.BYTES) {
    throw new Error('Humidity must have exactly 2 bytes');
  }

  var h = bytesToInt(bytes);
  return h / 1e2;
};
humidity.BYTES = 2;

var bitmap = function(byte) {
  if (byte.length !== bitmap.BYTES) {
    throw new Error('Bitmap must have exactly 1 byte');
  }
  var i = bytesToInt(byte);
  var bm = Number(i).toString(2).split('').map(Number).map(Boolean);
  return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    .reduce(function(obj, pos, index) {
      obj[pos] = bm[index];
      return obj;
    }, {});
};
bitmap.BYTES = 1;

var decode = function(bytes, mask, names) {

  var maskLength = mask.reduce(function(prev, cur) {
    return prev + cur.BYTES;
  }, 0);
  if (bytes.length < maskLength) {
    throw new Error('Mask length is ' + maskLength + ' whereas input is ' + bytes.length);
  }

  names = names || [];
  var offset = 0;
  return mask
    .map(function(decodeFn) {
      var current = bytes.slice(offset, offset += decodeFn.BYTES);
      return decodeFn(current);
    })
    .reduce(function(prev, cur, idx) {
      prev[names[idx] || idx] = cur;
      return prev;
    }, {});
};

if (typeof module === 'object' && typeof module.exports !== 'undefined') {
  module.exports = {
    unixtime: unixtime,
    uint8: uint8,
    uint16: uint16,
    temperature: temperature,
    humidity: humidity,
    latLng: latLng,
    bitmap: bitmap,
    decode: decode
  };
}
