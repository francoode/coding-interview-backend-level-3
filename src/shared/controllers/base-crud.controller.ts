import { ResponseToolkit, Request } from '@hapi/hapi';
import { BaseCrudService } from '../sevices/base-crud.service';
import { ServiceContainer } from '../../config/services';

export abstract class BaseCrudController {
	abstract serviceName: string;

	findByIdOrFail = async (req: Request, res: ResponseToolkit) => {
		try {
			const entities = await this.getService().findByIdOrFail(req.params.id);
			return entities;
		} catch (e) {
			console.log(e);
		}
	};

	create = async (req: Request, res: ResponseToolkit) => {
		try {
			const service = this.getService();
			const entity = await service.create(req.payload);
			return res.response(entity).code(201);
		} catch (e) {
			console.log(e);
		}
	};

	findBy = async () => {
		try {
			console.log(1);
			const service = this.getService();
			const entity = await service.findBy();
			return entity;
		} catch (e) {
			console.log(e);
		}
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
