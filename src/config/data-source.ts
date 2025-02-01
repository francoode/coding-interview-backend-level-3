import { DataSource } from 'typeorm';
import { Item } from '../core/item/entities/item.model';

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'db',
	database: 'my_db',
	username: 'root',
	password: 'root',
    port: 3306,
	synchronize: true,
	logging: true,
	entities: [Item],
});
