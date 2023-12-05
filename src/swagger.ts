import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';

const options: Options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Weather Info API',
			version: '1.0.0',
			description: 'An api that helps you with weather information',
			contact: {
				email: 'bisson.thomas.pro@gmail.com',
				name: 'Thomas Bisson',
			},
		},
		servers: [
			{
				url: 'http://localhost:8080',
			},
		],
		produces: ['application/json'],
	},
	apis: ['./**/*.ts'],
};

const specs = swaggerJsdoc(options);

export default (app: Application) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
