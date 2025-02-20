let idInicial = 1
let usuarios = []

export const exibirUsuarios = async (req, res) => {
  try {
    if (usuarios.length < 1) {
      res.status(200).json({ sucess: true, message: "Sem usuários cadastrados" })
    } else {
      res.status(200).json({ sucess: true, message: usuarios })
    }
  }
  catch(error) {
    res.status(500).json({ sucess: false, message: error.message })
  }
}

export const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email } =  req.body
    const novoUsuario = { id: null, nome: nome, email: email }
    if (!novoUsuario.nome || !novoUsuario.email) {
      res.status(400).json({ sucess: false, message: "Dados incompletos ou incorretos" })
    }
    else if (usuarios.some(usuario => usuario.email === novoUsuario.email)) {
      res.status(409).json({ sucess: false, message: "O email já existe" })
    } else {
      novoUsuario.id = idInicial++
      usuarios.push(novoUsuario)
      res.status(201).json({ sucess: true, message: "Usuário cadastrado com sucesso", data: novoUsuario })
    }
  }
  catch(error) {
    res.status(500).json({ sucess: false, message: error.message })
  }
}

export const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.query
    const idDelete = usuarios.findIndex(usuario => usuario.id == id)
    if (idDelete === -1) {
      res.status(404).json({ sucess: false, message: "Usuário não encontrado" })
    } else {
      res.status(200).json({ sucess: true, message: "Usuário deletado com sucesso", data: usuarios[idDelete] })
      usuarios.splice(idDelete, 1)
    }
  }
  catch(error) {
    res.status(500).json({ sucess: false, message: error.message })
  }
}

