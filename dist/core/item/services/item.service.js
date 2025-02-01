"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const base_crud_service_1 = require("../../../shared/sevices/base-crud.service");
const item_model_1 = require("../entities/item.model");
const item_repository_1 = require("../repositories/item.repository");
class ItemService extends base_crud_service_1.BaseCrudService {
    constructor() {
        super(...arguments);
        this.repository = new item_repository_1.ItemRepository(item_model_1.Item.name);
    }
}
exports.ItemService = ItemService;
