import UsuarioRepository from "../repositories/UsuarioRepository";

export default class usuarioServiceInterface {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository || new UsuarioRepository
    }
    async getUsuario(id) {
        throw new Error('Esse método deve ser implementado.')
    }
}