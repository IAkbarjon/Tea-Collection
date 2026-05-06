import { Router } from 'express'
import { pool } from '../services/db.service.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM products ORDER BY id`)

        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.message || error || 'Внутренняя ошибка сервера'
        })
    }
})
router.get('/types', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM product_types`)

        return res.status(200).json(result.rows)
    }catch (error) {
        return res.status(error.status ?? 500).json({
            error: error.message ?? error
        })
    }
})

export default router
