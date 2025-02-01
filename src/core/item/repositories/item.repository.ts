
import { BaseCrudMySqlRepository } from "../../../shared/repositories/mysql-base.repository";

export class ItemRepository extends BaseCrudMySqlRepository {
    constructor(entityName: string) {
        super(entityName);
    }
}