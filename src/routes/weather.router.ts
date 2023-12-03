import express, { NextFunction, Request, Response } from 'express';

import { getCurrentWeatherController } from '../controllers/weather/current.controller';
import { getForecastWeatherController } from '../controllers/weather/forecast.controller';

import logger from '../utils/logger';

const router = express.Router();

router.get('/current', async (req: Request, res: Response, next: NextFunction) => {
	try {
		// TODO : Better handling of query params
		const city: string | undefined = req.query.city as string | undefined;
		if (!city) {
			logger.error('You need to fill the city query parameter');
			res.status(400).json({ error: 'You need to fill the city query parameter' });
			return;
		}
		const result = await getCurrentWeatherController(city);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get('/forecast', async (req: Request, res: Response, next: NextFunction) => {
	try {
		// TODO : Better handling of query params
		const city: string | undefined = req.query.city as string | undefined;
		if (!city) {
			logger.error('You need to fill the city query parameter');
			res.status(400).json({ error: 'You need to fill the city query parameter' });
			return;
		}
		const result = await getForecastWeatherController(city);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

export default router;
