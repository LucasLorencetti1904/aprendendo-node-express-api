import BaseRepository from "../repositories/BaseRepository"

export default class BaseService {
    constructor(tipo) {
        this.repository = new BaseRepository(tipo)
    }
    async listarRegistros() {
        try {
            return await this.repository.selectData()
        }
        catch(error) {
            throw new Error(error.message)
        }
    }

    async salvarRegistro(dados) {
        try {
            return await this.repository.insertData(dados)
        }
        catch(error) {
            throw new Error(error.message)
        }
    }

    async deletarRegistro(id) {
        try {
            return await this.repository.deleteData(id)
        }
        catch(error) {
            throw new Error(error.message)
        }
    }

    async atualizarRegistro(id, novosDados) {
        try {
            return await this.repository.updateData(id, novosDados)
        }
        catch(error) {
            throw new Error(error.message)
        }
    }
}