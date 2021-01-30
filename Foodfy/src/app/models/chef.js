const db = require('../../config/db.js')
const { date } = require('../../libs/utils')

module.exports = {
  all () {
    return db.query(`
      SELECT chefs.*
      FROM chefs
      ORDER BY chefs.id
      `)
  },
  create (data, callback) {
    const query = `
    INSERT INTO chefs (
      name,
      created_at
    ) VALUES ($1, $2)
    RETURNING id
    `

    const values = [
      data.name,
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
  update (data, callback) {
    const query = `
      UPDATE chefs SET
        name=($1),
        avatar_url=($2)
      WHERE id = $3
    `
    const values = [
      data.name,
      data.avatar_url,
      data.id
    ]
    db.query(query, values, function (err, results) {
      const error = `Database error: ${err}`
      if (err) throw error
      callback()
    })
  },
  delete (id, callback) {
    db.query(`
    DELETE FROM chefs
    WHERE id = $1`, [id], function (err) {
      const error = `Database error: ${err}`
      if (err) throw error
      return callback()
    })
  },
  findRecipesByChef (id) {
    return db.query(`
    SELECT *
    FROM recipes
    WHERE chef_id = $1
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
