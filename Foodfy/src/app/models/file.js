const db = require('../../config/db')
const fs = require('fs')

module.exports = {

  async create ({ filename, path, recipe_id }) {
    const result = await db.query(`
    INSERT INTO files (
      name,
      path
    )VALUES ($1, $2)
    RETURNING id
    `, [filename, path])
    const fileId = result.rows[0].id

    const query = `
    INSERT INTO recipe_files (
      recipe_id,
      file_id
    )VALUES ($1, $2)
    RETURNING id`

    const values = [
      recipe_id,
      fileId
    ]

    return db.query(query, values)
  },
  createChef ({ name, path }) {
    return db.query(`
    INSERT INTO files (
      name,
      path
    )VALUES ($1, $2)
    RETURNING id
    `, [name, path])
  },
  async delete (id) {
    try {
      const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
      const file = result.rows[0]

      fs.unlinkSync(file.path)

      db.query(`DELETE FROM recipe_files WHERE file_id = $1`, [id])
      return db.query(`DELETE FROM files WHERE id = $1`, [id])
    } catch (err) {
      console.log(err)
    }
  }
}
