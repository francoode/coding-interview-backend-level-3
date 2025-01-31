//Strategy pattern
export interface BaseCrudRepository {
    findByIdOrFail: (id: number) => Promise<any>;
    create: (data: any) => Promise<any>;
    findBy: (filters: any) => Promise<any[]>;
    delete: (id: number) => Promise<any>;
    update: (id: number, data: any) => Promise<any>;
}