import { body, validationResult } from 'express-validator'
import { parse, differenceInYears } from 'date-fns'
import { isValidPhoneNumber } from 'libphonenumber-js'
import cep from 'cep-promise'

export default class UsuarioValidator {
    constructor() {
        this.userValidation = [
            body('nome')
                .notEmpty()
                .withMessage('O nome está vazio.')
                .isLength({ min: 4, max: 50 })
                .custom(valor => {
                    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(valor)) {
                        throw new Error('O nome deve conter apenas letras e espaços')
                    }
                    return true
                }),
            body('usuario')
                .notEmpty()
                .withMessage('O nome de usuário está vazio.')
                .isLength({ min: 4, max: 12 })
                .withMessage('O nome de usuário deve conter entre 4 e 12 caracteres')
                .custom(valor => {
                    if (/[À-ÿ]/i.test(valor)) {
                        throw new Error('O nome de usuário não pode conter acentuação.')
                    }
                    if (!/^[a-zA-Z0-9_]+$/.test(valor)) {
                        throw new Error('O nome de usuário deve conter apenas letras, números ou underline.')
                    }
                    return true
                }),
            body('nascimento')
                .custom(valor => {
                    const dataNascimento = parse(valor, 'dd/MM/yyyy', new Date())
                    if (!dataNascimento) {
                        return true
                    }
                    if (!isValid(dataNascimento) || dataNascimento > new Date()) {
                        throw new Error('Data de nascimento inválida.')
                    }
                    if (differenceInYears(new Date(), dataNascimento) < 18) {
                        throw new Error('Apenas permitido para maiores de idade.')
                    }
                    return true
                }),
            body('email')
                .isEmail()
                .withMessage('Por favor insira um email válido.'),
            body('senha')
                .notEmpty()
                .withMessage('A senha está vazia.')
                .isLength({ min: 4, max: 20 }).withMessage('A senha deve ter entre 4 e 8 caracteres.')
                .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
                .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
                .matches(/\d/).withMessage('A senha deve conter pelo menos um número.')
                .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('A senha deve conter pelo menos um caractere especial.')
                .custom(valor => {
                    if (/[À-ÿ]/i.test(valor)) {
                        throw new Error('A senha não pode conter acentuação.')
                    }
                    return true
                }),
            body('telefone')
                .custom(valor => {
                    if (!valor) {
                        return true
                    }
                    if(!isValidPhoneNumber(valor, 'BR')) {
                        throw new Error('Telefone inválido.')
                    }
                    return true
                }),
            body('cep')
                .custom(async valor => {
                    if (!valor) {
                        return
                    }
                    try {
                        await cep(valor)
                        return true
                    }
                    catch(error) {
                        throw new Error('CEP inválido.')
                    }
                })
        ]
    }
    validar() {
        return [
            ...this.userValidation,
            (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next()
            }
        ]
    }
}