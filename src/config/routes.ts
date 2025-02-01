import { ReqRefDefaults, Server, ServerApplicationState, ServerRoute } from '@hapi/hapi';
import { ItemService } from '../core/item/services/item.service';
import { ItemRepository } from '../core/item/repositories/item.repository';


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
            console.log('route add');
			this.server.route(route);
		}
	};
}
