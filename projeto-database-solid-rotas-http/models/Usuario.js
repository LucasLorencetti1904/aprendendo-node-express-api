import database from '../config/database.js'
import bcrypt, { genSalt } from 'bcrypt'
import { isValid, differenceInYears } from 'date-fns'
import cep from 'cep-promise'
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
                len: [4, 50]
            }
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 12]
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
                    if (!value) {
                        return
                    }
                    if (!isValid(new Date(value))) {
                        throw new Error('Por favor, insira uma data válida.')
                    }
                    if (differenceInYears(new Date(), data) < 18) {
                        throw new Error('Essa idade não é permitida.')
                    }
                }
            }
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                telefoneValido(value) {
                    if (!value) {
                        return
                    }
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
                    if (!value) {
                        return
                    }
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