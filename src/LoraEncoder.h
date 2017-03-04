/*
  LoraEncoder.h - Main h file for the Lora serialization library

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

#ifndef _LORA_ENCODER_H_
#define _LORA_ENCODER_H_

#if ARDUINO >= 100
    #include "Arduino.h"
#else
    #include <stdint.h>
    typedef uint8_t byte;
#endif

class LoraEncoder {
    public:
        LoraEncoder(byte *buffer);
        void writeUnixtime(uint32_t unixtime);
        void writeLatLng(double latitude, double longitude);
        void writeUint16(uint16_t i);
        void writeTemperature(float temperature);
        void writeUint8(uint8_t i);
        void writeHumidity(float humidity);
        void writeBitmap(bool a, bool b, bool c, bool d, bool e, bool f, bool g, bool h);
    private:
        byte* _buffer;
        void _intToBytes(byte *buf, int32_t i, uint8_t byteSize);
};

#endif
