import { BaseCrudRepository } from "../interfaces/base-crud.repository";

export abstract class BaseCrudService {
    abstract repository: BaseCrudRepository;
    
    findByIdOrFail = (id: number) => this.repository.findByIdOrFail(id);
    create = (data: any) => this.repository.create(data);
    findBy = (filters: any = {}) => this.repository.findBy(filters);
    delete = (id: number) => this.repository.delete(id);
    update = (id: number, data: any) => this.repository.update(id, data);
}