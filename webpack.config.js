const path = require('path');

module.exports = {
	entry: './src/index-serverless.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		filename: 'index.js',
		library: { type: 'commonjs2' },
		path: path.resolve(__dirname, 'dist'),
	},
	target: 'node',
};
