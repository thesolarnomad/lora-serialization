/*
  LoraEncoder.cpp - Base class for the Lora serialization library

  The MIT License (MIT)

  Copyright (c) 2016 Joscha Feth

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/

#if ARDUINO >= 100
    #include "Arduino.h"
#endif
#include "LoraEncoder.h"

LoraEncoder::LoraEncoder(byte *buffer) {
  _buffer = buffer;
  _offset = 0;
}

void LoraEncoder::_intToBytes(byte *buf, int32_t i, uint8_t byteSize) {
    for(uint8_t x = 0; x < byteSize; x++) {
        buf[x] = (byte) (i >> (x*8));
    }
}

void LoraEncoder::writeUnixtime(uint32_t unixtime) {
    _intToBytes(_buffer + _offset, unixtime, 4);
    _offset += 4;
}

void LoraEncoder::writeLatLng(double latitude, double longitude) {
    int32_t lat = latitude * 1e6;
    int32_t lng = longitude * 1e6;

    _intToBytes(_buffer + _offset, lat, 4);
    _offset += 4;
    _intToBytes(_buffer + _offset, lng, 4);
    _offset += 4;
}

void LoraEncoder::writeUint32(uint32_t i) {
    _intToBytes(_buffer + _offset, i, 4);
    _offset += 4;
}

void LoraEncoder::writeUint16(uint16_t i) {
    _intToBytes(_buffer + _offset, i, 2);
    _offset += 2;
}

void LoraEncoder::writeUint8(uint8_t i) {
    _intToBytes(_buffer + _offset, i, 1);
    _offset += 1;
}

void LoraEncoder::writeHumidity(float humidity) {
    int16_t h = (int16_t) (humidity * 100);
    _intToBytes(_buffer + _offset, h, 2);
    _offset += 2;
}

/**
* Uses a 16bit two's complement with two decimals, so the range is
* -327.68 to +327.67 degrees
*/
void LoraEncoder::writeTemperature(float temperature) {
    int16_t t = (int16_t) (temperature * 100);
    if (temperature < 0) {
        t = ~-t;
        t = t + 1;
    }
    _buffer[_offset  ] = (byte) ((t >> 8) & 0xFF);
    _buffer[_offset+1] = (byte) t & 0xFF;
    _offset += 2;
}

void LoraEncoder::writeBitmap(bool a, bool b, bool c, bool d, bool e, bool f, bool g, bool h) {
    uint8_t bitmap = 0;
    // LSB first
    bitmap |= (a & 1) << 7;
    bitmap |= (b & 1) << 6;
    bitmap |= (c & 1) << 5;
    bitmap |= (d & 1) << 4;
    bitmap |= (e & 1) << 3;
    bitmap |= (f & 1) << 2;
    bitmap |= (g & 1) << 1;
    bitmap |= (h & 1) << 0;
    writeUint8(bitmap);
}

void LoraEncoder::writeRawFloat(float value) {
  uint32_t asbytes=*(reinterpret_cast<uint32_t*>(&value));
  _intToBytes(_buffer + _offset, asbytes, 4);
  _offset += 4;
}

int LoraEncoder::getLength(void) {
    return _offset;
}
