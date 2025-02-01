import { asClass, createContainer } from 'awilix';
import { ItemRepository } from '../core/item/repositories/item.repository';
import { ItemService } from '../core/item/services/item.service';

//@todo cambiar dependencias
export const services = [
	{
		service: ItemService,
		dependencies: [ItemRepository],
	},
];

export const defineServices = (server: any) => {
	const container = createContainer();
	for (const s of services) {
		try {
			const service = s.service;

			container.register(
				service.name,
				asClass(service).inject(() => ({
					//@todo cambiar dependencias
					repository: ItemRepository,
				})),
			);
		} catch (error) {
            console.error(`Error injecting service ${s.service.name}: ${error}`);
        }
	}

	server.app.container = container;
};


/* await server.register({
    plugin: awilixHapiPlugin,
    options: {
      container, // Pasar el contenedor de Awilix
    },
  });

  // Ejemplo de ruta que usa dependencias inyectadas
  server.route({
    method: 'GET',
    path: '/users',
    handler: (request) => {
      // Obtener el servicio inyectado desde el contenedor
      const userService = request.container.resolve('userService');
      return userService.getUsers();
    },
  }); */