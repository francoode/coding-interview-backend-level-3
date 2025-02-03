import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { CustomError } from '../errors/custom.error';

export class BaseCrudSqlRepository {
	private dataSource: DataSource = AppDataSource;
	private entityName: string;

	constructor(entityName: string) {
		this.entityName = entityName;
	}

	findByIdOrFail = async (id: number) => {
		const repo = await this.getRepository();
		const entity = await repo.findOne({ where: { id } });
		if (!entity) {
			throw new CustomError({
				message: `Could not find any entity with id ${id}`,
				httpCode: 404,
			});
		}
		return entity;
	};

	create = async (data: any) => {
		const repo = await this.getRepository();
		const entity = repo.create(data);
		return await repo.save(entity);
	};

	findBy = async () => {
		const repo = await this.getRepository();
		return await repo.findBy({});
	};

	delete = async (id: number) => {
		const entity = await this.findByIdOrFail(id);
		const repo = await this.getRepository();
		return await repo.remove(entity);
	};

	update = async (id: number, updateData: any) => {
		const entity = await this.findByIdOrFail(id);
		const repo = await this.getRepository();
		return await repo.save(Object.assign(entity, updateData));
	};

	private getRepository = async (): Promise<Repository<ObjectLiteral>> => {
		return this.dataSource.getRepository(this.entityName);
	};
}
