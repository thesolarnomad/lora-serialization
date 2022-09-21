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

#define O_TEMP 0x01 // Temperature is a one-byte code
#define O_HUMI 0x02 // Humidity is a one-byte code
#define O_AIRP 0x03 // Air pressure is a one-byte code
#define O_GPS 0x04 // Short version: ONLY 3 bytes LAT and 3 bytes LONG
#define O_GPSL 0x05 // Long GPS
#define O_PIR 0x06 // Movement, 1 bit (=1 byte)
#define O_AQ 0x07 // Airquality
#define O_RTC 0x08 // Real Time Clock
#define O_COMPASS 0x09 // Compass
#define O_MB 0x0A // Multi Sensors 433
#define O_MOIST 0x0B // Moisture is one-byte
#define O_LUMI 0x0C // Luminescense u16
#define O_DIST 0x0D // Distance is 2-byte
#define O_GAS 0x0E // GAS

/* 0x10 to 0x1F are free */

#define O_BATT 0x20 // Internal Battery
#define O_ADC0 0x21 // AD converter on pin 0
#define O_ADC1 0x22

// Reserved for LoRa messages (especially downstream)
#define O_STAT 0x30 // Ask for status message from node
#define O_SF 0x31 // Spreading factor change OFF=0, values 7-12
#define O_TIM 0x32 // Timing of the wait cyclus (20 to 7200 seconds)
#define O_1CH 0x33 // Single channel ON=1, OFF==0
#define O_LOC 0x34 // Ask for the location. Responds with GPS location (if available)

#if ARDUINO >= 100
    #include "Arduino.h"
#endif
#include "LoraEncoder.h"

LoraEncoder::LoraEncoder(byte *buffer, bool opcodes) {
  _buffer = buffer;
  _opcodes = opcodes;
}

void LoraEncoder::_addOpcode(byte *buf, uint8_t byteMode, uint8_t byteSize) {
    buf[0] = byteMode << 2 | byteSize;
}

void LoraEncoder::_intToBytes(byte *buf, int32_t i, uint8_t byteSize) {
    for(uint8_t x = _opcodes; x < (byteSize + _opcodes); x++) {
        buf[x] = (byte) (i >> (x*8));
    }
}

void LoraEncoder::writeUnixtime(uint32_t unixtime) {
    if (_opcodes) { _addOpcode(_buffer, O_RTC, 4); }
    _intToBytes(_buffer, unixtime, 4);
    _buffer += 4 + _opcodes;
}

void LoraEncoder::writeLatLng(double latitude, double longitude) {
    int32_t lat = latitude * 1e6;
    int32_t lng = longitude * 1e6;

    _intToBytes(_buffer, lat, 4);
    _intToBytes(_buffer + 4, lng, 4);
    _buffer += 8;
}

void LoraEncoder::writeUint32(uint32_t i) {
    _intToBytes(_buffer, i, 4);
    _buffer += 4;
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
    if (_opcodes) { _addOpcode(_buffer, O_HUMI, 2); }
    int16_t h = (int16_t) (humidity * 100);
    _intToBytes(_buffer, h, 2);
    _buffer += 2 + _opcodes;
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
    _buffer[0] = (byte) ((t >> 8) & 0xFF);
    _buffer[1] = (byte) t & 0xFF;
    _buffer += 2;
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
  _intToBytes(_buffer, asbytes, 4);
  _buffer += 4;
}
