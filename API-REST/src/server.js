import app from "./app.js";

const PORT = process.env.PORT || 8081

   // Escutador da porta
   app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})




