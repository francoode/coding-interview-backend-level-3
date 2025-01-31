import Hapi from '@hapi/hapi';
import { defineRoutes } from './config/routes';
import { AppDataSource } from './config/data-source';
import { defineServices } from './config/services';
import { AwilixContainer } from 'awilix';

declare module '@hapi/hapi' {
	interface ServerApplicationState {
		container: AwilixContainer;
	}
}

export const init = async () => {
	try {
		const server = Hapi.server({
			host: 'localhost',
			port: 3000,
		});

		defineRoutes(server);
		defineServices(server);

		await AppDataSource.initialize();

		await server.start();
		console.log(`Server running on ${server.info.uri}`);
	} catch (e) {
		console.log(`Error initializing server: ${e}`);
	}
};


