import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './produtos.db',
    logging: false
})

if (!sequelize) throw new Error('Erro de conexão com o banco de dados')

export const autenticar = async () => {
    try {
        await sequelize.authenticate()
        console.log('Banco de dados autenticado.')
    }
    catch(error) {
        throw new Error(`Erro de autenticação com o banco de dados:\n\n${error.message}`)
    }
}

export const sincronizar = async () => {
    try {
        await sequelize.sync({ force: false, alter: true })
        console.log('Banco de dados sincronizado.')
    }
    catch(error) {
        throw new Error(`Erro de sincronização com o banco de dados:\n\n${error.message}`)
    }
}