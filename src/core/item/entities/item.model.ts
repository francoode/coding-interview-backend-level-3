import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 300, nullable: false })
    name: string;
    @Column({ type: 'decimal', precision: 12, scale: 3, nullable: false })
    price: number;
}