import { ResponseToolkit, Request } from "@hapi/hapi";
import { BaseCrudService } from "../sevices/base-crud.service";

export abstract class BaseCrudController {

    abstract serviceName: string;
    
    findByIdOrFail = async (req: Request, res: ResponseToolkit) => {
		//const service = req.
		//return repo.findOneOrFail({ where: { id } });
	}

	create = async (data: any) => {
		throw new Error('Method not implemented.');
	}

	findBy = async (filters: any) => {
		throw new Error('Method not implemented.');
	}

	delete = async (id: number) => {
		throw new Error('Method not implemented.');
	}

	update = async (id: number, data: any) => {
		throw new Error('Method not implemented.');
	}
}