#if ARDUINO >= 100
 #include "Arduino.h"
#endif

#ifndef unixtimeToBytes
void unixtimeToBytes(byte *buf, uint32_t unixtime);
#endif

#ifndef latLngToBytes
void latLngToBytes(byte *buf, double latitude, double longitude);
#endif

#ifndef uint16ToBytes
void uint16ToBytes(byte *buf, uint16_t i);
#endif

#ifndef tempToBytes
void tempToBytes(byte *buf, float temperature);
#endif
