
import express from 'express'

const app = express()

const port = 3000

app.use(express.json())

const usuarios = []
let id = 1

app.get('/usuarios', (req, res) => {
  if (usuarios.length < 1) {
    res.status(200).send("Nenhum dado encontrado.")
  } else {
    res.status(200).json(usuarios)
  }
})

app.post('/usuarios/cadastrar', (req, res) => {
  const { nome, email } = req.body
  const usuario = {
    id: id++,
    nome: nome,
    email: email
  }
  usuarios.push(usuario)
  res.status(201).json({ message: "Dados recebidos." })
})

app.listen(port, () => {
  console.log(`Servidor ligado na rota http://localhost:${port}`)
})
