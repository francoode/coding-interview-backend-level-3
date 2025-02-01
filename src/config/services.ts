import { asClass, Constructor, createContainer } from 'awilix';
import { ItemRepository } from '../core/item/repositories/item.repository';
import { ItemService } from '../core/item/services/item.service';

export class ServiceContainer {
	private static instance: ServiceContainer;

	private services: Constructor<any>[] = [ItemService, ItemRepository];
	private readonly container = createContainer();

	private constructor() {
		this.defineServices();
	}

	public static getInstance(): ServiceContainer {
		if (!ServiceContainer.instance) {
			ServiceContainer.instance = new ServiceContainer();
		}
		return ServiceContainer.instance;
	}

	private defineServices = () => {
		for (const s of this.services) {
			try {
				this.container.register({
					[s.name]: asClass(s).singleton(),
				});
			} catch (error) {
				console.error(`Error injecting service ${s.name}: ${error}`);
			}
		}
	};

	getContainer = () => {
		return this.container;
	};
}
