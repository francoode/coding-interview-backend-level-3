import { ResponseToolkit, Request } from '@hapi/hapi';
import { BaseCrudService } from '../sevices/base-crud.service';
import { ServiceContainer } from '../../config/services';

export abstract class BaseCrudController {
	abstract serviceName: string;

	findByIdOrFail = async (req: Request, res: ResponseToolkit) => {
		const service = this.getService();

		return { hola: 'find' };
	};

	create = async (data: any) => {
		try {
			const service = this.getService();
			const entity = await service.create(data);
			return entity;
		} catch (e) {
			console.log(e);
		}
	};

	findBy = async (filters: any) => {
		throw new Error('Method not implemented.');
	};

	delete = async (id: number) => {
		throw new Error('Method not implemented.');
	};

	update = async (id: number, data: any) => {
		throw new Error('Method not implemented.');
	};

	getService = (): BaseCrudService => {
		const container = ServiceContainer.getInstance().getContainer();
		return container.resolve<BaseCrudService>(this.serviceName);
	};
}
