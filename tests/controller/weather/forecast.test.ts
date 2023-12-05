import { describe, expect, jest, test } from '@jest/globals';

import * as forecastController from '../../../src/controllers/weather/forecast.controller';

import { WeatherbitForecastData } from '../../../src/types/weatherbit.type';

import WeatherInfoError from '../../../src/utils/weatherInfoError.util';
import { readMockJsonFile } from '../../../src/utils/file.util';

describe('Get beaufort wind scale', () => {
	test('no wind', () => {
		expect(forecastController.getBeaufortWindScale(0)).toBe('Calm');
	});

	test('low wind', () => {
		expect(forecastController.getBeaufortWindScale(5)).toBe('Gentle Breeze');
	});

	test('high wind', () => {
		expect(forecastController.getBeaufortWindScale(110)).toBe('Violent Storm');
	});

	test('wind < 0', () => {
		expect(() => {
			forecastController.getBeaufortWindScale(-5);
		}).toThrowError(WeatherInfoError);
		expect(() => {
			forecastController.getBeaufortWindScale(-5);
		}).toThrowError('The average wind speed cannot be inferior to 0');
	});
});

describe('Get pressure trend', () => {
	test('pressure falling sharply', () => {
		expect(forecastController.getPressureTrend([1010, 1000, 992, 985, 980, 980, 980, 980])).toBe('falling sharply');
	});

	test('pressure falling', () => {
		expect(forecastController.getPressureTrend([1010, 1008, 1005, 1003, 1000, 1000, 998, 995])).toBe('falling');
	});

	test('pressure stable', () => {
		expect(forecastController.getPressureTrend([1000, 1005, 1010, 1005, 996, 995, 1001, 1000])).toBe('stable');
	});

	test('pressure rising', () => {
		expect(forecastController.getPressureTrend([995, 998, 1000, 1000, 1003, 1005, 1008, 1010])).toBe('rising');
	});

	test('pressure rising sharply', () => {
		expect(forecastController.getPressureTrend([980, 990, 1000, 1005, 1010, 1010, 1009, 1011])).toBe('rising sharply');
	});

	test('0 pressure given', () => {
		expect(() => {
			forecastController.getPressureTrend([]);
		}).toThrowError(WeatherInfoError);
		expect(() => {
			forecastController.getPressureTrend([]);
		}).toThrowError('Cannot make a pressure trend with 0 or 1 value');
	});

	test('1 pressure given', () => {
		expect(() => {
			forecastController.getPressureTrend([1000]);
		}).toThrowError(WeatherInfoError);
		expect(() => {
			forecastController.getPressureTrend([1000]);
		}).toThrowError('Cannot make a pressure trend with 0 or 1 value');
	});
});

describe('Get temperature trend', () => {
	test('falling temperature', () => {
		expect(forecastController.getTemperatureTrend([25, 24, 23, 22, 21, 20, 19, 18])).toBe('falling');
	});

	test('rising temperature', () => {
		expect(forecastController.getTemperatureTrend([18, 19, 20, 21, 22, 23, 24, 25])).toBe('rising');
	});

	test('stable temperature', () => {
		expect(forecastController.getTemperatureTrend([23, 24, 25, 20, 23, 22, 25, 22])).toBe('stable');
	});

	test('0 temperature given', () => {
		expect(() => {
			forecastController.getTemperatureTrend([]);
		}).toThrowError(WeatherInfoError);
		expect(() => {
			forecastController.getTemperatureTrend([]);
		}).toThrowError('Cannot make a temperature trend with 0 or 1 value');
	});

	test('1 temperature given', () => {
		expect(() => {
			forecastController.getTemperatureTrend([18]);
		}).toThrowError(WeatherInfoError);
		expect(() => {
			forecastController.getTemperatureTrend([18]);
		}).toThrowError('Cannot make a temperature trend with 0 or 1 value');
	});
});

describe('Get general trend', () => {
	test('rising + rising = improving trend', () => {
		expect(forecastController.getGeneralTrend('rising', 'rising')).toBe('improving');
	});

	test('falling + falling = deteriorating trend', () => {
		expect(forecastController.getGeneralTrend('falling', 'falling')).toBe('deteriorating');
	});

	test('stable + stable = stable trend', () => {
		expect(forecastController.getGeneralTrend('stable', 'stable')).toBe('stable');
	});

	test('pressure falling sharply = deteriorating trend', () => {
		expect(forecastController.getGeneralTrend('stable', 'falling sharply')).toBe('deteriorating');
	});

	test('pressure rising sharply = deteriorating trend', () => {
		expect(forecastController.getGeneralTrend('stable', 'rising sharply')).toBe('improving');
	});

	test('stable + rising = stable trend', () => {
		expect(forecastController.getGeneralTrend('stable', 'rising')).toBe('stable');
	});

	test('falling + rising = deteriorating trend', () => {
		expect(forecastController.getGeneralTrend('falling', 'rising')).toBe('deteriorating');
	});

	test('rising + falling = deteriorating trend', () => {
		expect(forecastController.getGeneralTrend('rising', 'falling')).toBe('improving');
	});
});

const spyGetWeatherbitData = jest.spyOn(forecastController, 'getWeatherbitData');
// jest.mock(getWeatherbitData)
describe('Forecast controller', () => {
	test('return value for paris', async () => {
		const city = 'paris';
		const data = readMockJsonFile(city, 'forecast') as WeatherbitForecastData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		expect(await forecastController.default(city)).toMatchSnapshot();
	});

	test('return value for toulouse', async () => {
		const city = 'toulouse';
		const data = readMockJsonFile(city, 'forecast') as WeatherbitForecastData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		expect(await forecastController.default(city)).toMatchSnapshot();
	});

	test('return value for memphis', async () => {
		const city = 'memphis';
		const data = readMockJsonFile(city, 'forecast') as WeatherbitForecastData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		expect(await forecastController.default(city)).toMatchSnapshot();
	});

	test('return value for sydney', async () => {
		const city = 'sydney';
		const data = readMockJsonFile(city, 'forecast') as WeatherbitForecastData[];
		spyGetWeatherbitData.mockReturnValue(Promise.resolve(data));

		expect(await forecastController.default(city)).toMatchSnapshot();
	});
});
