import { ReqRefDefaults, Server, ServerRoute } from "@hapi/hapi"

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

/* export const getRoutes = (): ServerRoute<ReqRefDefaults>[] => {
    return [
        {
            method: 'GET',
            path: '',

        }
    ];
} */