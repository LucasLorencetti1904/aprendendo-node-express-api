import express from 'express'
// import routers from '../routes/usuarioRoutes.js'
import database from './database.js'

class Server {
    constructor() {
        this.app = express()
        this.middlewares()
        // this.routes()
    }
    middlewares() {
        this.app.use(express.json())
    }
    // routes() {
    //     this.app.use('/usuarios', routers)
    // }
    async init(port) {
        try {
            await database.autenticar()
            await database.sincronizar()
            return this.app.listen(port, () => {
                console.log(`Servidor rodando na porta ${port}.`)
            })
        }
        catch(error) {
            console.error(`Erro ao inicializar servidor:\n\n${error.message}`)
        }
    }
}

export default new Server()