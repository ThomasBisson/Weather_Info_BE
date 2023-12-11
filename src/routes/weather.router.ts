import { ValidationError, object, string } from 'yup';
import express, { NextFunction, Request, Response } from 'express';

import currentWeatherController from '../controllers/weather/current.controller';
import forecastWeatherController from '../controllers/weather/forecast.controller';

import logger from '../utils/logger.util';

const router = express.Router();

const currentSchema = object({
	city: string().trim().required(),
});

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
		const queryParams = await currentSchema.validate(req.query);
		const result = await currentWeatherController(queryParams.city);
		res.json(result);
	} catch (err) {
		if (err instanceof ValidationError) {
			logger.error(err.message);
			res.status(400).json({ error: err.message });
		} else {
			next(err);
		}
	}
});

const forecastSchema = object({
	city: string().trim().required(),
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
		const queryParams = await forecastSchema.validate(req.query);
		const result = await forecastWeatherController(queryParams.city);
		res.json(result);
	} catch (err) {
		if (err instanceof ValidationError) {
			logger.error(err.message);
			res.status(400).json({ error: err.message });
		} else {
			next(err);
		}
	}
});

export default router;
