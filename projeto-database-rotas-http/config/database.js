import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './produtos.db',
    logging: false
})

export const autenticar = async () => {
    try {
        await sequelize.authenticate()
        console.log('Banco de dados autenticado.')
    }
    catch(error) {
        console.error(error)
        throw new Error(`Erro de autenticação com o banco de dados:\n\n${error.message}`)
    }
}

export const sincronizar = async () => {
    try {
        await sequelize.sync({ force: true, alter: true })
        console.log('Banco de dados sincronizado.')
    }
    catch(error) {
        console.error(error)
        throw new Error(`Erro de sincronização com o banco de dados:\n\n${error.message}`)
    }
}