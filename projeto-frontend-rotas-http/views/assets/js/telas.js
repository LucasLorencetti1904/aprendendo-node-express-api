const formulario = document.getElementById("formulario")

const lista = document.getElementById("lista")

const redirecionamentos = document.getElementsByName("redirecionar")
redirecionamentos.forEach((redirecionamento) => {
    redirecionamento.addEventListener("click", (e) => {
        e.preventDefault()
        formulario.classList.toggle("oculto")
        lista.classList.toggle("oculto")
    }) 
})