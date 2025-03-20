export default class BaseRepository {
    constructor(Model) {
        this.model = Model
    }
    
    async insert(propriedades) {
        try {
            return await this.model.create(propriedades)
        }
        catch(error) {
            throw new Error(`Erro ao criar ${this.model.name}`)
        }
    }
    
    async select(filtros) {
        try {
            return await this.model.findAll(filtro)
        }
        catch(error) {
            throw new Error(`Erro ao procurar ${this.model.name}`)
        }
    }
    
    async selectAll() {
        try {
            return await this.model.findAll()
        }
        catch(error) {
            throw new Error(`Erro ao procurar ${this.model.name}`)
        }
    }
    
    async delete(id) {
        try {
            const dado = await this.model.findByPk(id)
            return await dado.destroy()
        }
        catch(error) {
            throw new Error(`Erro ao deletar ${this.model.name}`)
        }
    }
    
    async update(id, propriedades) {
        try {
            const dado = await this.model.findByPk(id)
            return await dado.update(propriedades)
        }
        catch(error) {
            throw new Error(`Erro ao atualizar ${this.model.name}`)
        }
    }
}