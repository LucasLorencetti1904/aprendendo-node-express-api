import { body, validationResult } from 'express-validator'
import { parseISO, differenceInYears } from 'date-fns'

class UsuarioValidator {
    constructor() {
        this.userValidation = [
            body('nome')
                .notEmpty()
                .withMessage('Por favor insira um nome.')
                .isLength({ min: 4, max: 12 })
                .withMessage('O nome deve conter entre 4 e 12 caracteres'),
            body('nascimento')
                .custom(valor => {
                    const dataNascimento = parseISO(valor)
                    if (isNaN(dataNascimento)) {
                        throw new Error('Por favor insira uma data de nascimento válida.')
                    }
                    if (differenceInYears(new Date(), dataNascimento) < 18) {
                        throw new Error('Apenas permitido para maiores de idade')
                    }
                    return true
                }),
            body('email')
                .isEmail()
                .withMessage('Por favor insira um email válido.'),
            body('senha')
                .isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.')
                .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
                .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
                .matches(/\d/).withMessage('A senha deve conter pelo menos um número.')
                .matches(/[@$!%*?&]/).withMessage('A senha deve conter pelo menos um caractere especial.'),
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

export default new UsuarioValidator