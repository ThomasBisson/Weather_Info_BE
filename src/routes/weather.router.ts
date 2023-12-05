import express, { NextFunction, Request, Response } from 'express';

import currentWeatherController from '../controllers/weather/current.controller';
import forecastWeatherController from '../controllers/weather/forecast.controller';

import logger from '../utils/logger.util';

const router = express.Router();

/**
 * @swagger
 * /weather/current:
 *   get:
 *     summary: Get the current weather information from a specific city
 *     tags:
 *       - weather
 *     produces:
 *     - application/json
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city of which you want to know the current weather
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                 temperature:
 *                   type: number
 *                 windSpeed:
 *                   type: number
 *                 relativeHumidity:
 *                   type: number
 */
router.get('/current', async (req: Request, res: Response, next: NextFunction) => {
	try {
		// TODO : Better handling of query params
		const city: string | undefined = req.query.city as string | undefined;
		if (!city) {
			logger.error('You need to fill the city query parameter');
			res.status(400).json({ error: 'You need to fill the city query parameter' });
			return;
		}
		const result = await currentWeatherController(city);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

/**
 * @swagger
 * /weather/forecast:
 *   get:
 *     summary: Get the forecast weather information from a specific city
 *     tags:
 *       - weather
 *     produces:
 *     - application/json
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city of which you want to know the forecast weather
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 generalTrend:
 *                   type: string
 *                   enum: ['improving', 'stable', 'deteriorating']
 *                 temperatureTrend:
 *                   type: string
 *                   enum: ['rising', 'stable', 'falling']
 *                 pressureTrend:
 *                   type: number
 *                   enum: ['rising sharply', 'rising', 'stable', 'falling', 'falling sharply']
 *                 avgWindBeaufortScale:
 *                   type: number
 */
router.get('/forecast', async (req: Request, res: Response, next: NextFunction) => {
	try {
		// TODO : Better handling of query params
		const city: string | undefined = req.query.city as string | undefined;
		if (!city) {
			logger.error('You need to fill the city query parameter');
			res.status(400).json({ error: 'You need to fill the city query parameter' });
			return;
		}
		const result = await forecastWeatherController(city);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

export default router;
