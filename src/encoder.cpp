void intToBytes(byte *buf, int32_t i, uint8_t byteSize) {
    for(uint8_t x = 0; x < byteSize; x++) {
        buf[x] = (byte) (i >> (x*8));
    }
}

void unixtimeToBytes(byte *buf, uint32_t unixtime) {
    intToBytes(buf, unixtime, 4);
}

void latLngToBytes(byte *buf, double latitude, double longitude) {
    int32_t lat = latitude * 1e6;
    int32_t lng = longitude * 1e6;

    intToBytes(buf, lat, 4);
    intToBytes(buf + 4, lng, 4);
}

void uintToBytes(byte *buf, uint16_t i) {
    intToBytes(buf, i, 2);
}

/**
* Uses a 16bit two's complement with two decimals, so the range is
* -327.68 to +327.67 degrees
*/
void tempToBytes(byte *buf, float temperature) {
    int16_t t = (int16_t) (temperature * 100);
    if(temperature < 0) {
        t = ~t;
        t = t + 1;
    }
    intToBytes(buf, t, 2);
}
