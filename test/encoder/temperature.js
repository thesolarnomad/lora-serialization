import test from 'ava';
import { encoder } from '../../src';
import base from '../base';

test('should yell at you if the temperature is omitted', t => {
  t.throws(() => encoder.temperature());
  t.pass();
});

test('should yell at you if the temperature is incorrect', t => {
  t.throws(() => encoder.temperature(-327.69), /range/);
  t.throws(() => encoder.temperature(327.68), /range/);
  t.pass();
});

test('should be possible to encode a temperature', t => {
  t.deepEqual(encoder.temperature(base.temp), base.tempBytes);
  t.pass();
});

test('should be possible to encode a negative temperature', t => {
  t.deepEqual(encoder.temperature(base.negativeTemp), base.negativeTempBytes);
  t.pass();
});
