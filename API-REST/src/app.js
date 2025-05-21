import express from 'express'
import routes from './routes.js'
import cors from 'cors'

const app = express()

app.use(cors())

// Indica para o express ler JSON no body
app.use(express.json())

// Usar o Router
app.use(routes)

export default app
