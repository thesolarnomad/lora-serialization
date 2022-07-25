# LoRaWAN serialization/deserialization library for The Things Network

[![Build Status](https://travis-ci.org/thesolarnomad/lora-serialization.svg?branch=master)](https://travis-ci.org/thesolarnomad/lora-serialization)
[![Coverage Status](https://coveralls.io/repos/github/thesolarnomad/lora-serialization/badge.svg?branch=master)](https://coveralls.io/github/thesolarnomad/lora-serialization?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This fully unit-tested library allows you to encode your data on the Arduino side and decode it on the [TTN](https://console.thethingsnetwork.org/) side. It provides both a C-based encoder and a JavaScript-based decoder.

Since version 2.2.0 there is also an encoder for the TTN side.

## In short

### Encoding on Arduino, decoding in TTN
Arduino side:
```cpp
#include "LoraMessage.h"

LoraMessage message;

message
    .addUnixtime(1467632413)
    .addLatLng(-33.905052, 151.26641);

lora_send_bytes(message.getBytes(), message.getLength());
delete message;
```
TTN side:
```javascript
// include src/decoder.js
var json = decode(bytes, [unixtime, latLng], ['time', 'coords']);
// json == {time: unixtime, coords: [latitude, longitude]}
```

### Encoding in TTN
TTN side:
```javascript
// include src/encoder.js
var bytes = encode([timestamp, [latitude, longitude]], [unixtime, latLng]);
// bytes is of type Buffer
```


#### With the convenience class

```javascript
// include src/encoder.js
// include src/LoraMessage.js
var bytes = new LoraMessage(encoder)
    .addUnixtime(1467632413)
    .addLatLng(-33.905052, 151.26641)
    .addBitmap(true, true, false, true)
    .getBytes();
// bytes = <Buffer 1d 4b 7a 57 64 a6 fa fd 6a 24 04 09 d0>
```

and then decoding as usual:

```js
var result = decoder.decode(
    bytes,
    [decoder.unixtime, decoder.latLng, decoder.bitmap],
    ['time', 'coords', 'heaters']
);
// result =
// { time: 1467632413,
//  coords: [ -33.905052, 151.26641 ],
//  heaters:
//   { a: true,
//     b: true,
//     c: false,
//     d: true,
//     e: false,
//     f: false,
//     g: false,
//     h: false } }
```

## General Usage

### Unix time (4 bytes)
Serializes/deserializes a unix time (seconds)

```cpp
#include "LoraEncoder.h"

byte buffer[4];
LoraEncoder encoder(buffer);
encoder.writeUnixtime(1467632413);
// buffer == {0x1d, 0x4b, 0x7a, 0x57}
```
and then in the TTN frontend, use the following method:

```javascript
unixtime(bytes.slice(x, x + 4)) // 1467632413
```

### GPS coordinates (8 bytes)
Serializes/deserializes coordinates (latitude/longitude) with a precision of 6 decimals.

```cpp
#include "LoraEncoder.h"

byte buffer[8];
LoraEncoder encoder(buffer);
encoder.writeLatLng(-33.905052, 151.26641);
// buffer == {0x64, 0xa6, 0xfa, 0xfd, 0x6a, 0x24, 0x04, 0x09}
```
and then in the TTN frontend, use the following method:

```javascript
latLng(bytes.slice(x, x + 8)) // [-33.905052, 151.26641]
```

### Unsigned 8bit Integer (1 byte)
Serializes/deserializes an unsigned 8bit integer.

```cpp
#include "LoraEncoder.h"

byte buffer[1];
LoraEncoder encoder(buffer);
uint8_t i = 10;
encoder.writeUint8(i);
// buffer == {0x0A}
```
and then in the TTN frontend, use the following method:

```javascript
uint8(bytes.slice(x, x + 1)) // 10
```

### Unsigned 16bit Integer (2 bytes)
Serializes/deserializes an unsigned 16bit integer.

```cpp
#include "LoraEncoder.h"

byte buffer[2];
LoraEncoder encoder(buffer);
uint16_t i = 23453;
encoder.writeUint16(i);
// buffer == {0x9d, 0x5b}
```
and then in the TTN frontend, use the following method:

```javascript
uint16(bytes.slice(x, x + 2)) // 23453
```

### Unsigned 32bit Integer (4 bytes)
Serializes/deserializes an unsigned 32bit integer.

```cpp
#include "LoraEncoder.h"

byte buffer[4];
LoraEncoder encoder(buffer);
uint32_t i = 2864434397;
encoder.writeUint32(i);
// buffer == {0xdd, 0xcc, 0xbb, 0xaa}
```
and then in the TTN frontend, use the following method:

```javascript
uint32(bytes.slice(x, x + 4)) // 2864434397
```

### Temperature (2 bytes)
Serializes/deserializes a temperature reading between -327.68 and +327.67 (inclusive) with a precision of 2 decimals.

```cpp
#include "LoraEncoder.h"

byte buffer[2];
LoraEncoder encoder(buffer);
encoder.writeTemperature(-123.45);
// buffer == {0xcf, 0xc7}
```
and then in the TTN frontend, use the following method:

```javascript
temperature(bytes.slice(x, x + 2)) // -123.45
```

### Humidity (2 bytes)
Serializes/deserializes a humidity reading between 0 and 100 (inclusive) with a precision of 2 decimals.

```cpp
#include "LoraEncoder.h"

byte buffer[2];
LoraEncoder encoder(buffer);
encoder.writeHumidity(99.99);
// buffer == {0x0f, 0x27}
```
and then in the TTN frontend, use the following method:

```javascript
humidity(bytes.slice(x, x + 2)) // 99.99
```

### Full float (4 bytes)
Serializes/deserializes a full 4-byte float.

```cpp
#include "LoraEncoder.h"

byte buffer[4];
LoraEncoder encoder(buffer);
encoder.writeRawFloat(99.99);
// buffer == {0xe1, 0xfa, 0xc7, 0x42}
```
and then in the TTN frontend, use the following method:

```javascript
rawfloat(bytes.slice(x, x + 4)) // 99.99
```

### Bitmap (1 byte)
Serializes/deserializes a bitmap containing between 0 and 8 different flags.

```cpp
#include "LoraEncoder.h"

byte buffer[1];
LoraEncoder encoder(buffer);
encoder.writeBitmap(true, false, false, false, false, false, false, false);
// buffer == {0x80}
```
and then in the TTN frontend, use the following method:

```javascript
bitmap(bytes.slice(x, x + 1)) // { a: true, b: false, c: false, d: false, e: false, f: false, g: false, h: false }
```

## Composition

### On the Arduino side
The decoder allows you to write more than one value to a byte array:
```cpp
#include "LoraEncoder.h"

byte buffer[19];
LoraEncoder encoder(buffer);

encoder.writeUnixtime(1467632413);
encoder.writeLatLng(-33.905052, 151.26641);
encoder.writeUint8(10);
encoder.writeUint16(23453);
encoder.writeUint32(2864434397);
encoder.writeTemperature(80.12);
encoder.writeHumidity(99.99);
encoder.writeRawFloat(99.99);
encoder.writeBitmap(true, false, false, false, false, false, false, false);
/* buffer == {
    0x1d, 0x4b, 0x7a, 0x57, // Unixtime
    0x64, 0xa6, 0xfa, 0xfd, 0x6a, 0x24, 0x04, 0x09, // latitude,longitude
    0x0A, // Uint8
    0x9d, 0x5b, // Uint16
    0xdd, 0xcc, 0xbb, 0xaa, // Uint32
    0x1f, 0x4c, // temperature
    0x0f, 0x27, // humidity
    0xe1, 0xfa, 0xc7, 0x42, // 4-byte float
    0x80 // bitmap
}
*/
```

#### Convenience class `LoraMessage`
There is a convenience class that represents a LoraMessage that you can add readings to:
```cpp
#include "LoraMessage.h"

LoraMessage message;

message
    .addUnixtime(1467632413)
    .addLatLng(-33.905052, 151.26641)
    .addUint8(10)
    .addUint16(23453)
    .addUint32(2864434397)
    .addTemperature(80.12)
    .addHumidity(99.99)
    .addRawFloat(99.99)
    .addBitmap(false, false, false, false, false, false, true, false);

send(message.getBytes(), message.getLength());
/*
getBytes() == {
    0x1d, 0x4b, 0x7a, 0x57, // Unixtime
    0x64, 0xa6, 0xfa, 0xfd, 0x6a, 0x24, 0x04, 0x09, // latitude,longitude
    0x0A, // Uint8
    0x9d, 0x5b, // Uint16
    0xdd, 0xcc, 0xbb, 0xaa, // Uint32
    0x1f, 0x4c, // temperature
    0x0f, 0x27, // humidity
    0xe1, 0xfa, 0xc7, 0x42, // 4-byte float
    0xfd // Bitmap
}
and
getLength() == 28
*/
```

### Composition in the TTN decoder frontend with the `decode` method

The `decode` method allows you to specify a mask for the incoming byte buffer (that was generated by this library) and apply decoding functions accordingly.

```javascript
decode(byte Array, mask Array [,mapping Array])
```

#### Example
Paste everything from `src/decoder.js` into the decoder method and use like this:

```javascript
function (bytes) {
    // code from src/decoder.js here
    return decode(bytes, [latLng, unixtime], ['coords', 'time']);
}
```
This maps the incoming byte buffer of 12 bytes to a sequence of one `latLng` (8 bytes) and one `unixtime` (4 bytes) sequence and maps the first one to a key `coords` and the second to a key `time`.

You can use: `64 A6 FA FD 6A 24 04 09 1D 4B 7A 57` for testing, and it will result in:

```json
{
  "coords": [
    -33.905052,
    151.26641
  ],
  "time": 1467632413
}
```
##### Example decoder in the TTN console
Set up your decoder in the console:
![TTN console decoder example](https://cloud.githubusercontent.com/assets/188038/23703580/c136cc90-0454-11e7-9570-ae137136d7b5.png)

##### Example converter in the TTN console
The decode method already does most of the necessary transformations, so in most cases you can just pass the data through:
![TTN console converter example](https://cloud.githubusercontent.com/assets/188038/23703587/c99021c0-0454-11e7-8670-9f77472a111d.png)

## Development

* Install the dependencies via `yarn`
* Run the unit tests (C) via `yarn run test:c`
* Run the unit tests (JavaScript) via `yarn test`
* Check the coverage (JavaScript) via `yarn coverage` (see `coverage/lcov-report`)

The CI will kick off once you create a pull request automatically.
