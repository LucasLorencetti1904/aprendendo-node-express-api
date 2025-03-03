import { selectProdutos } from "../services/produtoService.js"

export const converterParaReais = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valor)
}

export const codigoJaExistente = async (codigo) => {
  const codigoExistente = await selectProdutos({ codigo })
  if (codigoExistente.length > 0) {
    return true
  }
  return false
}