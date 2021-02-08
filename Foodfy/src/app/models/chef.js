const db = require('../../config/db.js')
const { date } = require('../../libs/utils')
const file = require('./file.js')
const fs = require('fs')

module.exports = {
  all () {
    return db.query(`
      SELECT chefs.*
      FROM chefs
      ORDER BY chefs.id
      `)
  },
  create ({ name, fileId }) {
    const query = `
    INSERT INTO chefs (
      name,
      file_id,
      created_at
    ) VALUES ($1, $2, $3)
    RETURNING id
    `

    const values = [
      name,
      fileId,
      date(Date.now()).iso
    ]

    return db.query(query, values)
  },
  find (id) {
    return db.query(`
      SELECT chefs.*, count(recipes) AS total
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      GROUP BY chefs.id
      `, [id])
  },
  update (id, name) {
    const query = `
      UPDATE chefs SET
        name=($1)
      WHERE id = $2
    `
    const values = [
      name,
      id
    ]
    return db.query(query, values)
  },
  updateFile (id, file_id) {
    const query = `
      UPDATE chefs SET
        file_id=($1)
      WHERE id = $2
    `
    const values = [
      file_id,
      id
    ]
    return db.query(query, values)
  },
  async delete (id) {
    let results = await db.query(`
    SELECT *
    FROM chefs
    WHERE id = $1`, [id])
    const fileId = results.rows[0].file_id

    results = await db.query(`
    SELECT *
    FROM files
    WHERE id = $1`, [fileId])
    const file = results.rows[0]
    await db.query(`
    DELETE FROM chefs
    WHERE id = $1`, [id])

    fs.unlinkSync(`${file.path}`)

    return db.query(
      `DELETE FROM files
      WHERE id = $1
      `, [file.id])
  },
  findRecipesByChef (id) {
    return db.query(`
    SELECT *
    FROM recipes
    WHERE chef_id = $1
    ORDER BY created_at DESC
    `, [id])
  },
  files (id) {
    return db.query(`
    SELECT * 
    FROM chefs
    INNER JOIN files
    ON chefs.file_id = files.id
    WHERE chefs.id = $1`, [id])
  }
}
