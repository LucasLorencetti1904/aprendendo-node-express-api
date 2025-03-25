const salvarItem = async (url) => {
    
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