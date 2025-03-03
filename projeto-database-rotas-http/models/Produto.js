import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Produto = sequelize.define('Produto', {
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
    preco: {
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
    tableName: 'produtos',
    timestamps: true
})

export default Produto