import express, { Request, Response } from 'express';

import logger from '../utils/logger';

const router = express.Router();

router.get('/current', (req: Request, res: Response) => {
	logger.info('Dispay current log');
	res.json({ response: 'current api' });
});

router.get('/forecast', (req: Request, res: Response) => {
	res.json({ response: 'forecast api' });
});

export default router;
