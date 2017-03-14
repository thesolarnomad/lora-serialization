import test from 'ava';
import { decoder, encoder } from '../../src';

test('with a positive latLng', t => {
  const latLng = [90, 180];
  const buf = encoder.encode([latLng], [encoder.latLng]);
  const back = decoder.decode(buf, [decoder.latLng])[0];
  t.deepEqual(back, latLng);
  t.pass();
});

test('with a negative latLng', t => {
  const latLng = [-90, -180];
  const buf = encoder.encode([latLng], [encoder.latLng]);
  const back = decoder.decode(buf, [decoder.latLng])[0];
  t.deepEqual(back, latLng);
  t.pass();
});

function fixTuple(tuple, precision) {
  return tuple.map(t => +Number(t).toFixed(precision));
}

test('with a latitude range', t => {
  for(var lat = -90; lat < 90; lat+=0.01) {
    const latLng = [lat, 0];
    const buf = encoder.encode([latLng], [encoder.latLng]);
    const back = decoder.decode(buf, [decoder.latLng])[0];
    t.deepEqual(fixTuple(back, 2), fixTuple(latLng, 2));
  }

  t.pass();
});

test('with a longitude range', t => {
  for(var long = -180; long < 180; long+=0.01) {
    const latLng = [0, long];
    const buf = encoder.encode([latLng], [encoder.latLng]);
    const back = decoder.decode(buf, [decoder.latLng])[0];
    t.deepEqual(fixTuple(back, 2), fixTuple(latLng, 2));
  }

  t.pass();
});
