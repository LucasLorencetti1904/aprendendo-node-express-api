import * as controllers from '../controllers/produtoController.js'
import { Router } from 'express'

const router = Router()

router.get('/:id?', controllers.procurarProdutos)

router.post('/cadastrar/', controllers.cadastrarProduto)

export default router