import { DataSource } from "typeorm";
import { Item } from "../core/item/entities/item.model";


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Item],
});
