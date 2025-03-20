function exibirErro(e, mensagem) {
    e.classList.add("is-invalid")
    e.nextElementSibling.innerHTML = mensagem
    e.nextElementSibling.display = "block"
}

function ocultarErro(e) {
    e.classList.remove("is-invalid")
    e.nextElementSibling.innerHTML = ""
    e.nextElementSibling.display = "none"
}

function invalido(e) {
    try {
        if (!e.value.trim()) {
            if (e.tagName == "INPUT") {
                throw new Error("Por favor preencha esse campo.")
            }
            throw new Error("Por favor escolha uma opção.")
        }
        
        if (isNaN(e.value) && e.tagName == "INPUT") {
            throw new Error("Esse campo aceita apenas números.")
        }
        
        switch(e.name) {
            case "empresa":
                if (e.value.length != 4) {
                    throw new Error("Esse campo aceita 4 dígitos.")
                }
                break
            case "cliente":
                if (e.value.length != 3) {
                    throw new Error("Esse campo aceita 3 dígitos.")
                }
                break
            case "polegadas":
                if (e.value.length != 1 && e.value.length != 2) {
                    throw new Error("Esse campo aceita entre 1 e 2 dígitos.")
                }
                break
            case "matriz":
                if (e.value.length != 2) {
                    throw new Error("Esse campo aceita 2 dígitos.")
                }
                break
        }
        
        return false
    }
    catch(error) {
        return error.message
    }
}

function dataAtual() {
    const data = new Date()
    const dia = String(data.getDate()).padStart(2, "0")
    const mes = String(data.getMonth() + 1).padStart(2, "0")
    const ano = String(data.getFullYear()).padStart(2, "0")
    return `${dia}/${mes}/${ano}`
}

function horarioAtual() {
    const data = new Date()
    const hora = String(data.getHours()).padStart(2, "0")
    const minuto = String(data.getMinutes()).padStart(2, "0")
    return `${hora}:${minuto}`
}