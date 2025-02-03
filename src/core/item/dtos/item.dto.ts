import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class ItemCreateDto {
	@IsDefined()
	@IsString()
	@MaxLength(300)
	name: string;

	
	@Transform(({ value }) => {
		const num = Number(value);
		return isNaN(num) ? null : num;
	})
	@IsDefined({ message: 'Field "price" is required' })
	@IsNumber()
	@IsPositive({ message: 'Field "price" cannot be negative' })
	price: number;
}

export class ItemUpdateDto {
	@IsOptional()
	@IsString()
	@MaxLength(300)
	name: string;

	@Transform(({ value }) => {
		const num = Number(value);
		return isNaN(num) ? null : num;
	})
	@IsOptional()
	@IsNumber()
	@IsPositive({ message: 'Field "price" cannot be negative' })
	price: number;
}
