#include <encoder.h>

static mydata[12];

void setup() {
    unixtimeToBytes(mydata +  0, 1468075322);
    latLngToBytes(mydata   +  4, -33.905024, 151.26648);

    do_send(&sendjob);
}

void loop(void) {
    os_runloop_once();
}
