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
exports.startServer = exports.initializeServer = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const routes_1 = require("./config/routes");
const data_source_1 = require("./config/data-source");
const services_1 = require("./config/services");
const getServer = () => {
    const server = hapi_1.default.server({
        host: 'localhost',
        port: 3000,
    });
    (0, routes_1.defineRoutes)(server);
    const container = (0, services_1.getServices)();
    server.app.container = container;
    return server;
};
const initializeServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize();
    const server = getServer();
    return server;
});
exports.initializeServer = initializeServer;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = getServer();
    yield server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
});
exports.startServer = startServer;
