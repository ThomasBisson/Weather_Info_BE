import express, { Application, Request, Response } from 'express';

import testRouter from './routes/testRouter';

const app: Application = express();

app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
	res.json({ response: 'Welcome to Express & TypeScript Server' });
});

app.use('/', testRouter);

export default app;
