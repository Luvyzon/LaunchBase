const db = require('../../config/db.js')
module.exports = {

  allChefs () {
    return db.query(`
    SELECT chefs.*, count (*) AS total
    FROM chefs
    INNER JOIN recipes
    ON chefs.id = recipes.chef_id
    GROUP BY chefs.id
    `)
  },
  allRecipes (filter) {
    let query = "",
        filterQuery = ""

    if (filter) {
      filterQuery = `${query}
      WHERE recipes.title ILIKE '%${filter}%'
      `
    }
    query = `
    SELECT *
    FROM chefs
    LEFT JOIN recipes
    ON chefs.id = recipes.chef_id
    ${filterQuery}
    ORDER BY recipes.updated_at DESC
    `
    return db.query(query)
  }
}
