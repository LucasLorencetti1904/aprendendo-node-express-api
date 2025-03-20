export default class TuboRepository {
    
    static async insert(propriedades) {
        try {
            return await Tubo.create(propriedades)
        }
        catch(error) {
            throw new Error("Erro ao criar tubo.")
        }
    }
    
    static async select(filtros) {
        try {
            return await Tubo.findAll({ where: filtros })
        }
        catch(error) {
            throw new Error("Erro ao procurar tubo.")
        }
    }
    
    static async selectAll() {
        try {
            return await Tubo.findAll()
        }
        catch(error) {
            throw new Error("Erro ao procurar tubo.")
        }
    }
    
    static async delete(filtros) {
        try {
            return await Tubo.destroy({ where: filtros })
        }
        catch(error) {
            throw new Error("Erro ao deletar tubo.")
        }
    }
    
    static async deleteById(id) {
        try {
            const tubo = await Tubo.findByPk(id)
            return await tubo.destroy()
        }
        catch(error) {
            throw new Error("Erro ao deletar tubo.")
        }
    }
    
    static async update(id, props) {
        try {
            const tubo = await Tubo.findByPk(id)
            return await tubo.update(props)
        }
        catch(error) {
            throw new Error("Erro ao atualizar tubo.")
        }
    }
}