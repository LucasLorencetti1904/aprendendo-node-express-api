let idInicial = 1
let usuarios = []

export const exibirUsuarios = async (req, res) => {
  try {
    const { id } = req.params
    if (usuarios.length < 1) {
      res.status(200).json({ sucess: true, message: "Sem usuários cadastrados" })
      return
    } else {
      if (isNaN(id)) {
        res.status(200).json({ sucess: true, message: usuarios })
        return
      }
      const usuarioFiltrado = usuarios.find(u => u.id == id)
      if (!usuarioFiltrado) {
        res.status(404).json({ success: false, message: "Usuário não encontrado" })
        return
      }
      res.status(200).json({ success: true, message: usuarioFiltrado })
      return
    }
  }
  catch(error) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}

export const cadastrarUsuario = async (req, res) => {
  try {
    const novoUsuario = { ...req.body }
    if (Object.values(novoUsuario).some(v => !v)) {
      res.status(400).json({ success: false, message: "Dados incompletos ou incorretos" })
      return
    }
    else if (usuarios.some(usuario => usuario.email === novoUsuario.email)) {
      res.status(409).json({ success: false, message: "O email já existe" })
      return
    } else {
      const usuario = { id: idInicial++, ...novoUsuario }
      usuarios.push(usuario)
      res.status(201).json({ success: true, message: "Usuário cadastrado com sucesso", data: usuario })
      return
    }
  }
  catch(error) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}

export const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const idDelete = usuarios.findIndex(u => u.id == id)
    if (idDelete == -1) {
      res.status(404).json({ success: false, message: "Usuário não encontrado" })
      return
    } else {
      res.status(200).json({ success: true, message: "Usuário deletado com sucesso", data: usuarios[idDelete] })
      usuarios.splice(idDelete, 1)
      return
    }
  }
  catch(error) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}

export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const email = req.body.email
    const usuario = usuarios.find(u => u.id == id)
    if (!usuario) {
      res.status(404).json({ success: false, message: "Usuário não encontrado" })
      return
    }
    else if (usuarios.some(u => email == u.email)) {
      res.status(409).json({ success: false, message: "O email já existe" })
      return
    } else {
      res.status(200).json({ success: true, message: "Usuário atualizado com sucesso", data: usuario })
      for (let prop in req.body) {
        if (req.body[prop]) usuario[prop] = req.body[prop]
      }
      return
    }
  }
  catch(error) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}