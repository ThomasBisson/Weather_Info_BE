import axios from 'axios';

export const getCurrentWeatherDataFromApi = async (city: string): Promise<{}> => {
	const result = await axios.get('current', {
		baseURL: process.env.WEATHERBIT_URL,
		params: {
			key: process.env.WEATHERBIT_KEY,
			units: 'M',
			city,
		},
	});

	return result.data.data;
};

export const getForecastWeatherDataFromApi = async (city: string): Promise<{}> => {
	const result = await axios.get('forecast/daily', {
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
