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
    FROM recipes
    LEFT JOIN chefs
    ON recipes.chef_id = chefs.id
    ${filterQuery}
    ORDER BY recipes.updated_at DESC
    `
    return db.query(query)
  }
}
