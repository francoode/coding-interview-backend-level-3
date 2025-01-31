"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCrudService = void 0;
class BaseCrudService {
    constructor() {
        this.findByIdOrFail = (id) => this.repository.findByIdOrFail(id);
        this.create = (data) => this.repository.create(data);
        this.findBy = (filters = {}) => this.repository.findBy(filters);
        this.delete = (id) => this.repository.delete(id);
        this.update = (id, data) => this.repository.update(id, data);
    }
}
exports.BaseCrudService = BaseCrudService;
