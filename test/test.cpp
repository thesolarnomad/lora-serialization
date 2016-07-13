TEST_CASE( "LoRa Serialization", "[LoRa]" ) {

    SECTION( "should transform a simple unixtime to a byte array" ) {
        byte x[4];
        LoraEncoder encoder(x);
        encoder.writeUnixtime(1);
        byte expected[] = {1, 0, 0, 0};
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "should transform a given unixtime to a byte array" ) {
        uint32_t now = 1467632413;
        byte x[4];
        LoraEncoder encoder(x);
        byte expected[] = {0x1d, 0x4b, 0x7a, 0x57};

        encoder.writeUnixtime(now);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "latLngToBytes should transform a coordinate to a byte array" ) {
        byte x[8];
        LoraEncoder encoder(x);
        byte expected[] = {0x64, 0xa6, 0xfa, 0xfd, 0x6a, 0x24, 0x04, 0x09};

        encoder.writeLatLng(-33.905052, 151.26641);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "uint8ToBytes should transform an unsigned 8bit int to a byte array" ) {
        byte x[1];
        LoraEncoder encoder(x);
        byte expected[] = {0x0A};

        encoder.writeUint8(10);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "uint16ToBytes should transform an unsigned 16bit int to a byte array" ) {
        byte x[2];
        LoraEncoder encoder(x);
        byte expected[] = {0x9d, 0x5b};

        encoder.writeUint16(23453);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "tempToBytes should transform a temperature to a byte array" ) {
        byte x[2];
        LoraEncoder encoder(x);
        byte expected[] = {0x4c, 0x1f};

        encoder.writeTemperature(80.12);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "tempToBytes should transform a negative temperature to a byte array" ) {
        byte x[2];
        LoraEncoder encoder(x);
        byte expected[] = {0x39, 0x30};

        encoder.writeTemperature(-123.45);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "humidityToBytes should transform a humidity to a byte array" ) {
        byte x[2];
        LoraEncoder encoder(x);
        byte expected[] = {0x0f, 0x27};

        encoder.writeHumidity(99.99);
        compare_array(expected, x, 0, sizeof(expected));
    }

    SECTION( "write multiple fields to one byte array" ) {
        byte x[19];
        LoraEncoder encoder(x);
        byte expected[] = {
            0x1d, 0x4b, 0x7a, 0x57, // Unixtime
            0x64, 0xa6, 0xfa, 0xfd, 0x6a, 0x24, 0x04, 0x09, // coordinate
            0x0A, // Uint8
            0x9d, 0x5b, // Uint16
            0x4c, 0x1f, // temperature
            0x0f, 0x27 // humidity
        };

        encoder.writeUnixtime(1467632413);
        encoder.writeLatLng(-33.905052, 151.26641);
        encoder.writeUint8(10);
        encoder.writeUint16(23453);
        encoder.writeTemperature(80.12);
        encoder.writeHumidity(99.99);

        compare_array(expected, x, 0, sizeof(expected));
    }
}
