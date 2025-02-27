import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

export const conectar = () => {
    try {
        if (!process.env.DB_URL) {
            throw new Error('URL de conexão do banco de dados não definida.')
        }
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: process.env.DB_URL,
            logging: false
        })
        return sequelize
    }
    catch(error) {
        console.log(`Erro de conexão com o banco de dados:\n\n${error.message}\n${error.stack}`)
    }
}

export const autenticar = async (sequelize) => {
    try {
        await sequelize.authenticate()
        console.log('Banco de dados autenticado.')
    }
    catch(error) {
        throw new Error(`Erro de autenticação com o banco de dados:\n\n${error.message}`)
    }
}

export const sincronizar = async (sequelize) => {
    try {
        await sequelize.sync({ force: false, alter: true })
        console.log('Banco de dados sincronizado.')
    }
    catch(error) {
        throw new Error(`Erro de sincronização com o banco de dados:\n\n${error.message}`)
    }
}