import { BaseCrudService } from '../../../shared/sevices/base-crud.service';
import { ItemRepository } from '../repositories/item.repository';

export class ItemService extends BaseCrudService {
	protected repository = new ItemRepository();
}
