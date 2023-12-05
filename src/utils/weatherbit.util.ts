import axios from 'axios';

import { WeatherbitCurrentData, WeatherbitCurrentResponse, WeatherbitForecastData, WeatherbitForecastResponse } from '../types/weatherbit.type';

export const getCurrentWeatherDataFromApi = async (city: string): Promise<WeatherbitCurrentData[]> => {
	const result = await axios.get<WeatherbitCurrentResponse>('current', {
		baseURL: process.env.WEATHERBIT_URL,
		params: {
			key: process.env.WEATHERBIT_KEY,
			units: 'M',
			city,
		},
	});

	return result.data.data;
};

export const getForecastWeatherDataFromApi = async (city: string): Promise<WeatherbitForecastData[]> => {
	const result = await axios.get<WeatherbitForecastResponse>('forecast/daily', {
		baseURL: process.env.WEATHERBIT_URL,
		params: {
			key: process.env.WEATHERBIT_KEY,
			units: 'M',
			days: 8,
			city,
		},
	});

	return result.data.data;
};
