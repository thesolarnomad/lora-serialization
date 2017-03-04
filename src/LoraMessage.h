#ifndef _LORA_MESSAGE_H_
#define _LORA_MESSAGE_H_

#if ARDUINO >= 100
    #include "Arduino.h"
#else
    #include <stdint.h>
    typedef uint8_t byte;
#endif

#include "LoraEncoder.h"

class LoraMessage {
    public:
        LoraMessage();
        ~LoraMessage();
        LoraMessage& addUnixtime(uint32_t unixtime);
        LoraMessage& addLatLng(double latitude, double longitude);
        LoraMessage& addUint16(uint16_t i);
        LoraMessage& addTemperature(float temperature);
        LoraMessage& addUint8(uint8_t i);
        LoraMessage& addHumidity(float humidity);
        LoraMessage& addBitmap(bool a, bool b, bool c, bool d, bool e, bool f, bool g, bool h);
        byte* getBytes();
        int getLength();
    private:
        LoraEncoder _reallocBuffer(int delta);
        byte* _buffer;
        int _currentSize;
};

#endif
