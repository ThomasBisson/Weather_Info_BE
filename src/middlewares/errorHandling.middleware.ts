import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import logger from '../utils/logger';

const errorHandling: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.error(err.stack);
	res.status(500).json({ error: 'Server error' });
	next(err);
};

export default errorHandling;
