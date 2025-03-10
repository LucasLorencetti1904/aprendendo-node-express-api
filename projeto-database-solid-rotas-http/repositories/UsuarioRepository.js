import Usuario from "../models/Usuario.js";
import UsuarioRepositoryInterface from "./UsuarioRepositoryInterface.js";

export default class UsuarioRepository extends UsuarioRepositoryInterface {
    async selectAll() {
        return await Usuario.findAll()
    }
    async select(filtro) {
        return await Usuario.findAll({ filtro })
    }
    async insert(propriedades) {
        return await Usuario.create({ propriedades })
    }
    async delete(id) {
        return await Usuario.destroy({ where: { id } })
    }
    async update(id, propriedades) {
        return await Usuario.update({ propriedades }, { where: { id } })
    }
}