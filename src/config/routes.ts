import { ReqRefDefaults, Server, ServerRoute } from '@hapi/hapi';
import { ItemController } from '../core/item/controllers/item.controller';
import { ItemCreateSchema, ItemUpdateSchema } from '../core/item/dtos/item.dto';

export class RouteConfig {
	private static instance: RouteConfig;

	private server: Server;
	private customRoutes: ServerRoute<ReqRefDefaults>[] = [
		{
			method: 'GET',
			path: '/ping',
			handler: async (request, h) => {
				return {
					ok: true,
				};
			},
		},
	];

	private crudRoutes = [
		{
			resource: 'items',
			controller: ItemController,
			createDto: ItemCreateSchema,
			updateDto: ItemUpdateSchema,
		},
	];

	private constructor(server: Server) {
		this.server = server;
		this.setRoutes();
	}

	public static getInstance(server: Server): RouteConfig {
		if (!RouteConfig.instance) {
			RouteConfig.instance = new RouteConfig(server);
		}
		return RouteConfig.instance;
	}

	private setRoutes = () => {
		for (const route of this.customRoutes) {
			this.server.route(route);
		}

		for (const route of this.crudRoutes) {
			const controller = new route.controller();

			this.server.route([
				{
					method: 'GET',
					path: `/${route.resource}/{id}`,
					options: {
						description: 'Get resource by id',
						tags: ['api'],
					},
					handler: controller.findByIdOrFail.bind(controller),
				},
				{
					method: 'POST',
					path: `/${route.resource}`,
					options: {
						description: 'Create resource',
						tags: ['api'],
						validate: {
							failAction: 'ignore',
							payload: route.createDto,
						},
					},
					handler: controller.create.bind(controller),
				},
				{
					method: 'GET',
					path: `/${route.resource}`,
					options: {
						description: 'Get all resources',
						tags: ['api'],
					},
					handler: controller.findBy.bind(controller),
				},
				{
					method: 'DELETE',
					path: `/${route.resource}/{id}`,
					options: {
						description: 'Delete resource',
						tags: ['api'],
					},
					handler: controller.delete.bind(controller),
				},
				{
					method: 'PUT',
					path: `/${route.resource}/{id}`,
					options: {
						description: 'Update resource',
						tags: ['api'],
						validate: {
							failAction: 'ignore',
							payload: route.updateDto,
						},
					},
					handler: controller.update.bind(controller),
				},
			]);
		}
	};
}
