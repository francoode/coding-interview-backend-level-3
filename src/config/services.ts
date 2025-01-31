import { asClass, createContainer } from 'awilix';
import { ItemRepository } from '../core/item/repositories/item.repository';
import { ItemService } from '../core/item/services/item.service';

//@todo cambiar dependencias
export const services = [
	{
		service: ItemService,
		dependencies: [ItemRepository],
	},
];

export const getServices = () => {
	const container = createContainer();
	for (const s of services) {
		try {
			const service = s.service;

			container.register(
				service.name,
				asClass(service).inject(() => ({
					repository: ItemRepository,
				})),
			);
		} catch (error) {
            console.error(`Error injecting service ${s.service.name}: ${error}`);
        }
	}

	return container;
};
