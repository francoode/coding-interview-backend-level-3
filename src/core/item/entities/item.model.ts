import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({ length: 300, nullable: false })
	name: string;
	@Column('decimal', { precision: 10, scale: 2, nullable: false })
	price: number;
}
