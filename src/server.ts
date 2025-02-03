import Hapi from '@hapi/hapi';
import { RouteConfig } from './config/routes';
import { AppDataSource } from './config/data-source';
import { ServiceContainer } from './config/services';
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import HapiSwagger from 'hapi-swagger';

let serverInstance: Hapi.Server | null = null;

const getServer = async () => {
	const server = Hapi.server({
		host: '127.0.0.1',
		port: 3002,
	});
	
	await configureDocs(server);
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

const configureDocs = async (server: Hapi.Server) => {
	await server.register([
		Inert,
		Vision,
		{
		  plugin: HapiSwagger,
		  options: {
			info: {
			  title: 'API Documentation',
			  version: '1.0'
			}
		  }
		}
	  ]);
}

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
