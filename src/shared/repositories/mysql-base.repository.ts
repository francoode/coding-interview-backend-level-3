import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { BaseCrudRepository } from '../interfaces/base-crud.repository';
import { AppDataSource } from '../../config/data-source';

export class BaseCrudMySqlRepository implements BaseCrudRepository {
	private dataSource: DataSource = AppDataSource;
	private entityName: string;

	constructor(entityName: string) {
		this.entityName = entityName;
	}

	async findByIdOrFail(id: number): Promise<any> {
		const repo = await this.getRepository();
		return repo.findOneOrFail({ where: { id } });
	}

	create(data: any): Promise<any> {
		throw new Error('Method not implemented.');
	}

	findBy(filters: any): Promise<any[]> {
		throw new Error('Method not implemented.');
	}

	delete(id: number): Promise<any> {
		throw new Error('Method not implemented.');
	}

	update(id: number, data: any): Promise<any> {
		throw new Error('Method not implemented.');
	}

	private getRepository = async (): Promise<Repository<ObjectLiteral>> => {
		return this.dataSource.getRepository(this.entityName);
	};
}
