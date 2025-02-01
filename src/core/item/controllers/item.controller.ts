import { BaseCrudController } from "../../../shared/controllers/base-crud.controller";
import { ItemService } from "../services/item.service";

export class ItemController extends BaseCrudController {
    serviceName: string = ItemService.name;
}