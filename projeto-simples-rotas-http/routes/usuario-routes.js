import { Router } from 'express'
import * as usuarioController from '../controllers/usuario-controller.js'

const router = Router()

router.get('/:id?', usuarioController.exibirUsuarios)

router.post('/cadastrar', usuarioController.cadastrarUsuario)

router.delete('/deletar/:id', usuarioController.deletarUsuario)

router.patch('/atualizar/:id', usuarioController.atualizarUsuario)

export default router