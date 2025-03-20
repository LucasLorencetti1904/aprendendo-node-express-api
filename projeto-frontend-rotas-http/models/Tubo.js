import { DataTypes } from "sequelize"
import database from "../config/Database.js"

class Tubo extends Model {}

Tubo.init({
    polegadas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    matriz: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    database: database.sequelize,
    timestamps: true,
    tableName: "tubos"
})