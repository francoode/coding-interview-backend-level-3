import { BaseCrudMySqlRepository } from '../repositories/mysql-base.repository';
import { BaseCrudService } from '../sevices/base-crud.service';
import { BaseCrudRepository } from './base-crud.repository';

export type CrudRoutes = {
	resource: string;
	isCrud: boolean;
	inject: {
		service: typeof BaseCrudService;
		repository: BaseCrudRepository;
	};
};
