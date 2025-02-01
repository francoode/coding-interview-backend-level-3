"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const routes_1 = require("./config/routes");
const data_source_1 = require("./config/data-source");
const services_1 = require("./config/services");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = hapi_1.default.server({
            host: 'localhost',
            port: 3000,
        });
        server.route({
            method: "GET",
            path: "/hello",
            handler: (request, h) => {
                return "Hello World";
            },
        });
        routes_1.RouteConfig.getInstance(server);
        services_1.ServiceContainer.getInstance();
        yield data_source_1.AppDataSource.initialize();
        yield server.start();
        console.log(`Server running on ${server.info.uri}`);
    }
    catch (e) {
        console.log(`Error initializing server: ${e}`);
    }
});
exports.init = init;
