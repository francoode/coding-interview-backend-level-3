
import { BaseCrudSqlRepository } from "../../../shared/repositories/base-crud-sql.repository";
import { Item } from "../entities/item.model";

export class ItemRepository extends BaseCrudSqlRepository {
    constructor() {
        super(Item.name);
    }
}