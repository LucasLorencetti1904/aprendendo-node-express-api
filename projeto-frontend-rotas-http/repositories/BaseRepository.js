import Perfil from "../models/Perfil.js"
import Tubo from "../models/Tubo.js"

export default class BaseRepository {
    constructor(tipo) {
        this.model = tipo == "perfil"
            ? Perfil
            : Tubo
    }

    async selectData() {
        try {
            return await this.model.findAll()
        }
        catch(error) {
            throw new Error("Erro ao procurar dados.")
        }
    }

    async insertData(dados) {
        try {
            return await this.model.create(dados)
        }
        catch(error) {
            throw new Error("Erro ao salvar dados.")
        }
    }

    async deleteData(id) {
        try {
            const dado = this.model.findByPk(id)
            return await dado.destroy()
        }
        catch(error) {
            throw new Error("Erro ao deletar dados.")
        }
    }

    async updateData(id, novosDados) {
        try {
            const dado = this.model.findByPk(id)
            return await dado.update(novosDados)
        }
        catch(error) {
            throw new Error("Erro ao atualizar dados.")
        }
    }
}