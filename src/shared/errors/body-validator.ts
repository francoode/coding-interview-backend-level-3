import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CustomError } from './custom.error';
import Joi from 'joi';

export class BodyValidator {
	async validate(data: any, dtoClass: Joi.ObjectSchema<any>) {
		if (!data) throw new CustomError({ message: 'No data provided', httpCode: 400 });
		if (!dtoClass) return true;

		const { error } = dtoClass.validate(data);

		if (error && error.details && Array.isArray(error.details)) {
			const firstError = error.details[0];
			console.log(firstError);
			const formattedErrors = {
				errors: [
					{
						field: firstError.context?.label,
						message: firstError.message,
					},
				],
			};

			throw new CustomError({ message: formattedErrors, httpCode: 400 });
		}
	}
}
