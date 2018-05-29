#include <LoraMessage.h>

void setup() {
    LoraMessage message;
    message.addUnixtime(1468075322);
    message.addLatLng(-33.905024, 151.26648);

    do_send(message.getLength(), message.getBytes());
}

void loop(void) {
    os_runloop_once();
}
