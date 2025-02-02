import { BaseCrudSqlRepository } from "../repositories/base-crud-sql.repository";


export abstract class BaseCrudService {
    //@todo
    protected abstract  repository: BaseCrudSqlRepository;
    
    findByIdOrFail = (id: number) => this.repository.findByIdOrFail(id);
    create = (data: any) => this.repository.create(data);
    findBy = () => this.repository.findBy();
    delete = (id: number) => this.repository.delete(id);
    update = (id: number, data: any) => this.repository.update(id, data);
}