import { Router } from 'express'
import { pool } from '../services/db.service.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                p.*,
                t.type_name,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'material_id', mp.material_id,
                            'material_amount', mp.materials_required
                        )
                    ) FILTER (WHERE mp.material_id IS NOT NULL),
                    '[]'::json
                ) AS MATERIALS
            FROM products p
            LEFT JOIN product_types t ON p.type_id = t.id
            LEFT JOIN materials_products mp ON p.id = mp.product_id
            GROUP BY p.id, t.type_name
            ORDER BY p.id
        `)

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
