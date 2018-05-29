function ttn_encoder() {
  // IMPORTANT: paste code from src/encoder.js here
  // IMPORTANT: paste code from src/LoraMessage.js here

  return new LoraMessage()
    .addUnixtime(Date.now() / 1000)
    .addLatLng(-33.905052, 151.26641);
}
