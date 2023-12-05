import { describe, expect, jest, test } from '@jest/globals';

import * as currentController from '../../../src/controllers/weather/current.controller';

import { WeatherbitCurrentData } from '../../../src/types/weatherbit.type';

import { readMockJsonFile } from '../../../src/utils/file.util';

const spyGetWeatherbitData = jest.spyOn(currentController, 'getWeatherbitData');

describe('Current Controller', () => {
	test('return value for paris', async () => {
		const city = 'paris';
		const data = readMockJsonFile(city, 'current') as WeatherbitCurrentData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		expect(await currentController.default(city)).toMatchSnapshot();
	});

	test('return value for toulouse', async () => {
		const city = 'toulouse';
		const data = readMockJsonFile(city, 'current') as WeatherbitCurrentData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		expect(await currentController.default(city)).toMatchSnapshot();
	});

	test('return value for memphis', async () => {
		const city = 'memphis';
		const data = readMockJsonFile(city, 'current') as WeatherbitCurrentData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		expect(await currentController.default(city)).toMatchSnapshot();
	});

	test('return value for sydney', async () => {
		const city = 'sydney';
		const data = readMockJsonFile(city, 'current') as WeatherbitCurrentData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		expect(await currentController.default(city)).toMatchSnapshot();
	});
});
