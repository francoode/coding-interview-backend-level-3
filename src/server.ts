import Hapi from '@hapi/hapi';
import { RouteConfig } from './config/routes';
import { AppDataSource } from './config/data-source';
import { ServiceContainer } from './config/services';

export const init = async () => {
	try {
		const server = Hapi.server({
			host: '0.0.0.0',
			port: 3000,
		});

		RouteConfig.getInstance(server);
		ServiceContainer.getInstance();

		await AppDataSource.initialize();
		await server.start();

		console.log(`Server running on ${server.info.uri}`);
	} catch (e) {
		console.log(`Error initializing server: ${e}`);
	}
};


