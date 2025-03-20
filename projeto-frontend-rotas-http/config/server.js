import express from "express"
import Validator from "../../middlewares/Validator.js"

const app = express()
const PORT = 3000

app.use(express.json())

app.use("/ferramentas", routes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`)
})