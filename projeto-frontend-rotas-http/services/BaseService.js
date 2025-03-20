import { Op } from "sequelize"

export default class BaseService {
    constructor(Repository) {
        this.repository = Repository
    }
    
    async createData(propriedades) {
        try {
           return await this.repository.insert(propriedades) 
        }
        catch(error) {
            throw new Error(error.message)
        }
    }
    
    async getData(filtros) {
        try {
            if (!filtros) {
                return await this.repository.selectAll()
            }
            const where = {}
            Object.keys(filtros)
                .forEach(propriedade => {
                    where[propriedade] = {
                        [Op.like]: `%%${filtros[propriedade]}%%` 
                    }
                })
            return await this.repository.select({ where })
        }
        catch(error) {
            throw new Error(error.message)
        }
    }
    
    async deleteData(id) {
        try {
            if (!id) {
                throw new Error("ID está vazio.")
            }
            return await this.repository.delete(id)
        }
        catch(error) {
            throw new Error(error.message)
        }
    }
    
    async updateData(id, propriedades) {
        try {
            if (!id) {
                throw new Error("Id está vazio.")
            }
            return await this.repository.update(id, propriedades)
        }
        catch(error) {
            throw new Error(error.message)
        }
    }
}