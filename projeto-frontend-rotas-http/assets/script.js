const campos = [...document.querySelectorAll("input, textarea, select")]

campos.forEach((campo) => {
  campo.addEventListener("input", (e) => {
    if (e.target.classList.contains('obrigatorio') && !e.target.value.trim()) {
      e.target.classList.add('is-invalid')
      return
    }
    e.target.classList.remove('is-invalid')
  })
})
