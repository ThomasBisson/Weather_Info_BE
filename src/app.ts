import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import swagger from './swagger';

import errorHandling from './middlewares/errorHandling.middleware';
import morganMiddleware from './middlewares/morgan.middleware';

import weatherRouter from './routes/weather.router';

const app: Application = express();

app.use(morganMiddleware);
app.use(helmet());
app.use(cors());

// NOTE : Use express.json() or body-parser if you need to handle data in the request body
//        For now it's not needed so I commented as it slows the API for no good reason
// App.use(express.json());

// Swagger
if (process.env.NODE_ENV === 'development') {
	swagger(app);
}

// Routes
app.get('/', (req: Request, res: Response) => {
	res.json({ response: 'Welcome to the weather info API !' });
});

app.use('/weather', weatherRouter);

// 404 route
app.get('*', (req, res) => {
	res.status(404).json({
		error: `Cannot find ${req.method} ${req.path}`,
	});
});

// Error handler
app.use(errorHandling);

export default app;
