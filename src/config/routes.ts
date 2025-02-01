import { ReqRefDefaults, Server, ServerRoute } from "@hapi/hapi"
import { ItemService } from "../core/item/services/item.service";
import { ItemRepository } from "../core/item/repositories/item.repository";
import { CrudRoutes } from "../shared/interfaces/routes.types";

export const defineRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            }
        }
    })  
}



const crudRoutes: CrudRoutes[] = [
    {
        resource: 'items',
        isCrud: true,
        inject: {
            service: ItemService,
            repository: ItemRepository
        }
    }
];

const customRoutes: ServerRoute<ReqRefDefaults>[] = [];

export const dRoutes = (server: Server) => {

}

/* export const getRoutes = (): ServerRoute<ReqRefDefaults>[] => {
    return [
        {
            method: 'GET',
            path: '',

        }
    ];
} */