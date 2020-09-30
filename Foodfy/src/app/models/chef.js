const db = require('../../config/db.js')
const { date } = require('../../libs/utils')

module.exports = {
  all (callback) {
    db.query(`
      SELECT chefs.*
      FROM chefs
      ORDER BY chefs.id
      `, function (err, results) {
     const error = `Database error: ${err}`
      if (err) throw error
      callback(results.rows)
    })
  },
  create (data, callback) {
    const query = `
    INSERT INTO chefs (
      name,
      avatar_url,
      created_at
    ) VALUES ($1, $2, $3)
    RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso
    ]

    db.query(query, values, function (err, results) {
      const error = `Database error: ${err}`
      if (err) throw error
      callback(results.rows)
    })
  },
  find (id, callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS total
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      GROUP BY chefs.id
      `, [id], function (err, results) {
      const error = `Database error: ${err}`
      if (err) throw error
      callback(results.rows[0])
    })
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
  findRecipesByChef (id, callback) {
    db.query(`
    SELECT *
    FROM recipes
    WHERE chef_id = $1
    `, [id], function (err, results) {
     const error = `Database error: ${err}`
      if (err) throw error
      callback(results.rows)
    })
  }
}
