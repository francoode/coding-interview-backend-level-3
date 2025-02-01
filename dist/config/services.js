"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceContainer = void 0;
const awilix_1 = require("awilix");
const item_repository_1 = require("../core/item/repositories/item.repository");
const item_service_1 = require("../core/item/services/item.service");
class ServiceContainer {
    constructor() {
        this.services = [item_service_1.ItemService, item_repository_1.ItemRepository];
        this.container = (0, awilix_1.createContainer)();
        this.defineServices = () => {
            for (const s of this.services) {
                try {
                    this.container.register({
                        [s.name]: (0, awilix_1.asClass)(s).singleton(),
                    });
                }
                catch (error) {
                    console.error(`Error injecting service ${s.name}: ${error}`);
                }
            }
        };
        this.getContainer = () => {
            return this.container;
        };
        this.defineServices();
    }
    static getInstance() {
        if (!ServiceContainer.instance) {
            ServiceContainer.instance = new ServiceContainer();
        }
        return ServiceContainer.instance;
    }
}
exports.ServiceContainer = ServiceContainer;
