import { pool } from '../services/db.service.js'

const tableColumns = ['material_name', 'type_id', 'unit_price', 'stock_quantity', 'min_quantity', 'package_quantity', 'measurement_unit']
const selectedQuery = `
  SELECT
    m.*,
    t.type_name,
    SUM(mp.materials_required) as required_amount
  FROM materials m
  LEFT JOIN materials_products mp
    ON m.id = mp.material_id
  LEFT JOIN material_types t
    ON m.type_id = t.id
  GROUP BY m.id, t.type_name
  ORDER BY m.id
`

class Materials {
  /**
   * @@returns {Promise<any[]>} 
   */
  static async getAll() {
    const result = await pool.query(selectedQuery)
    return result.rows
  }

  /**
   * @param {number} id 
   * @returns {Promise<any>} 
   */
  static async get(id) {
    const result = await pool.query(`
      SELECT
        m.*,
        SUM(mp.materials_required) as required_amount
      FROM materials m
      LEFT JOIN materials_products mp ON m.id = mp.material_id
      WHERE m.id = $1
      GROUP BY m.id
    `, [id])

    return result.rows[0]
  }

  /**
   * @param {object} body 
   * @returns {Promise<any>} 
   */
  static async add(body) {
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

    const createdResult = await pool.query(`
      INSERT INTO materials (${tableColumns.join(', ')})
      VALUES (${tableColumns.map((_, idx) => `$${idx + 1}`).join(', ')})
      RETURNING id
    `, tableColumns.map(col => body[col]))

    const { id } = createdResult.rows[0]

    const data = await Materials.get(id)

    return data
  }

  /**
   * @param {number} id 
   * @param {any} newData 
   * @returns {Promise<any>} 
   */
  static async edit(id, body) {
    const bodyKeys = Object.keys(body)
    for (const key in body) {
      if (!tableColumns.includes(key)) throw {
        status: 401,
        message: 'Данные в теле запроса не соответствуют ожидаемым'
      }
    }

    console.log(body)

    const query = `
      UPDATE materials
      SET ${bodyKeys.map((key, idx) => `${key} = $${idx + 1}`).join(', ')}
      WHERE id = $${bodyKeys.length + 1}
    `

    console.log(query)
    
    const editingResult = await pool.query(query, [...bodyKeys.map(key => body[key]), id])

    const data = await Materials.get(id)

    return data
  }
}

export default Materials