const result = document.getElementById("result")

const tipo = document.getElementById("tipo")
tipo.addEventListener("change", () => {
    
    const formPerfil = document.getElementById("formPerfil")
    const formTubo = document.getElementById("formTubo")
    
    let inputsTubo = formTubo.querySelectorAll('input, select')
    let inputsPerfil = formPerfil.querySelectorAll('input, select')
    
    if (tipo.value == "tubo") {
        formPerfil.classList.add("oculto")
        formTubo.classList.remove("oculto")
        inputsTubo.forEach((input) => {
            input.setAttribute('required', true)
        })
        inputsPerfil.forEach((input) => {
            input.removeAttribute('required')
        })
        
        return
    }
    
    formTubo.classList.add("oculto")
    formPerfil.classList.remove("oculto")
    inputsPerfil.forEach((input) => {
        input.setAttribute('required', true)
    })
    inputsTubo.forEach((input) => {
        input.removeAttribute('required')
    })
    
})

const formulario = document.getElementById("formulario")
formulario.addEventListener("submit", async (e) => {
    
    e.preventDefault()
    
    const dados = {}
    const inputs = new FormData(formulario)
    
    inputs.forEach((valor, propriedade) => {
        dados[propriedade] = valor
    })
    
    const endpoint = "http://localhost:3000/salvar"
    
    return await salvarFerramenta(endpoint)
    
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
        result.innerHTML = data
        
        return console.log(data)
        
    }
    
    catch(error) {
        return console.error(`Erro de conexão: \n\n${error.message}`)
    }
    
}