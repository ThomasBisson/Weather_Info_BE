import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/test', (req: Request, res: Response) => {
	res.json({ response: 'Test OK !' });
});

export default router;
