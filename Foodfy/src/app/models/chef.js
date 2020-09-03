const db = require('../../config/db.js')
const { date } = require('../../libs/utils')

module.exports = {
  all (callback) {
    db.query(`
      SELECT chefs.*
      FROM chefs
      ORDER BY chefs.id
      `, function (err, results) {
      if (err) throw `Database error: ${err}`

      callback(results.rows)
    })
  },
  create (data, callback) {
    const keys = Object.keys(data)
    for (key of keys) {
      if (data[key] == '') {
        return res.send('Please, fill all fields')
      }
    }

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
      if (err) throw `Database error: ${err}`

      callback(results.rows)
    })
  },
  find (id, callback) {
    db.query(`
    SELECT *
    FROM chefs
    WHERE id = $1`, [id], function (err, results) {
      if (err) throw `Database error: ${err}`

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
      if (err) throw `Database error: ${err}`

      callback()
    })
  },
  delete (id, callback) {
    db.query(`
    DELETE FROM chefs
    WHERE id = $1`, [id], function (err) {
      if (err) throw `Database error ${err}`
      return callback()
    })
  },
  findRecipesByChef (id, callback) {
    db.query(`
    SELECT *
    FROM recipes
    WHERE chef_id = $1
    `, [id], function (err, results) {
      if (err) throw `Database error: ${err}`

      callback(results.rows)
    })
  },
  countTotalRecipes (id, callback) {
    db.query(`
      SELECT count (*) AS total_recipes
      FROM recipes
      WHERE chef_id = $1
      GROUP BY chef_id
      `, [id], function (err, results) {
      if (err) throw `Database error: ${err}`

      callback(results.rows)
    })
  }
}
