import validator from 'validator'
import { isValid, differenceInYears, parse } from 'date-fns'
import { isValidPhoneNumber } from 'libphonenumber-js'
import cep from 'cep-promise'

export default class UsuarioValidation {
    constructor(propriedades) {
        this.propriedades = propriedades
        this.validar()
    }
    async validar() {
        const validacoes = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        validacoes.filter(v => v != 'validarCep').forEach(validacao => this[validacao]())
        await this.validarCep()
    }   
    validarNome() {
        const nome = this.propriedades.nome
        if (!nome) {
            throw new Error('O nome está vazio.')
        }
        if (!validator.isLength(nome, { min: 4, max: 50 })) {
            throw new Error('O nome deve conter entre 4 e 50 caracteres.')
        }
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
            throw new Error('O nome deve conter apenas letras e espaços')
        }
    }

    validarUsuario() {
        const usuario = this.propriedades.usuario
        if (!usuario) {
            throw new Error('O nome de usuário está vazio.')
        }
        if (!validator.isLength(usuario, { min: 4, max: 12 })) {
            throw new Error('O nome de usuário deve conter entre 4 e 12 caracteres.')
        }
        if (/[À-ÿ]/i.test(usuario)) {
            throw new Error('O nome de usuário não pode conter acentuação.')
        }
        if (!/^[a-zA-Z0-9_]+$/.test(usuario)) {
            throw new Error('O nome de usuário deve conter apenas letras, números ou underline.')
        }
    }

    validarEmail() {
        if (!validator.isEmail(this.propriedades.email)) {
            throw new Error('Por favor, digite um email válido.')
        }
    }

    validarSenha() {
        const senha = this.propriedades.senha
        if (!senha) {
            throw new Error('A senha está vazia.')
        }
        if (!validator.isLength(senha, { min: 4, max: 20 })) {
            throw new Error('A senha deve conter entre 4 e 20 caracteres.')
        }
        if (!validator.isLowercase(senha)) {
            throw new Error('A senha deve conter pelo menos 1 letra minúscula.')
        }
        if (!validator.isUppercase(senha)) {
            throw new Error('A senha deve conter pelo menos 1 letra maiúscula.')
        }
        if (!validator.isNumeric(senha)) {
            throw new Error('A senha deve conter pelo menos 1 número.')
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            throw new Error('A senha deve conter pelo menos 1 caractere especial.')
        }
        if (/[À-ÿ]/i.test(senha)) {
            throw new Error('A senha não pode conter acentuação.')
        }
    }

    validarNascimento() {
        const nascimento = this.propriedades.nascimento
        if (!nascimento) {
            return
        }
        const data = parse(nascimento, 'dd/MM/yyyy', new Date())
        if (!isValid(data) || data > new Date()) {
            throw new Error('Data de nascimento inválida.')
        }
        if (differenceInYears(new Date(), data) < 18) {
            throw new Error('Essa idade não é permitida.')
        }
    }

    validarTelefone() {
        const telefone = this.propriedades.telefone
        if (!telefone) {
            return
        }
        if (!isValidPhoneNumber(telefone, 'BR')) {
            throw new Error('Telefone inválido.')
        }
    }

    async validarCep() {
        const CEP = this.propriedades.cep
        if (!CEP) {
            return
        }
        try {
            await cep(CEP)
        }
        catch(error) {
            throw new Error('CEP inválido.')
        }
    }
}