void printByteArrayToHex(byte *arr) {
    for(int i = 0; i < sizeof(arr); i++) {
        printf("%02x", arr[i]);
    }
    printf("\n");
}

void compare_array(byte *arr1, byte *arr2, int start, int len) {
    for(int i = start; i < start + len; i++) {
        REQUIRE(arr1[i] == arr2[i]);
    }
}
