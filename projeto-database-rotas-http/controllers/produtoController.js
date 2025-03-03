import * as services from "../services/produtoService.js"
import * as util from "../util/utilities.js"

export const cadastrarProduto = async (req, res) => {
    try {
        if (Object.keys(req.body).filter(p => p != req.body.descricao).length < 1) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos' })
        }
        if (await util.codigoJaExistente(req.body.codigo)) {
            res.status(409).json({ message: 'Código informado já existe' })
        }
        req.body.precoTotal = util.converterParaReais(req.body.preco * req.body.quantidade)
        req.body.preco = util.converterParaReais(req.body.preco)
        const novoProduto = await services.insertProduto(req.body)
        return res.status(201).json({ message: 'Produto cadastrado', produto: novoProduto })
    }
    catch(error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro ao cadastrar produto' })
    }
}

export const procurarProdutos = async (req, res) => {
    try {
        let filtros = {}
        if (req.params.id) {
            filtros.id = req.params.id
        }
        if (Object.keys(req.body).length > 0) {
            filtros = { ...req.body }
        }
        let produtoEncontrado = await services.selectProdutos(filtros)
        if (Object.keys(produtoEncontrado).length < 1) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }
        return res.status(200).json({ message: 'Produto encontrado', produto: produtoEncontrado})
    }
    catch(error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro ao procurar produtos.' })
    }
}

export const deletarProduto = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Por favor insira um id.' })
        }
        const produtoDeletado = await services.deleteProduto(req.params.id)
        if (!produtoDeletado) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }
        return res.status(200).json({ message: 'Produto deletado', produto: produtoDeletado }) 
    }
    catch(error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro ao deletar produto.' })
    }
}

export const atualizarProduto = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Por favor insira um id.' })
        }
        if (Object.keys(req.body).length < 1) {
            return res.status(400).json({ message: 'Por favor insira os campos.' })
        }
        const produtoAtualizado = await services.updateProduto(req.params.id, req.body)
        if (!produtoAtualizado) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }
        return res.status(200).json({ message: 'Produto atualizado', produto: produtoAtualizado }) 
    }
    catch(error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro ao atualizar produto.' })
    }
}