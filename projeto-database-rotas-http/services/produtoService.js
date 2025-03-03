import { Op } from 'sequelize'
import Produto from "../models/Produto.js"

export const insertProduto = async (produto) => {
    try {
        return Produto.create({ ...produto })
    }
    catch(error) {
        console.error(error)
        throw new Error(`Erro ao inserir produto:\n\n${error.message}`)
    }
}

export const selectProdutos = async (filtros) => {
    try {
        if (Object.keys(filtros).length < 1) {
            return await Produto.findAll()
        }

        const where = {}
        Object.keys(filtros).forEach((prop) => {
            if (filtros[prop]) {
                where[prop] = typeof filtros[prop] == "string"
                    ? { [Op.like]: `%${filtros[prop]}%` }
                    : filtros[prop]
            }
        })
        return await Produto.findAll({ where })
    }
    catch(error) {
        console.error(error)
        throw new Error(`Erro ao selecionar produto(s):\n\n${error.message}`)
    }
}