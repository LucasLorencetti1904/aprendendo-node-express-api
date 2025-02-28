import express from 'express'
import * as database from "./database.js"

const app = express()
const port = 3000

const iniciarServidor = async () => {
    try {
        await database.autenticar()
        await database.sincronizar()
        app.listen(port, () => console.log(`Servidor rodando na porta ${port}.`))
    }
    catch(error) {
        console.error(`Erro de servidor: ${error.message}\n${error.stack}`)
    }
}

export default iniciarServidor