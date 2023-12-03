import WeatherInfoError from '../../utils/weatherInfoError';

import { getForecastWeatherDataFromApi } from '../../utils/weatherbit.util';
import { readMockJsonFile } from '../../utils/file.util';

export const getForecastWeatherController = async (city: string) => {
	const forecastWeatherData =
		process.env.NODE_ENV === 'development' ? readMockJsonFile(city, 'forecast') : await getForecastWeatherDataFromApi(city);

	if (!forecastWeatherData) {
		throw new WeatherInfoError('Unable to load Weatherbit data', 500, 'Server error while loading Forecast weather data');
	}

	console.log(forecastWeatherData);

	return { result: 'Forecast api' };
};
