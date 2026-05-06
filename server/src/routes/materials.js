import { Router } from 'express'
import { pool } from '../services/db.service.js'

const router = Router()

const tableColumns = ['material_name', 'type_id', 'unit_price', 'stock_quantity', 'min_quantity', 'package_quantity', 'measurement_unit']

router.get('/', async (req, res) => {
    try {
        // Получение материалов с необходимым количеством
        const result = await pool.query(`
            SELECT
                m.*,
                t.type_name,
                SUM(mp.materials_required) as required_amount
            FROM materials m
            JOIN materials_products mp
                ON m.id = mp.material_id
            JOIN material_types t
                ON m.type_id = t.id
            GROUP BY m.id, t.type_name
            ORDER BY m.id
        `)

        return res.status(200).json(result.rows)
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

        const bodyKeys = Object.keys(body)
        for (let column of tableColumns) {
            if (!bodyKeys.includes(column)) {
                console.log(`Не хватает данных в теле запроса ${column}`)
                throw {
                    status: 401,
                    message: 'Не хватает данных в теле запроса'
                }
            }
        }
        if (bodyKeys.length !== tableColumns.length) {
            console.log(`body keys: ${bodyKeys.join(', ')}`)
            console.log(`table columns: ${tableColumns.join(', ')}`)
            throw {
                status: 401,
                message: 'Не хватает данных в теле запроса'
            }
        }

        const result = await pool.query(`
            INSERT INTO materials (${tableColumns.join(', ')})
            VALUES (${tableColumns.map((_, idx) => `$${idx + 1}`).join(', ')})
            RETURNING *
        `, tableColumns.map(col => body[col]))

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
