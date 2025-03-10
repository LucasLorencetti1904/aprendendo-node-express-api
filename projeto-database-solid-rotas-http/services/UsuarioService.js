import { Op } from "sequelize";
import usuarioServiceInterface from "./usuarioServiceInterface";

export default class usuarioService extends usuarioServiceInterface {
    constructor(usuarioRepository) {
        super(usuarioRepository)
    }
    async getUsuarios(filtro) {
        if (Object.keys(filtro).length < 1) {
            return await this.usuarioRepository.selectAll()
        }
        const where = {}
        Object.keys(filtro).forEach((prop) => {
            if (filtro[prop]) {
                where[prop] = typeof filtro[prop] == "string"
                    ? { [Op.like]: `%%${filtro[prop]}%%` }
                    : filtro[prop]
            }
        })
        return await this.usuarioRepository.select({ where })
    }
}