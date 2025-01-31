"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServices = exports.services = void 0;
const awilix_1 = require("awilix");
const item_repository_1 = require("../core/item/repositories/item.repository");
const item_service_1 = require("../core/item/services/item.service");
//@todo cambiar dependencias
exports.services = [
    {
        service: item_service_1.ItemService,
        dependencies: [item_repository_1.ItemRepository],
    },
];
const getServices = () => {
    const container = (0, awilix_1.createContainer)();
    for (const s of exports.services) {
        try {
            const service = s.service;
            container.register(service.name, (0, awilix_1.asClass)(service).inject(() => ({
                repository: item_repository_1.ItemRepository,
            })));
        }
        catch (error) {
            console.error(`Error injecting service ${s.service.name}: ${error}`);
        }
    }
    return container;
};
exports.getServices = getServices;
