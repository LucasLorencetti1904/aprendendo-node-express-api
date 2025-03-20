import { DataTypes } from "sequelize"
import database from "../config/Database.js"

class Perfil extends Model {}

Perfil.init({
    empresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    database: database.sequelize,
    timestamps: true,
    tableName: "perfis"
})