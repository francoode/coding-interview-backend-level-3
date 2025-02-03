import pino from 'pino';

export class Logger {
	private logger;

	constructor(context: string) {
		this.logger = pino({
			name: context,
			level: 'info',
			base: null,
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
					ignore: 'pid,hostname',
					translateTime: 'yyyy-mm-dd HH:MM:ss',
				},
			},
		});
	}

	log(message: string, data?: unknown) {
		this.logger.info({ data }, message);
	}

	error(message: string, error?: unknown) {
		this.logger.error({ error }, message);
	}

	warn(message: string, data?: unknown) {
		this.logger.warn({ data }, message);
	}

	debug(message: string, data?: unknown) {
		this.logger.debug({ data }, message);
	}
}
