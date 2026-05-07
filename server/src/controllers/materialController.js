import { pool } from '../services/db.service.js'

const tableColumns = ['material_name', 'type_id', 'unit_price', 'stock_quantity', 'min_quantity', 'package_quantity', 'measurement_unit']
const selectedQuery = `
  SELECT
    m.*,
    t.type_name,
    SUM(mp.materials_required) as required_amount
  FROM materials m
  JOIN materials_products mp
    ON m.id = mp.material_id
  JOIN material_types t
    ON m.type_id = t.id
  WHERE id = $1
  GROUP BY m.id, t.type_name
  ORDER BY m.id
`

class Materials {
  /**
   * @@returns {Promise<any[]>} 
   */
  static async getAll() {
    const queryParts = selectedQuery.split('WHERE id = $1')
    const newQuery = queryParts.join('')

    const result = await pool.query(newQuery)
    return result.rows
  }

  /**
   * @param {number} id 
   * @returns {Promise<any>} 
   */
  static async get(id) {
    const result = await pool.query(selectedQuery, [id])
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
}

export default Materials