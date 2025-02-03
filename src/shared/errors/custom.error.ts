export class CustomError extends Error {
	httpCode: number = 500;
    e?: Error;
    message: any;

	constructor(params: { e?: Error; message?: any; httpCode?: number }) {
        const {e, message, httpCode} = params;
		super(message || e?.message || 'Internal Error');

		this.message = message || e?.message || 'Internal Error';
		this.e = e;
		this.httpCode = httpCode || 500;
	}
}
