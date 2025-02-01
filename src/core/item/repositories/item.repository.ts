
import { BaseCrudMySqlRepository } from "../../../shared/repositories/mysql-base.repository";
import { Item } from "../entities/item.model";

export class ItemRepository extends BaseCrudMySqlRepository {
    constructor() {
        super(Item.name);
    }
}