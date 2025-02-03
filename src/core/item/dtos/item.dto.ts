import Joi from 'joi';

export const ItemCreateSchema = Joi.object({
	name: Joi.string().max(300).required(),

	price: Joi.alternatives().try(Joi.number().min(0)).required().messages({
		'any.required': 'Field "price" is required',
		'number.min': 'Field "price" cannot be negative',
	}),
});

export const ItemUpdateSchema = Joi.object({
	name: Joi.string().max(300).optional(),

	price: Joi.alternatives().try(Joi.number().min(0)).optional().messages({
		'number.min': 'Field "price" cannot be negative',
	}),
});
