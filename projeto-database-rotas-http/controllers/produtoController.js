import * as services from "../services/produtoService.js"

export const cadastrarProduto = async (req, res) => {
    try {
        if (Object.keys(req.body).filter(p => p != req.body.descricao).length < 1) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos' })
        }
        let { codigo, quantidade } = req.body
        const codigoExistente = await services.selectProdutos({ codigo })
        if (codigoExistente.length > 0) {
            return res.status(409).json({ message: 'Código informado já existe' })
        }
        req.body.precoTotal = req.body.preco * quantidade
        req.body.preco = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(req.body.preco)
          req.body.precoTotal = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(req.body.precoTotal)
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