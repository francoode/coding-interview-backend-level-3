import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CustomError } from './custom.error';

export class BodyValidator {
	async validate<T extends Record<string, any>>(data: any, dtoClass: new () => T) {
		if (!data) throw new CustomError({ message: 'No data provided', httpCode: 400 });
		if (!dtoClass) return true;

		const dtoInstance = plainToClass(dtoClass, data);
		const errors = await validate(dtoInstance);

		if (errors.length > 0) {
			const formattedErrors = this.flattenValidationErrors(errors);
			throw new CustomError({ message: formattedErrors, httpCode: 400 });
		}
	}

	private flattenValidationErrors(errors: ValidationError[]): Record<'errors', any[]> {
		const result: Record<'errors', any[]> = {
			errors: [],
		};

		errors.forEach((error) => {
			if (error.constraints && typeof error.constraints === 'object') {
				for (const message of Object.values(error.constraints)) {
					result.errors.push({
						field: error.property,
						message,
					});
					break;
				}
			}
		});

		return result;
	}
}
