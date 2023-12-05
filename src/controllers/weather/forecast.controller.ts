import WeatherInfoError from '../../utils/weatherInfoError.util';

import { mean, meterPerSecToKilometerPerHour } from '../../utils/math.util';
import { getForecastWeatherDataFromApi } from '../../utils/weatherbit.util';
import { readMockJsonFile } from '../../utils/file.util';

import { WeatherbitForecastData } from '../../types/weatherbit.type';

type TemperatureTrend = 'rising' | 'stable' | 'falling';
// INFO : The requirement for this value was : Temperature trend (among: rising, stable, falling)
// As I have no idea what they meant by trend, and after a bit of search on google I did not find a method calcul trend
// I decided to go with my own interpretation of it
// To compute the trend of the temperature, I'll first calcul the linear regression of the temparatures
// Then with the linear regression I'll compute the first two points of the linear regression line
// Finaly I will use these two points to compute the slop of the temperature
export const getTemperatureTrend = (temperatures: number[]): TemperatureTrend => {
	if (temperatures.length <= 1) {
		throw new WeatherInfoError('Cannot make a temperature trend with 0 or 1 value', 500, 'Server error', { temperatures });
	}

	const todaysTemperature = temperatures.shift() as number;
	const avgTemperature = mean(temperatures);
	const diff = avgTemperature - todaysTemperature;

	if (diff > 2) {
		return 'rising';
	} else if (diff < -2) {
		return 'falling';
	}
	return 'stable';
};

type PressureTrend = 'rising sharply' | 'rising' | 'stable' | 'falling' | 'falling sharply';
export const getPressureTrend = (avgPressures: number[]): PressureTrend => {
	if (avgPressures.length <= 1) {
		throw new WeatherInfoError('Cannot make a pressure trend with 0 or 1 value', 500, 'Server error', { avgPressures });
	}

	const todaysAvgPressure = avgPressures.shift() as number;
	const avgPressure = mean(avgPressures);
	const diff = avgPressure - todaysAvgPressure;

	if (diff > 20) {
		return 'rising sharply';
	} else if (diff > 7) {
		return 'rising';
	} else if (diff < -20) {
		return 'falling sharply';
	} else if (diff < -7) {
		return 'falling';
	}
	return 'stable';
};

type BeaufortWindScale =
	| 'Calm'
	| 'Light Air'
	| 'Light Breeze'
	| 'Gentle Breeze'
	| 'Moderate Breeze'
	| 'Fresh Breeze'
	| 'Strong Breeze'
	| 'Near Gale'
	| 'Gale'
	| 'Strong Gale'
	| 'Storm'
	| 'Violent Storm'
	| 'Hurricane';

/**
 * Source : https://www.rmets.org/metmatters/beaufort-wind-scale
 * @param avgWindSpeedInMps
 * @returns The description of the Beaufort wind scale reached
 */
export const getBeaufortWindScale = (avgWindSpeedInMps: number): BeaufortWindScale => {
	if (avgWindSpeedInMps < 0) {
		throw new WeatherInfoError('The average wind speed cannot be inferior to 0', 500, 'Server error');
	}

	const windSpeedInKmph = meterPerSecToKilometerPerHour(avgWindSpeedInMps);

	if (windSpeedInKmph < 1) {
		return 'Calm';
	} else if (windSpeedInKmph >= 1 && windSpeedInKmph < 6) {
		return 'Light Air';
	} else if (windSpeedInKmph >= 6 && windSpeedInKmph < 12) {
		return 'Light Breeze';
	} else if (windSpeedInKmph >= 12 && windSpeedInKmph < 20) {
		return 'Gentle Breeze';
	} else if (windSpeedInKmph >= 20 && windSpeedInKmph < 29) {
		return 'Moderate Breeze';
	} else if (windSpeedInKmph >= 29 && windSpeedInKmph < 39) {
		return 'Fresh Breeze';
	} else if (windSpeedInKmph >= 39 && windSpeedInKmph < 50) {
		return 'Strong Breeze';
	} else if (windSpeedInKmph >= 50 && windSpeedInKmph < 62) {
		return 'Near Gale';
	} else if (windSpeedInKmph >= 62 && windSpeedInKmph < 75) {
		return 'Gale';
	} else if (windSpeedInKmph >= 75 && windSpeedInKmph < 89) {
		return 'Strong Gale';
	} else if (windSpeedInKmph >= 89 && windSpeedInKmph < 103) {
		return 'Storm';
	} else if (windSpeedInKmph >= 103 && windSpeedInKmph < 118) {
		return 'Violent Storm';
	}
	return 'Violent Storm';
};

type GeneralTrend = 'improving' | 'stable' | 'deteriorating';
/**
 * From what I understood after searching on google, if the pressure is falling then the weather is bad (wind, rain, mist, ...)
 * And if the pressure is rising then it means better weather (sunny, ...)
 * Source : https://meteofrance.com/actualites-et-dossiers/comprendre-la-meteo/quest-ce-que-la-pression-atmospherique#:~:text=Le%20plus%20souvent%2C%20le%20temps,calme%20mais%20pas%20forc%C3%A9ment%20beau.
 *
 * So for the calcul of the general trend, I will use say if the temperature and the pressure are rising then it's improving
 * If the temperature and the pressure are falling then it's deteriorating
 * If both are stable then it's stable
 *
 * For the other case like temperature rising and pressure falling I have no idea what it means it terme of general trend, so I do this :
 * if the pressure is rising or falling sharply, it will take priority over the temperature
 * else if the pressure is just rising or falling, and the temperature is also rising or falling then temperature will take priority
 * else if one of them is rising or falling and the other is stable, then the general trend will be stable
 * @param temperatureTrend
 * @param pressureTrend
 */
export const getGeneralTrend = (temperatureTrend: TemperatureTrend, pressureTrend: PressureTrend): GeneralTrend => {
	if (temperatureTrend === 'rising' && (pressureTrend === 'rising' || pressureTrend === 'rising sharply')) {
		return 'improving';
	} else if (temperatureTrend === 'falling' && (pressureTrend === 'falling' || pressureTrend === 'falling sharply')) {
		return 'deteriorating';
	} else if (temperatureTrend === 'stable' && pressureTrend === 'stable') {
		return 'stable';
	} else if (pressureTrend === 'falling sharply') {
		return 'deteriorating';
	} else if (pressureTrend === 'rising sharply') {
		return 'improving';
	} else if (pressureTrend === 'stable' || temperatureTrend === 'stable') {
		return 'stable';
	} else if (temperatureTrend === 'falling') {
		return 'deteriorating';
	} else if (temperatureTrend === 'rising') {
		return 'improving';
	}

	throw new WeatherInfoError('Could not determine the general trend', 500, 'Server error while determining the general trend', {
		temperatureTrend,
		pressureTrend,
	});
};

export type ForecastWeatherSummary = {
	generalTrend: GeneralTrend;
	temperatureTrend: TemperatureTrend;
	pressureTrend: PressureTrend;
	avgWindBeaufortScale: number;
};

/* eslint-disable */
export const getWeatherbitData = async (city: string) => {
	return process.env.NODE_ENV === 'development'
		? (readMockJsonFile(city, 'forecast') as WeatherbitForecastData[])
		: await getForecastWeatherDataFromApi(city);
}
/* eslint-enable */

const forecastWeatherController = async (city: string) => {
	const forecastWeatherData = await getWeatherbitData(city);

	if (!forecastWeatherData) {
		throw new WeatherInfoError('Unable to load Weatherbit data', 500, 'Server error while loading forecast weather data', { city });
	}

	const temperatureTrend = getTemperatureTrend(forecastWeatherData.map((data) => data.temp));
	const pressureTrend = getPressureTrend(forecastWeatherData.map((data) => data.pres));

	return {
		temperatureTrend,
		pressureTrend,
		avgWindBeaufortScale: getBeaufortWindScale(mean(forecastWeatherData.map((data) => data.wind_spd))),
		generalTrend: getGeneralTrend(temperatureTrend, pressureTrend),
	};
};

export default forecastWeatherController;
