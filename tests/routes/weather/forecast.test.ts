import { describe, expect, jest, test } from '@jest/globals';
import request from 'supertest';

import app from './../../../src/app';

import * as forecastController from '../../../src/controllers/weather/forecast.controller';

import { WeatherbitForecastData } from '../../../src/types/weatherbit.type';

import { readMockJsonFile } from '../../../src/utils/file.util';

const spyGetWeatherbitData = jest.spyOn(forecastController, 'getWeatherbitData');

describe('Integration /weather/forecast', () => {
	test('return status 200 and result is OK for paris', async () => {
		const city = 'paris';
		const data = readMockJsonFile(city, 'forecast') as WeatherbitForecastData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		const res = await request(app).get(`/weather/forecast?city=${city}`);

		expect(res.statusCode).toBe(200);

		expect(res.body).toMatchSnapshot();
	});

	test('return status 200 and result is OK for toulouse', async () => {
		const city = 'toulouse';
		const data = readMockJsonFile(city, 'forecast') as WeatherbitForecastData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		const res = await request(app).get(`/weather/forecast?city=${city}`);

		expect(res.statusCode).toBe(200);

		expect(res.body).toMatchSnapshot();
	});

	test('return status 200 and result is OK for memphis', async () => {
		const city = 'memphis';
		const data = readMockJsonFile(city, 'forecast') as WeatherbitForecastData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		const res = await request(app).get(`/weather/forecast?city=${city}`);

		expect(res.statusCode).toBe(200);

		expect(res.body).toMatchSnapshot();
	});

	test('return status 200 and result is OK for sydney', async () => {
		const city = 'sydney';
		const data = readMockJsonFile(city, 'forecast') as WeatherbitForecastData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		const res = await request(app).get(`/weather/forecast?city=${city}`);

		expect(res.statusCode).toBe(200);

		expect(res.body).toMatchSnapshot();
	});
});
