export default class UsuarioRepositoryInterface {
    async selectAll() {
        throw new Error('Esse método deve ser implementado.')
    }
    async select(filtro) {
        throw new Error('Esse método deve ser implementado.')
    }
    async insert(propriedades) {
        throw new Error('Esse método deve ser implementado.')
    }
    async delete(id) {
        throw new Error('Esse método deve ser implementado.')
    }
    async update(id, propriedades) {
        throw new Error('Esse método deve ser implementado.')
    }
}