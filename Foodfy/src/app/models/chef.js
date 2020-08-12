const db = require('../../config/db.js')

module.exports = {
  all (callback) {
    db.query(`
      SELECT chefs.*
      FROM chefs
      GROUP BY instructors.id
      `, function (err, results) {
      if (err) throw `Database error: ${err}`

      callback(results.rows)
    })
  }

}
