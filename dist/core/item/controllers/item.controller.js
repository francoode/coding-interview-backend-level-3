"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const base_crud_controller_1 = require("../../../shared/controllers/base-crud.controller");
const item_service_1 = require("../services/item.service");
class ItemController extends base_crud_controller_1.BaseCrudController {
    constructor() {
        super(...arguments);
        this.serviceName = item_service_1.ItemService.name;
    }
}
exports.ItemController = ItemController;
