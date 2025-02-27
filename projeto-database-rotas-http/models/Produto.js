import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Roupas = sequelize.define('Roupas', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    precoUnitario: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },  
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precoTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'roupas',
    timestamps: true
})

export default Roupas