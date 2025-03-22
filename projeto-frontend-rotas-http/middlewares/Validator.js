import { body, validationResults } from 'express-validator'

export default class Validator {
    
    static validarCampos(tipo) {
        const validacaoTipo = [
            body("tipo")
                .notEmpty()
                .withMessage("O tipo não pode ser vazio.")
                .custom((value) => {
                    if (!["perfil", "tubo"].includes(value)) {
                        throw new Error("O tipo deve ser válido.")
                    }
                    return true
                })
        ]
        switch (tipo) {
            case "perfil":
                return [
                    ...validacaoTipo,
                    body("empresa")
                    .notEmpty()
                    .withMessage("O campo empresa não pode estar vazio.")
                    .isLength({ min: 4, max: 4 })
                    .withMessage("O campo empresa deve conter 4 caracteres.")
                    .isNumeric()
                    .withMessage("O campo empresa deve conter apenas números."),
                    body("cliente")
                    .notEmpty()
                    .withMessage("O campo cliente não pode estar vazio.")
                    .isLength({ min: 3, max: 3 })
                    .withMessage("O campo cliente deve conter 3 caracteres.")
                    .isNumeric()
                    .withMessage("O campo cliente deve conter apenas números."),
                    body("categoria")
                    .notEmpty()
                    .withMessage("A categoria não pode estar vazia.")
                    .custom((value) => {
                        if (/\d/.test(value)) {
                            throw new Error("A categoria não pode conter números")
                        }
                        if (!/[A-Z]/.test(value) && value != "nenhuma") {
                            throw new Error("A categoria deve ser válida.")
                        }
                        return true
                    })
                ]
                break
            case "tubo":
                return [
                    ...validacaoTipo,
                    body("polegadas")
                    .notEmpty()
                    .withMessage("O campo polegadas não pode estar vazio.")
                    .isLength({ min: 1, max: 2 })
                    .withMessage("O campo polegadas deve conter entre 1 e 2 caracteres.")
                    .isNumeric()
                    .withMessage("O campo polegadas deve conter apenas números."),
                    body("matriz")
                    .notEmpty()
                    .withMessage("O campo matriz não pode estar vazio.")
                    .isLength({ min: 2, max: 2 })
                    .withMessage("O campo matriz deve conter 2 caracteres.")
                    .isNumeric()
                    .withMessage("O campo matriz deve conter apenas números.")
                ]
                break
            default:
                return [ ...validacaoTipo ]
        }
    }
    
    static verificarErros(req, res, next) {
        const errors = validationResults(req)
        if (!erros.isEmpty()) {
            const error = new Error("Erro de validação.")
            error.status = 400
            error.details = errors.array()
            return next(error)
        }
        return next()
    }
}