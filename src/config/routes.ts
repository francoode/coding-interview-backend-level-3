import { ReqRefDefaults, Server, ServerApplicationState, ServerRoute } from '@hapi/hapi';
import { ItemService } from '../core/item/services/item.service';
import { ItemRepository } from '../core/item/repositories/item.repository';
import { ItemController } from '../core/item/controllers/item.controller';


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
			controller: ItemController
		}
	]

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

		for(const route of this.crudRoutes) {
			const controller = new route.controller();

			this.server.route([
				{
					method: 'GET',
					path: `/${route.resource}/{id}`,
					handler: controller.findByIdOrFail.bind(controller)
				},
				{
					method: 'POST',
					path: `/${route.resource}`,
					handler: controller.create.bind(controller)
				},
				{
					method: 'GET',
					path: `/${route.resource}`,
					handler: controller.findBy.bind(controller)
				},
				{
					method: 'DELETE',
					path: `/${route.resource}/{id}`,
					handler: controller.delete.bind(controller)
				},
				{
					method: 'PUT',
					path: `/${route.resource}/{id}`,
					handler: controller.update.bind(controller)
				}
			])
		}
	};
}
