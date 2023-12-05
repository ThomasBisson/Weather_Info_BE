import { describe, expect, test } from '@jest/globals';

import { mean, meterPerSecToKilometerPerHour } from '../../src/utils/math.util';
import WeatherInfoError from '../../src/utils/weatherInfoError.util';

describe('Mean', () => {
	test('mean of simple values', () => {
		expect(mean([1, 2, 3])).toBe(2);
	});

	test('mean of empty array', () => {
		expect(() => {
			mean([]);
		}).toThrowError(WeatherInfoError);
		expect(() => {
			mean([]);
		}).toThrowError('Impossible to mean an empty array');
	});
});

describe('Meter per sec to kilometer per hour', () => {
	test('simple value', () => {
		expect(meterPerSecToKilometerPerHour(1)).toBe(3.6);
	});

	test('with 0', () => {
		expect(meterPerSecToKilometerPerHour(0)).toBe(0);
	});

	test('with negative value', () => {
		expect(() => {
			meterPerSecToKilometerPerHour(-5);
		}).toThrowError(WeatherInfoError);
		expect(() => {
			meterPerSecToKilometerPerHour(-5);
		}).toThrowError('Impossible to have a mps inferior to 0');
	});
});
