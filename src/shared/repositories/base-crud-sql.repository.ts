import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';

export class BaseCrudSqlRepository {
	private dataSource: DataSource = AppDataSource;
	private entityName: string;

	constructor(entityName: string) {
		this.entityName = entityName;
	}

	findByIdOrFail = async (id: number) => {
		const repo = await this.getRepository();
		return repo.findOneOrFail({ where: { id } });
	};

	create = async (data: any) => {
		const repo = await this.getRepository();
		const entity = repo.create(data);
		return repo.save(entity);
	};

	findBy = async () => {
		const repo = await this.getRepository();
		return repo.findBy({});
	};

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
