import { BaseCrudController } from "../../../shared/controllers/base-crud.controller";
import { ItemCreateDto, ItemUpdateDto } from "../dtos/item.dto";
import { ItemService } from "../services/item.service";

export class ItemController extends BaseCrudController {
    updateDto = ItemUpdateDto;
    createDto = ItemCreateDto;
    serviceName: string = ItemService.name;
}