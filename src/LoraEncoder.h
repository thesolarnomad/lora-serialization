#ifndef LoraEncoder_h
#define LoraEncoder_h

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
    private:
        byte* _buffer;
        void _intToBytes(byte *buf, int32_t i, uint8_t byteSize);
};

#endif
