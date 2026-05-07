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

        const data = Materials.add(body)

        return res.status(201).json(result.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(error.status ?? 500).json({
            error: error.message ?? error
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params
        const body = req.body

        if (!id) throw {
            status: 401,
            message: 'В запросе не хватает параметка id'
        }

        const bodyKeys = Object.keys(body)
        for (const key in body) {
            if (!tableColumns.includes(key)) throw {
                status: 401,
                message: 'Данные в теле запроса не соответствуют ожидаемым'
            }
        }

        const result = await pool.query(`
            UPDATE materials
            ${bodyKeys.map((key, idx) => `SET ${key} = $${idx + 1}`)}
            WHERE id = ${bodyKeys.length + 1}
            RETURNING *
        `, [...bodyKeys.map(key => body[key])], id)

        return res.status(200).json(result.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(error.status ?? 500).json({
            error: error.message ?? error
        })
    }
})

export default router
