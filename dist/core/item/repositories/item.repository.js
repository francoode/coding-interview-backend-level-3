"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepository = void 0;
const mysql_base_repository_1 = require("../../../shared/repositories/mysql-base.repository");
class ItemRepository extends mysql_base_repository_1.BaseCrudMySqlRepository {
    constructor(entityName) {
        super(entityName);
    }
}
exports.ItemRepository = ItemRepository;
