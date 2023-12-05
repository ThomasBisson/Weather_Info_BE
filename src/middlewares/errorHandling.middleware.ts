import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import WeatherInfoError from '../utils/weatherInfoError.util';
import logger from '../utils/logger.util';

const errorHandling: ErrorRequestHandler = (err: Error | WeatherInfoError, _req: Request, res: Response, next: NextFunction) => {
	if (err instanceof WeatherInfoError) {
		logger.error(err.stack ?? err.name + ' ' + err.message, { data: { ...err.additionalData } });
		res.status(err.httpCode).json({ error: err.userMessage ?? err.message });
	} else {
		logger.error(err.stack ?? err.name + ' ' + err.message);
		res.status(500).json({ error: 'Server error' });
	}
	next(err);
};

export default errorHandling;
