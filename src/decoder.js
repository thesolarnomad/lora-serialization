var bytesToInt = function(bytes) {
  var i = 0;
  for(var x = 0; x < bytes.length; x++) {
    i |= +(bytes[x]<<(x*8));
  }
  return i;
};

var unixtime = function(bytes) {
    if (bytes.length !== 4) {
        throw new Error('Unix time must have exactly 4 bytes');
    }
    return bytesToInt(bytes);
};
unixtime.BYTES = 4;

var uint8 = function(bytes) {
    if (bytes.length !== 1) {
        throw new Error('int must have exactly 2 bytes');
    }
    return bytesToInt(bytes);
}
uint8.BYTES = 1;

var uint16 = function(bytes) {
    if (bytes.length !== 2) {
        throw new Error('int must have exactly 2 bytes');
    }
    return bytesToInt(bytes);
}
uint16.BYTES = 2;

var latLng = function(bytes) {
    if (bytes.length !== 8) {
        throw new Error('Lat/Long must have exactly 8 bytes');
    }

    var lat = bytesToInt(bytes.slice(0, 4));
    var lng = bytesToInt(bytes.slice(4, 8));

    return [lat/1e6, lng/1e6];
}
latLng.BYTES = 8;

var temp = function(bytes) {
    if (bytes.length !== 2) {
        throw new Error('Temperature must have exactly 2 bytes');
    }

    var t = bytesToInt(bytes);
    if (!!(bytes[1] & 0x60)) {
        t = ~t + 1;
    }

    return t / 1e2;
}
temp.BYTES = 2;

var humidity = function(bytes) {
    if (bytes.length !== 2) {
        throw new Error('Humidity must have exactly 2 bytes');
    }

    var h = bytesToInt(bytes);
    return h / 1e2;
}
humidity.BYTES = 2;

var decode = function(bytes, mask, names) {

    var maskLength = mask.reduce(function(prev, cur) {
        return prev + cur.BYTES;
    }, 0);
    if (bytes.length < maskLength) {
        throw new Error('Mask length is ' + maskLength + 'whereas input is ' + bytes.length);
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
}

if (typeof module === 'object' && typeof module.exports !== 'undefined') {
    module.exports = {
        unixtime: unixtime,
        uint8: uint8,
        uint16: uint16,
        temp: temp,
        humidity: humidity,
        latLng: latLng,
        decode: decode
    };
}
