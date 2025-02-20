import { Router } from 'express'
import * as usuarioController from '../controllers/usuario-controller.js'

const router = Router()

router.get('/', usuarioController.exibirUsuarios)

router.post('/cadastrar', usuarioController.cadastrarUsuario)

router.delete('/deletar', usuarioController.deletarUsuario)

export default router
