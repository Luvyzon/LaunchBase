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
  allRecipes (params) {
    const { filter, callback } = params

    let query = "",
        filterQuery = ""

    if (filter) {
      filterQuery = `${query}
      WHERE recipes.title ILIKE '%${filter}%'
      `
    }
    query = `
    SELECT *
    FROM recipes
    LEFT JOIN chefs
    ON (recipes.chef_id = chefs.id)
    ${filterQuery}
    ORDER BY recipes.id
    `
    db.query(query, function (err, results) {
      const error = `Database error: ${err}`
      if (err) throw error
      callback(results.rows)
    })
  }
}
