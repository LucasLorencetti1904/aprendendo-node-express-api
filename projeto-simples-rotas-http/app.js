
import express from 'express'
import usuariosRoutes from './routes/usuario-routes.js'

const app = express()

const port = 3000

app.use(express.json())

app.use('/usuarios', usuariosRoutes)

app.listen(port, () => {
  console.log(`Servidor ligado na rota http://localhost:${port}`)
})
