import WeatherInfoError from '../../utils/weatherInfoError.util';
import { getCurrentWeatherDataFromApi } from '../../utils/weatherbit.util';
import { readMockJsonFile } from '../../utils/file.util';

import { WeatherbitCurrentData } from '../../types/weatherbit.type';
import { meterPerSecToKilometerPerHour } from '../../utils/math.util';

/* eslint-disable */
export const getWeatherbitData = async (city: string) => {
	return process.env.NODE_ENV === 'development'
		? (readMockJsonFile(city, 'forecast') as WeatherbitCurrentData[])
		: await getCurrentWeatherDataFromApi(city);
}
/* eslint-enable */

type CurrentWeatherSummary = {
	description: string;
	temperature: number;
	windSpeed: number;
	relativeHumidity: number;
};

const currentWeatherController = async (city: string) => {
	const currentWeatherData = await getWeatherbitData(city);

	if (!currentWeatherData) {
		throw new WeatherInfoError('Unable to load Weatherbit data', 500, 'Server error while loading current weather data', { city });
	}

	const currentWeatherSummaries: Record<string, CurrentWeatherSummary> = {};
	for (const data of currentWeatherData) {
		currentWeatherSummaries[`${data.country_code}_${data.state_code}`] = {
			description: data.weather.description,
			temperature: data.temp,
			windSpeed: meterPerSecToKilometerPerHour(data.wind_spd),
			relativeHumidity: data.rh,
		};
	}

	return currentWeatherSummaries;
};

export default currentWeatherController;
