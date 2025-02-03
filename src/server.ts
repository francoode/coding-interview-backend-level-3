import Hapi from '@hapi/hapi';
import { RouteConfig } from './config/routes';
import { AppDataSource } from './config/data-source';
import { ServiceContainer } from './config/services';

let serverInstance: Hapi.Server | null = null;

const getServer = async () => {
	const server = Hapi.server({
		host: '127.0.0.1',
		port: 3002,
	});

	RouteConfig.getInstance(server);
	ServiceContainer.getInstance();
	
	return server;
};
export const init = async () => {
	try {
		const server = await getServer();
		await AppDataSource.initialize();
		await server.start();
		console.log(`Server running on ${server.info.uri}`);
	} catch (e) {
		console.log(`Error initializing server: ${e}`);
	}
};

/**
 * For testing purposes, we need to initialize the server and the data source
 */
export const initializeServer = async () => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	if (!serverInstance) {
		serverInstance = await getServer();
		serverInstance.settings.port = 3003;
		serverInstance.start();
	}

	return serverInstance;
};
