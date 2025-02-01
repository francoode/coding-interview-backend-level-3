"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const item_model_1 = require("../core/item/entities/item.model");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'db',
    database: 'my_db',
    username: 'root',
    password: 'root',
    port: 3306,
    synchronize: true,
    logging: true,
    entities: [item_model_1.Item],
});
