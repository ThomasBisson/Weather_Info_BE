import morgan from 'morgan';

import logger from '../utils/logger';

const stream = {
	write: (message: string) => logger.http(message),
};

const skip = () => {
	const env = process.env.NODE_ENV || 'development';
	return env !== 'development';
};

const morganMiddleware = morgan(
	':remote-addr - ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms',
	{ stream, skip },
);

export default morganMiddleware;
