import { Sequelize } from 'sequelize'

export default class Database {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './usuarios.db',
            logging: false
        })
    }
    async autenticar() {
        try {
            const autenticado = await this.sequelize.authenticate()
            console.log('Banco de dados autenticado.')
            return autenticado
        }
        catch(error) {
            throw new Error(`Erro de autenticação com o banco de dados:\n\n${error.message}`)
        }
    }
    async sincronizar() {
        try {
            const sincronizado = await this.sequelize.sync({ force: true, alter: true })
            console.log('Banco de dados sincronizado.')
            return sincronizado
        }
        catch(error) {
            throw new Error(`Erro de sincronização com o banco de dados:\n\n${error.message}`)
        }
    }
}