import serverless from '@vendia/serverless-express';

import app from './app';

export const handler = (event: any, context: any, callback: any) => {
	const server = serverless({ app });
	console.log(event);
	return server(event, context, callback);
};
