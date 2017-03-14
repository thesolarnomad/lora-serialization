import test from 'ava';
import { decoder, encoder } from '../../src';

test('with 0.01', t => {
  const buf = encoder.encode([0.01], [encoder.temperature]);
  const back = decoder.decode(buf, [decoder.temperature])[0];
  t.is(back, 0.01);
  t.pass();
});

test('with all temperatures', t => {
  for (let temperature = -327.6; temperature < 327.6; temperature += 0.1) {
    temperature = +temperature.toFixed(1);
    const buf = encoder.encode([temperature], [encoder.temperature]);
    const back = decoder.decode(buf, [decoder.temperature])[0];
    t.is(back.toFixed(1), temperature.toFixed(1));
  }
  t.pass();
});
