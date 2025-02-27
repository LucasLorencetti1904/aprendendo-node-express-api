import express from 'express'
import * as database from "./database.js"

const app = express()
const port = 3000

const iniciarServidor = async () => {
    try {
        const sequelize = database.conectar()
        await database.autenticar(sequelize)
        await database.sincronizar(sequelize)
        app.listen(port, () => console.log(`Servidor rodando na porta ${port}.`))
    }
    catch(error) {
        console.log(`Erro de servidor: ${error.message}\n${error.stack}`)
    }
}

export default iniciarServidor