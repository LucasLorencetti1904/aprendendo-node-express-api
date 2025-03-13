function exibirErro(elemento) {
    elemento.classList.add("is-invalid")
    elemento.nextElementSibling.display = "block"
}

function ocultarErro(elemento) {
    elemento.classList.remove("is-invalid")
    elemento.nextElementSibling.display = "none"
}