class WeatherInfoError extends Error {
	httpCode: number;
	userMessage?: string;
	constructor(message: string, httpCode: number, userMessage?: string) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		this.httpCode = httpCode;
		this.userMessage = userMessage;
	}
}

export default WeatherInfoError;
