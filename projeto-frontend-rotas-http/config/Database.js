import { Sequelize } from "sequelize"

class Database {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: "sqlite",
            storage: "db_ferramentas.sqlite",
            logging: false
        })
    }
    async autenticar() {
        try {
            await this.sequelize.authenticate()
            console.log("DB autenticado.")
        }
        catch(error) {
            throw new Error(`Erro de autenticação DB:\n\n${error}`)
        }
    }
    async sincronizar() {
        try {
            await this.sequelize.sync({ force: true })
            console.log("DB sincronizado.")
        }
        catch(error) {
            throw new Error(`Erro de sincronização DB:\n\n${error}`)
        }
    }
    async conectar() {
        try {
            await this.autenticar()
            return await this.sincronizar()
        }
        catch(error) {
            throw new Error(error.message)
        }
    }
}

export default new Database()