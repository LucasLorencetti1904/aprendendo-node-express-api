const result = document.getElementById("result")

const formPerfil = document.getElementById("formPerfil")
const formTubo = document.getElementById("formTubo")

const inputsTubo = formTubo.querySelectorAll('input, select')
const inputsPerfil = formPerfil.querySelectorAll('input, select')

const inputsGerais = document.querySelectorAll("input, select")
inputsGerais.forEach((input) => {
    input.addEventListener("input", () => {
        if (input.value.trim()) {
            ocultarErro(input)
            return
        }
    })
})

const tipo = document.getElementById("tipo")
tipo.addEventListener("change", () => {
    
    if (tipo.value == "tubo") {
        formPerfil.classList.add("oculto")
        formTubo.classList.remove("oculto")
        
        inputsPerfil.forEach((input) => {
            input.value = ""
            ocultarErro(input)
        })
        return
    }
    
    formTubo.classList.add("oculto")
    formPerfil.classList.remove("oculto")
    
    inputsTubo.forEach((input) => {
        input.value = ""
        ocultarErro(input)
    })
    
})

const formulario = document.getElementById("formulario")
formulario.addEventListener("submit", async (e) => {
    
    e.preventDefault()
    
    if (!tipo.value.trim()) {
        exibirErro(tipo)
        return
    }
    
    const arrayInputs = Array.from((tipo.value == "tubo"
        ? inputsTubo
        : inputsPerfil
    ))
    
    arrayInputs.forEach((input) => {
        !input.value.trim() 
            ? exibirErro(input)
            : ocultarErro(input)
    })
    const erro = arrayInputs.some((input) => !input.value.trim())
    
    if (erro) return
    
    const dados = {}
    const inputs = new FormData(formulario)
    
    inputs.forEach((valor, propriedade) => {
        if (valor) {
            dados[propriedade] = valor
        }
    })
    
    const endpoint = "http://localhost:3000/salvar"

    try {
        const dados = await salvarFerramenta(endpoint)
    }
    catch(error) {
        console.error(error)
    }
    
    Array.from(inputsGerais)
        .filter(e => e.id != "tipo")
        .forEach((input) => input.value = "")
    
    alert(
        dados.tipo == "tubo"
            ? `${dados.polegadas}"${dados.matriz}`
            : `${dados.empresa}/${dados.cliente}${dados.categoria.toUpperCase()}`
    )
    
})

const salvarFerramenta = async (url) => {
    
    try {
        
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(dados)
        })
        
        if (!response.ok) {
            throw new Error("Erro de resposta do servidor.")
        }
        
        const data = await response.json()
        
        return data
        
    }
    
    catch(error) {
        return console.error(`Erro de conexão: \n\n${error.message}`)
    }
    
}

function exibirErro(elemento) {
    elemento.classList.add("is-invalid")
    elemento.nextElementSibling.display = "block"
}

function ocultarErro(elemento) {
    elemento.classList.remove("is-invalid")
    elemento.nextElementSibling.display = "none"
}