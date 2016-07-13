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
}

void LoraEncoder::_intToBytes(byte *buf, int32_t i, uint8_t byteSize) {
    for(uint8_t x = 0; x < byteSize; x++) {
        buf[x] = (byte) (i >> (x*8));
    }
}

void LoraEncoder::writeUnixtime(uint32_t unixtime) {
    _intToBytes(_buffer, unixtime, 4);
    _buffer += 4;
}

void LoraEncoder::writeLatLng(double latitude, double longitude) {
    int32_t lat = latitude * 1e6;
    int32_t lng = longitude * 1e6;

    _intToBytes(_buffer, lat, 4);
    _intToBytes(_buffer + 4, lng, 4);
    _buffer += 8;
}

void LoraEncoder::writeUint16(uint16_t i) {
    _intToBytes(_buffer, i, 2);
    _buffer += 2;
}

void LoraEncoder::writeUint8(uint8_t i) {
    _intToBytes(_buffer, i, 1);
    _buffer += 1;
}

void LoraEncoder::writeHumidity(float humidity) {
    int16_t h = (int16_t) (humidity * 100);
    _intToBytes(_buffer, h, 2);
    _buffer += 2;
}

/**
* Uses a 16bit two's complement with two decimals, so the range is
* -327.68 to +327.67 degrees
*/
void LoraEncoder::writeTemperature(float temperature) {
    int16_t t = (int16_t) (temperature * 100);
    if(temperature < 0) {
        t = ~t;
        t = t + 1;
    }
    _intToBytes(_buffer, t, 2);
    _buffer += 2;
}
