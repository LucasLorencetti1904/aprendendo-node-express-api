import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './produtos.sqlite',
    logging: false
})

export const testarConexaoDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Banco de dados autenticado.')
        return { ok: true }
    }
    catch(error) {
        throw new Error('Erro de autenticação com SQLITE.')
    }
}