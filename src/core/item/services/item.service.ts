import { BaseCrudService } from '../../../shared/sevices/base-crud.service';
import { Item } from '../entities/item.model';
import { ItemRepository } from '../repositories/item.repository';

export class ItemService extends BaseCrudService {
	protected repository = new ItemRepository();
}
