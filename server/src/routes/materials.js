import { Router } from 'express'
import { pool } from '../services/db.service.js'
import Materials from '../controllers/materialController.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const data = await Materials.getAll()

        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            error: error.message || error || 'Внутренняя ошибка сервера'
        })
    }
})

router.get('/types', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM material_types`)

        return res.status(200).json(result.rows)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            error: error.message ?? error
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const body = req.body

        const data = await Materials.add(body)
        console.log(data)

        return res.status(201).json(data)
    } catch (error) {
        console.log(error)
        return res.status(error.status ?? 500).json({
            error: error.message ?? error
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body

        if (!id) throw {
            status: 401,
            message: 'В запросе не хватает параметка id'
        }

        const data = await Materials.edit(id, body)

        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(error.status ?? 500).json({
            error: error.message ?? error
        })
    }
})

export default router
