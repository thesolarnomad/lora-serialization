TEST_CASE( "LoRaWAN Serialization", "[LoRaWAN]" ) {

    SECTION( "should transform a simple unixtime to a byte array" ) {
        byte x[] = {-1, -1, -1, -1};
        unixtimeToBytes(x, 1);
        byte expected[] = {1, 0, 0, 0};
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "should transform a given unixtime to a byte array" ) {
        uint32_t now = 1467632413;
        byte x[] = {-1, -1, -1, -1};
        byte expected[] = {0x1d, 0x4b, 0x7a, 0x57};

        unixtimeToBytes(x, now);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "latLngToBytes should transform a coordinate to a byte array" ) {
        byte x[] = {-1, -1, -1, -1, -1, -1, -1, -1};
        byte expected[] = {0x64, 0xa6, 0xfa, 0xfd, 0x6a, 0x24, 0x04, 0x09};

        latLngToBytes(x, -33.905052, 151.26641);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "intToBytes should transform an int to a byte array" ) {
        byte x[] = {-1, -1};
        byte expected[] = {0x9d, 0x5b};

        uintToBytes(x, 23453);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "temperatureToBytes should transform a temperature to a byte array" ) {
        byte x[] = {-1, -1};
        byte expected[] = {0x4c, 0x1f};

        tempToBytes(x, 80.12);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "temperatureToBytes should transform a negative temperature to a byte array" ) {
        byte x[] = {-1, -1};
        byte expected[] = {0x39, 0x30};

        tempToBytes(x, -123.45);
        compare_array(expected, x, 0, sizeof(expected));
    }
}
