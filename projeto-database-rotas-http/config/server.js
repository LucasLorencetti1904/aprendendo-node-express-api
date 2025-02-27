import express from 'express'
import { testarConexaoDB } from "./database.js"

const app = express()
const port = 3000

const iniciarServidor = async () => {
    try {
        const conexao = await testarConexaoDB()
        if (!conexao.ok) {
            throw new Error('Erro de conexão com o banco de dados.')
        }
        app.listen(port, () => console.log(`Servidor rodando na porta ${port}.`))
    }
    catch(error) {
        console.log(`Erro de servidor: ${error}`)
    }
}

export default iniciarServidor