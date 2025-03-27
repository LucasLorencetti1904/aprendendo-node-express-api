const formPerfil = document.getElementById("formPerfil")
const formTubo = document.getElementById("formTubo")
const tipo = document.getElementById("tipo")

tipo.addEventListener("change", () => {
    
    if (tipo.value == "perfil") {
        formTubo.classList.add("oculto")
        formPerfil.classList.remove("oculto")
        
        inputsTubo
        .forEach((input) => {
            input.value = ""
            ocultarErro(input)
        })
        return
    }
    
    formPerfil.classList.add("oculto")
    formTubo.classList.remove("oculto")
    
    inputsPerfil
        .forEach((input) => {
            input.value = ""
            ocultarErro(input)
        })
    
})



const inputsGerais = document.querySelectorAll("input, select")

inputsGerais
    .forEach((input) => {
        input.addEventListener("input", () => {
            
            if (input.value.trim()) {
                ocultarErro(input)
                return
            }
            
        })
    })



const inputsTubo = formTubo.querySelectorAll('input, select')
const inputsPerfil = formPerfil.querySelectorAll('input, select')
const campos = document.getElementById("campos")

campos.addEventListener("submit", async (e) => {
    
    e.preventDefault()
    
    let mensagem = invalido(tipo)
    if (invalido(tipo)) {
        exibirErro(tipo, mensagem)
        return
    }
    
    const arrayInputs = Array.from((tipo.value == "perfil"
        ? inputsPerfil
        : inputsTubo
    ))
    
    arrayInputs
        .forEach((input) => {
            mensagem = invalido(input)
            if (invalido(input)) {
                exibirErro(input, mensagem)
            }
        })
    
    const erro = arrayInputs.some((input) => invalido(input))
    
    if (erro) return
    
    const dados = {}
    const inputs = new FormData(campos)
    
    inputs
        .forEach((valor, propriedade) => {
            if (valor) {
                dados[propriedade] = valor
            }
        })
    
    const endpoint = "http://localhost:3000/salvar"
    
    try {
        const dadosRecebidos = await salvarItem(endpoint, dados)
    }
    
    catch(error) {
        alert(error)
    }
    
    arrayInputs
        .filter(e => e.id != "tipo")
        .forEach((input) => input.value = "")
        
    alert(
        (dados.tipo == "perfil"
            ? `${dados.empresa}/${dados.cliente}${
                dados.categoria == "nenhuma"
                    ? ""
                    : dados.categoria.toUpperCase()
                }`
            : `${dados.polegadas}"${dados.matriz}`)
        + ` (${dataAtual()} às ${horarioAtual()})`
    )
    
})
