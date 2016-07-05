#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "lib/Catch/single_include/catch.hpp"
#ifndef Arduino_h
    #include <stdint.h>
    typedef uint8_t byte;
#endif
