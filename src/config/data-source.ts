import { DataSource } from 'typeorm';
import { Item } from '../core/item/entities/item.model';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: ':memory:',
	synchronize: true,
	logging: false,
	entities: [Item],
});
