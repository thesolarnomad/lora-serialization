import test from 'ava';
import { decoder } from '../../src';
import base from '../base';

test('should yell at you if the buffer is omitted', t => {
  t.throws(() => decoder.temperature(), /undefined/);
  t.pass();
});

test('should yell at you if the buffer size is incorrect', t => {
  t.throws(() => decoder.temperature(new Buffer([1])), /must have/);
  t.pass();
});

test('should be possible to decode a temperature', t => {
  t.is(decoder.temperature(base.tempBytes), base.temp);
  t.pass();
});

test('should be possible to decode a negative temperature', t => {
  t.is(decoder.temperature(base.negativeTempBytes), base.negativeTemp);
  t.pass();
});
