import test from 'ava';
import { decoder } from '../../src';
import base from '../base';

test('should yell at you if the buffer is omitted', t => {
  t.throws(() => decoder.humidity(), /undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  t.throws(() => decoder.humidity([1]), /must have/);
  t.pass();
});

test('should be possible to decode a humidity', t => {
  t.is(decoder.humidity(base.humidityBytes), base.humidity);
  t.pass();
});
