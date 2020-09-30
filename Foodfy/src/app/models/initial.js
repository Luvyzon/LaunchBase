const db = require('../../config/db.js')
module.exports = {

  allChefs (callback) {
    db.query(`
    SELECT chefs.*, count (*) AS total
    FROM chefs
    INNER JOIN recipes
    ON chefs.id = recipes.chef_id
    GROUP BY chefs.id
    `, function (err, results) {
      const error = `Database error: ${err}`
      if (err) throw error
      callback(results.rows)
    })
  },
  allRecipes (callback) {
    db.query(`
    SELECT *
    FROM chefs
    INNER JOIN recipes
    ON chefs.id = recipes.chef_id
    ORDER BY chefs.id
    `, function (err, results) {
      const error = `Database error: ${err}`
      if (err) throw error
      callback(results.rows)
    })
  }
}
