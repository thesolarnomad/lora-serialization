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

TEST_CASE( "LoRa Message", "[LoRa]" ) {
    SECTION( "should provide a convenient way to add unixtime" ) {
        uint32_t now = 1467632413;
        byte expected[] = {0x1d, 0x4b, 0x7a, 0x57};
        LoraMessage message;

        message.addUnixtime(now);

        REQUIRE(message.getLength() == sizeof(expected));
        compare_array(expected, message.getBytes(), 0, sizeof(expected));
    }

    SECTION( "should provide a convenient way to add latLng" ) {
        byte expected[] = {0x64, 0xa6, 0xfa, 0xfd, 0x6a, 0x24, 0x04, 0x09};
        LoraMessage message;

        message.addLatLng(-33.905052, 151.26641);

        REQUIRE(message.getLength() == sizeof(expected));
        compare_array(expected, message.getBytes(), 0, sizeof(expected));
    }

    SECTION( "should provide a convenient way to add an unsigned 8bit int" ) {
        byte expected[] = {0x0A};
        LoraMessage message;

        message.addUint8(10);

        REQUIRE(message.getLength() == sizeof(expected));
        compare_array(expected, message.getBytes(), 0, sizeof(expected));
    }

    SECTION( "should provide a convenient way to add an unsigned 16bit int" ) {
        byte expected[] = {0x9d, 0x5b};
        LoraMessage message;

        message.addUint16(23453);

        REQUIRE(message.getLength() == sizeof(expected));
        compare_array(expected, message.getBytes(), 0, sizeof(expected));
    }

    SECTION( "should provide a convenient way to add a temperature" ) {
        byte expected[] = {0x4c, 0x1f};
        LoraMessage message;

        message.addTemperature(80.12);

        REQUIRE(message.getLength() == sizeof(expected));
        compare_array(expected, message.getBytes(), 0, sizeof(expected));
    }

    SECTION( "should provide a convenient way to add a humidity" ) {
        byte expected[] = {0x0f, 0x27};
        LoraMessage message;

        message.addHumidity(99.99);

        REQUIRE(message.getLength() == sizeof(expected));
        compare_array(expected, message.getBytes(), 0, sizeof(expected));
    }

    SECTION( "should provide a convenient way to add a bitmap" ) {
        byte expected[] = {0x80};
        LoraMessage message;

        message.addBitmap(true, false, false, false, false, false, false, false);

        REQUIRE(message.getLength() == sizeof(expected));
        compare_array(expected, message.getBytes(), 0, sizeof(expected));
    }

    SECTION( "should allow chaining" ) {
        byte expected[] = {
            0x1d, 0x4b, 0x7a, 0x57, // Unixtime
            0x64, 0xa6, 0xfa, 0xfd, 0x6a, 0x24, 0x04, 0x09, // coordinate
            0x0A, // Uint8
            0x9d, 0x5b, // Uint16
            0x4c, 0x1f, // temperature
            0x0f, 0x27, // humidity
            0x1e, 0x4b, 0x7a, 0x57, // Unixtime,
            0xfd // Bitmap
        };
        LoraMessage message;

        message
            .addUnixtime(1467632413)
            .addLatLng(-33.905052, 151.26641)
            .addUint8(10)
            .addUint16(23453)
            .addTemperature(80.12)
            .addHumidity(99.99)
            .addUnixtime(1467632414)
            .addBitmap(true, true, true, true, true, true, false, true);

        REQUIRE(message.getLength() == sizeof(expected));
        compare_array(expected, message.getBytes(), 0, sizeof(expected));
    }
}
