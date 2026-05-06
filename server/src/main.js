import express from 'express'
import viteExpress from 'vite-express'
import cors from 'cors'
import { config } from 'dotenv'

config()

import MaterialsRoute from './routes/materials.js'
import ProductsRoute from './routes/products.js'

const app = express()

//middlewares
app.use(cors({
    origin: process.env.CLIENT_ORIGIN
}))
app.use(express.json())

//routes
app.use('/api/materials', MaterialsRoute)
app.use('/api/products', ProductsRoute)

const port = process.env.SERVER_PORT

viteExpress.listen(app, port, () => {
    console.log(`Сервер запущен по адресу http://localhost:${port}`)
})
