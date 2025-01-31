import { DataSource } from "typeorm";
import { Item } from "./domain/entities/item.model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Item],
});
