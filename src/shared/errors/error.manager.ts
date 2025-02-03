import { ResponseToolkit } from '@hapi/hapi';
import { CustomError } from './custom.error';
import { Logger } from '../others/logger';

export class ErrorManager {
	static manage = (res: ResponseToolkit, e?: unknown) => {
		const internalErrorMessage = {
			errors: 'An error occurred. Please contact support for assistance.',
		};
		const logger = new Logger(ErrorManager.name);

		e instanceof Error ? logger.error(e.message) : logger.error('unknow error');

		if (e instanceof CustomError) {
			let message;
			if (e.message && typeof e.message === 'string') {
				message = { errors: e.message };
			} else {
                message = e.message;
            }
			return res.response(message || internalErrorMessage).code(e.httpCode || 500);
		}

		return res.response({ errors: internalErrorMessage }).code(500);
	};
}
