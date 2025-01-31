import Hapi from '@hapi/hapi'
import { defineRoutes } from './config/routes'
import { AppDataSource } from './config/data-source';
import { getServices } from './config/services';
import { AwilixContainer } from 'awilix';

declare module '@hapi/hapi' {
    interface ServerApplicationState {
        container: AwilixContainer;
    }
}

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
    })

    defineRoutes(server)
    const container = getServices();
    server.app.container = container;

    return server
}

export const initializeServer = async () => {
    await AppDataSource.initialize();
    const server = getServer()
    return server
}

export const startServer = async () => {
    const server = getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
};

