void compare_array(byte *arr1, byte *arr2, int start, int len) {
    REQUIRE(sizeof(arr1) == sizeof(arr2));
    for(int i = start; i < start + len; i++) {
        REQUIRE(arr1[i] == arr2[i]);
    }
}

void printByteArrayToHex(byte *arr) {
    for(int i = 0; i < sizeof(arr); i++) {
        printf("%02x", arr[i]);
    }
}
