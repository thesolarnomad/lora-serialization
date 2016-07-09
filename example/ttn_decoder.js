function (bytes) {
  // bytes is of type Buffer

  // IMPORTANT: paste code from src/decoder.js here

  return decode(
    bytes,
    [ unixtime,    latLng   ],
    [ 'timestamp', 'coords' ]
  );
}
