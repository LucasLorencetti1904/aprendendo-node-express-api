
import express from 'express'

const app = express()

const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send(`Rota get acessada na porta ${port}.`)
})

app.listen(port, () => {
  console.log(`Servidor ligado na rota http://localhost:${port}`)
})
