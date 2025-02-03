import { BaseCrudSqlRepository } from '../repositories/base-crud-sql.repository';

export abstract class BaseCrudService {
	protected abstract repository: BaseCrudSqlRepository;

	findByIdOrFail = async (id: number) => {
		return await this.repository.findByIdOrFail(id);
	};
	create = async (data: any) => {
		return await this.repository.create(data);
	};
	findBy = async () => {
		return await this.repository.findBy();
	};
	delete = async (id: number) => {
		return await this.repository.delete(id);
	};
	update = async (id: number, data: any) => {
		return await this.repository.update(id, data);
	};
}
