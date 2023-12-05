import fs from 'fs';
import path from 'path';

import WeatherInfoError from './weatherInfoError.util';

export const readMockJsonFile = (fileName: string, mockFolder: 'current' | 'forecast'): {} => {
	const mockPath = path.join(__dirname, '..', '..', 'resources', 'mock', 'weatherbit_api', mockFolder);
	const mockedCityCurrentWeatherFileNames = fs.readdirSync(mockPath);
	if (!mockedCityCurrentWeatherFileNames.map((fileName) => fileName.split('.')[0]).includes(fileName)) {
		throw new WeatherInfoError(`Could not find mock data : ${fileName} in folder ${mockFolder}`, 500);
	}

	const mockContent = fs.readFileSync(path.join(mockPath, `${fileName}.json`)).toString();
	return JSON.parse(mockContent);
};
