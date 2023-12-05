class WeatherInfoError extends Error {
	httpCode: number;
	userMessage?: string;
	additionalData?: {};
	constructor(message: string, httpCode: number, userMessage?: string, additionalData?: {}) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		this.httpCode = httpCode;
		this.userMessage = userMessage;
		this.additionalData = additionalData;
	}
}

export default WeatherInfoError;
