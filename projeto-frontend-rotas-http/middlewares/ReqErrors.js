export default class ReqErrors {
    static tratarErros(err, req, res, next) {
        console.error(`Erro:\n\n${err.details}`)
        res.status(res.status || 500).json({
            message: err.message || "Ocorreu um erro de servidor.",
            description: err.details
        })
    }
}