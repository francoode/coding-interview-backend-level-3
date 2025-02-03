import { BaseCrudController } from "../../../shared/controllers/base-crud.controller";
import { ItemCreateSchema, ItemUpdateSchema } from "../dtos/item.dto";
//import { ItemCreateDto, ItemUpdateDto } from "../dtos/item.dto";
import { ItemService } from "../services/item.service";

export class ItemController extends BaseCrudController {
    updateDto = ItemUpdateSchema;
    createDto = ItemCreateSchema;
    serviceName: string = ItemService.name;
}