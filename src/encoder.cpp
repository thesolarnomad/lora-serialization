void intToBytes(byte *buf, int32_t i, uint8_t byteSize) {
    for(int x = 0; x < byteSize; x++) {
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

void intToBytes(byte *buf, int16_t i) {
    intToBytes(buf, i, 2);
}
