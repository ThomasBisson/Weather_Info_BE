import WeatherInfoError from './weatherInfoError.util';

export const meterPerSecToKilometerPerHour = (mps: number) => {
	if (mps < 0) {
		throw new WeatherInfoError('Impossible to have a mps inferior to 0', 500, 'Server error');
	}
	return mps * 3.6;
};

const sum = (x: number[]) => x.reduce((prev, curr) => prev + curr, 0);
export const mean = (x: number[]) => {
	if (!x.length) {
		throw new WeatherInfoError('Impossible to mean an empty array', 500, 'Server error');
	}
	return sum(x) / x.length;
};
// const multiplyArrays = (x: number[], y: number[]) => {
// 	const newArray = [];
// 	for (let i = 0; i < x.length; i++) {
// 		newArray.push(x[i] * y[i]);
// 	}
// 	return newArray;
// };

// const linearRegression = (x: number[], y: number[]) => {
// 	if (x.length !== y.length) {
// 		throw new WeatherInfoError('Cannot do a linear regress with 2 arrays of different size', 500, undefined, { x, y });
// 	}

// 	const n = x.length;

// 	const mX = mean(x);
// 	const mY = mean(y);

// 	const ssXY = sum(multiplyArrays(x, y)) - n * mY * mX;
// 	const ssXX = sum(multiplyArrays(x, x)) - n * mX * mX;

// 	const b1 = ssXY / ssXX;
// 	const b0 = mY - b1 * mX;

// 	return [b0, b1];
// };

// export const slope = (x: number[], y: number[]) => {
// 	const lr = linearRegression(x, y);

// 	// Calcule the first two points on the linear regression line
// 	// Two are enough as each step is always equals
// 	const lrLinePoint1 = x[0] * lr[1] + lr[0];
// 	const lrLinePoint2 = x[1] * lr[1] + lr[0];

// 	return lrLinePoint2 - lrLinePoint1;
// };
