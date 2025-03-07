import database from '../config/database.js'
import bcrypt, { genSalt } from 'bcrypt'
import { isValid } from 'date-fns'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { DataTypes } from 'sequelize'
import { Hooks } from 'sequelize/lib/hooks'

class Usuario extends Model {
    async criptografarSenha(senha) {
        const sal = await genSalt(10)
        return await bcrypt.hash(senha, sal)
    }
}

Usuario.init(
    {   
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4, 12]
            }
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 50]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Por favor, insira um email válido.' 
                }
            }   
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4, 20]
            }
        },
        aniversario: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                dataValida(value) {
                    if (!isValid(new Date(value))) {
                        throw new Error('Por favor, insira uma data válida.')
                    }
                }
            }
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                telefoneValido(value) {
                    if (!isValidPhoneNumber(value, 'BR')) {
                        throw new Error('Por favor, insira um número de telefone válido.')
                    }
                }
            }
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                async cepValido(value) {
                    try {
                        return await cep(value)
                    }
                    catch(error) {
                        throw new Error('Por favor, insira um CEP válido.')
                    }
                }
            }
        }
    },
    {
        database,
        modelName: 'usuarios',
        Hooks: {
            beforeCreate: async (usuario) => {
                if (usuario.senha) {
                    usuario.senha = criptografarSenha(usuario.senha)
                }
            }
        }
    }
)

export default Usuario