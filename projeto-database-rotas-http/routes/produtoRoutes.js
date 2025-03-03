import * as controllers from '../controllers/produtoController.js'
import { Router } from 'express'

const router = Router()

router.get('/:id?', controllers.procurarProdutos)

router.post('/cadastrar/', controllers.cadastrarProduto)

router.delete('/deletar/:id?', controllers.deletarProduto)

router.patch('/atualizar/:id?', controllers.atualizarProduto)

export default router