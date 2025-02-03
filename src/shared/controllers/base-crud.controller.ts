import { ResponseToolkit, Request } from '@hapi/hapi';
import { BaseCrudService } from '../sevices/base-crud.service';
import { ServiceContainer } from '../../config/services';
import { BodyValidator } from '../errors/body-validator';
import { Logger } from '../others/logger';
import { ErrorManager } from '../errors/error.manager';

export abstract class BaseCrudController {
	abstract serviceName: string;
	abstract createDto: { new (...args: any[]): any };
	abstract updateDto: { new (...args: any[]): any };

	readonly logger = new Logger(this.constructor.name);

	findByIdOrFail = async (req: Request, res: ResponseToolkit) => {
		try {
			const entities = await this.getService().findByIdOrFail(req.params.id);
			return entities;
		} catch (e: any) {
			return ErrorManager.manage(res, e);
		}
	};

	create = async (req: Request, res: ResponseToolkit) => {
		try {
			await new BodyValidator().validate(req.payload, this.createDto);
			const service = this.getService();
			const entity = await service.create(req.payload);
			return res.response(entity).code(201);
		} catch (e: any) {
			return ErrorManager.manage(res, e);
		}
	};

	findBy = async (res: ResponseToolkit) => {
		try {
			const service = this.getService();
			const entity = await service.findBy();
			return entity;
		} catch (e) {
			return ErrorManager.manage(res, e);
		}
	};

	delete = async (req: Request, res: ResponseToolkit) => {
		try {
			const service = this.getService();
			await service.delete(req.params.id);
			return res.response({}).code(204);
		} catch (e: any) {
			return ErrorManager.manage(res, e);
		}
	};

	update = async (req: Request, res: ResponseToolkit) => {
		try {
			await new BodyValidator().validate(req.payload, this.updateDto);
			const entity = await this.getService().update(req.params.id, req.payload);
			return entity;
		} catch (e: any) {
			return ErrorManager.manage(res, e);
		}
	};

	getService = (): BaseCrudService => {
		const container = ServiceContainer.getInstance().getContainer();
		return container.resolve<BaseCrudService>(this.serviceName);
	};
}
