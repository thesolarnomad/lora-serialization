function ttn_encoder() {
  // IMPORTANT: paste code from src/encoder.js here

  return encode(
    [ Date.now() / 1000,    [-33.905052, 151.26641]   ],
    [ unixtime,             latLng                    ]
  );
}
