const salvarItem = async (url, dados) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dados)
        })
        if (!response.ok) {
            throw new Error("Erro de resposta do servidor.")
        }
        const data = await response.json()
        return data
    }
    catch(error) {
        throw new Error("Erro ao salvar dados.")
    }
}