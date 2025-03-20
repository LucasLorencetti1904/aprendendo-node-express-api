export default class PerfilRepository {
    
    static async insert(propriedades) {
        try {
            return await Perfil.create(propriedades)
        }
        catch(error) {
            throw new Error("Erro ao criar perfil.")
        }
    }
    
    static async select(filtros) {
        try {
            return await Perfil.findAll({ where: filtros })
        }
        catch(error) {
            throw new Error("Erro ao procurar perfil.")
        }
    }
    
    static async selectAll() {
        try {
            return await Perfil.findAll()
        }
        catch(error) {
            throw new Error("Erro ao procurar perfil.")
        }
    }
    
    static async delete(filtros) {
        try {
            return await Perfil.destroy({ where: filtros })
        }
        catch(error) {
            throw new Error("Erro ao deletar perfil.")
        }
    }
    
    static async deleteById(id) {
        try {
            const perfil = await Perfil.findByPk(id)
            return await perfil.destroy()
        }
        catch(error) {
            throw new Error("Erro ao deletar perfil.")
        }
    }
    
    static async update(id, props) {
        try {
            const perfil = await Perfil.findByPk(id)
            return await perfil.update(props)
        }
        catch(error) {
            throw new Error("Erro ao atualizar perfil.")
        }
    }
}