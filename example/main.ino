#include <LoraEncoder.h>

byte mydata[12];

void setup() {
    LoraEncoder encoder(mydata);
    encoder.writeUnixtime(1468075322);
    encoder.writeLatLng(-33.905024, 151.26648);

    do_send(&sendjob);
}

void loop(void) {
    os_runloop_once();
}
