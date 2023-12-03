import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import WeatherInfoError from '../utils/weatherInfoError';
import logger from '../utils/logger';

const errorHandling: ErrorRequestHandler = (err: Error | WeatherInfoError, req: Request, res: Response, next: NextFunction) => {
	logger.error(err.stack);

	if (err instanceof WeatherInfoError) {
		res.status(err.httpCode).json({ error: err.userMessage ?? err.message });
	} else {
		res.status(500).json({ error: 'Server error' });
	}
	next(err);
};

export default errorHandling;
