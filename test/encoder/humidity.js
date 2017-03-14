import test from 'ava';
import { encoder } from '../../src';
import base from '../base';

test('should yell at you if the humidity is omitted', t => {
  t.throws(() => encoder.humidity());
  t.pass();
});
test('should yell at you if the humidity is incorrect', t => {
  t.throws(() => encoder.humidity(-0.01), /range/);
  t.throws(() => encoder.humidity(100.01), /range/);
  t.pass();
});
test('should be possible to encode a humidity', t => {
  t.deepEqual(encoder.humidity(base.humidity), base.humidityBytes);
  t.pass();
});
