import WeatherInfoError from '../../utils/weatherInfoError';
import { getCurrentWeatherDataFromApi } from '../../utils/weatherbit.util';
import { readMockJsonFile } from '../../utils/file.util';

export const getCurrentWeatherController = async (city: string) => {
	const currentWeatherData = process.env.NODE_ENV === 'development' ? readMockJsonFile(city, 'current') : await getCurrentWeatherDataFromApi(city);

	if (!currentWeatherData) {
		throw new WeatherInfoError('Unable to load Weatherbit data', 500, 'Server error while loading current weather data');
	}

	console.log(JSON.stringify(currentWeatherData, null, 4));

	return { result: 'current api' };
};
